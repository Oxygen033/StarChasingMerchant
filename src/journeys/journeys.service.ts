import { Injectable, InternalServerErrorException, NotFoundException, OnModuleDestroy } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { Repository } from 'typeorm';
import { Journey } from './entities/journey.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';
import { CharactersService } from 'src/characters/characters.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Character } from 'src/characters/entities/character.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { Category } from 'src/prototypes/enums/category.enum';

@Injectable()
export class JourneysService implements OnModuleDestroy {
  private journeyTimers: Map<number, NodeJS.Timeout> = new Map();
  private eventTimers: Map<number, NodeJS.Timeout> = new Map();

  constructor(
    @InjectRepository(Journey)
    private journeysRepository: Repository<Journey>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    private chatGateway: ChatGateway,
    private eventEmitter: EventEmitter2,
    private prototypeService: PrototypesService
  ) { }

  async onModuleDestroy() {
    console.log("Pausing all journeys...");
    const journeys = await this.journeysRepository.find();
    journeys.forEach((journey) => {
      if (!journey.isPaused) {
        console.log(`Paused journey: ${journey.id}`);
        this.pauseJourney(journey.id);
      }
    })
  }

  async startJorney(createJourneyDto: CreateJourneyDto) {
    const character = await this.charactersRepository.findOne({ where: { id: createJourneyDto.characterId } });
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    if (character.journey) {
      throw new InternalServerErrorException('Character already in journey');
    }

    if (!Object.keys(this.prototypeService.getPrototypesList(Category.TOWNS)).includes(createJourneyDto.startPoint) ||
      !Object.keys(this.prototypeService.getPrototypesList(Category.TOWNS)).includes(createJourneyDto.endPoint)) {
      throw new InternalServerErrorException('Start/end points incorrect!');
    }

    const journey = new Journey();
    journey.character = character;
    journey.startPoint = createJourneyDto.startPoint;
    journey.endPoint = createJourneyDto.endPoint; //Useless for now, later will be used in calculations
    journey.startTime = new Date();
    journey.remainingTime = 5 * 60 * 1000; //5 minutes, will be replaced later after general implementation.
    journey.isPaused = false;
    journey.events = [];
    const savedJourney = await this.journeysRepository.save(journey);

    this.startJourneyTimer(savedJourney);
    this.chatGateway.sendMessage(`Journey from ${this.prototypeService.getPrototype(journey.startPoint, Category.TOWNS).name} to ${this.prototypeService.getPrototype(journey.endPoint, Category.TOWNS).name} started.`);
    console.log(
      `Character ${(await this.charactersRepository.findOne({ where: { id: createJourneyDto.characterId } })).name} (${createJourneyDto.characterId}) started journey ${savedJourney.id} from ${createJourneyDto.startPoint} to ${createJourneyDto.endPoint}`
    );

    return savedJourney;
  }

  async getJourneyByCharacter(characterId: number) {
    return await this.journeysRepository.findOne({ where: { character: { id: characterId } } });
  }

  private startJourneyTimer(journey: Journey) {
    const timer = setTimeout(() => {
      this.endJourney(journey.id);
    }, journey.remainingTime);

    this.journeyTimers.set(journey.id, timer);
    this.scheduleRandomEvents(journey);
  }

  private scheduleRandomEvents(journey: Journey) {
    const scheduleNextEvent = () => {
      const delay = Math.random() * 60000 + 60000;
      const timer = setTimeout(async () => {
        if (!journey.isPaused) {
          const event = this.generateRandomEvent();
          this.eventEmitter.emit('journeyEvent', event);
          console.log("event");
          journey.events.push(event);
          await this.journeysRepository.save(journey);
        }
        scheduleNextEvent();
      }, delay);

      this.eventTimers.set(journey.id, timer);
    }
    scheduleNextEvent();
  }

  private generateRandomEvent() {
    return { type: 'battle', desc: 'dwfwfwfwfwefwef' };
  }

  async endJourney(journeyId: number) {
    const journey = await this.journeysRepository.findOne({ where: { id: journeyId }, relations: { character: true } });
    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    this.clearTimers(journeyId);
    journey.character.journey = null;
    await this.charactersRepository.save(journey.character);
    await this.journeysRepository.delete({ id: journey.id });
  }

  async pauseJourney(characterId: number) {
    const journey = await this.getJourneyByCharacter(characterId);
    if (!journey || journey.isPaused) {
      throw new NotFoundException('Active journey not found for character');
    }

    this.clearTimers(journey.id);
    const elapsedTime = Date.now() - journey.startTime.getTime();
    journey.remainingTime = Math.max(0, journey.remainingTime - elapsedTime);
    journey.isPaused = true;

    await this.journeysRepository.save(journey);
  }

  async resumeJourney(characterId: number) {
    const journey = await this.getJourneyByCharacter(characterId);
    if (!journey || !journey.isPaused) {
      throw new NotFoundException('Active journey not found for user');
    }

    journey.isPaused = false;
    journey.startTime = new Date();
    await this.journeysRepository.save(journey);

    this.resumeJourneyTimer(journey);
  }

  //extreme crutches mostly not mine 
  private resumeJourneyTimer(journey: Journey) {
    const timer = setTimeout(() => {
      this.endJourney(journey.id);
    }, journey.remainingTime);

    this.journeyTimers.set(journey.id, timer);
    this.scheduleRandomEvents(journey);
  }

  private clearTimers(journeyId: number) {
    if (this.journeyTimers.has(journeyId)) {
      clearTimeout(this.journeyTimers.get(journeyId));
      this.journeyTimers.delete(journeyId);
    }
    if (this.eventTimers.has(journeyId)) {
      clearTimeout(this.eventTimers.get(journeyId));
      this.eventTimers.delete(journeyId);
    }
  }
}
