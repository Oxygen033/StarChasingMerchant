import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { Repository } from 'typeorm';
import { Journey } from './entities/journey.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';
import { CharactersService } from 'src/characters/characters.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Character } from 'src/characters/entities/character.entity';

@Injectable()
export class JourneysService {
  constructor(
    @InjectRepository(Journey)
    private journeysRepository: Repository<Journey>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    private chatGateway: ChatGateway,
  ) { }
  @WebSocketServer()
  server: Server;

  async startJorney(createJourneyDto: CreateJourneyDto) {
    const character = await this.charactersRepository.findOne({ where: { id: createJourneyDto.characterId } });
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    if (character.journey) {
      throw new InternalServerErrorException('Character already in journey');
    }

    const journey = new Journey();
    journey.character = character;
    journey.startPoint = createJourneyDto.startPoint;
    journey.endPoint = createJourneyDto.endPoint; //Useless for now, later will be used in calculations
    journey.startTime = new Date();
    journey.endTime = new Date(journey.startTime.getTime() + 20 * 60 * 1000); //20 minutes, will be replaced later after general implementation.
    journey.isPaused = false;
    journey.events = [];
    const savedJourney = await this.journeysRepository.save(journey);
    this.startJourneyTimer(savedJourney);
    this.chatGateway.sendMessage(`Journey from ${journey.startPoint} to ${journey.endPoint} started.`);
    console.log(
      `Character ${(await this.charactersRepository.findOne({ where: { id: createJourneyDto.characterId } })).name} 
      (${createJourneyDto.characterId}) started journey ${savedJourney.id} from ${createJourneyDto.startPoint} to ${createJourneyDto.endPoint}`
    );
    return savedJourney;
  }

  async getJourneyByCharacter(characterId: number) {
    return await this.journeysRepository.findOne({ where: { character: { id: characterId } } });
  }

  private startJourneyTimer(journey: Journey) {
    const duration = journey.endTime.getTime() - Date.now();
    const timer = setTimeout(() => {
      this.endJourney(journey.id);
    }, duration);
    this.scheduleRandomEvents(journey);

    /*this.server.addListener(`cancelJourney:${journey.id}`, () => {
      clearTimeout(timer);
    });*/
  }

  private scheduleRandomEvents(journey: Journey) {
    const scheduleNextEvent = () => {
      const delay = Math.random() * 60000 + 60000;
      setTimeout(async () => {
        if (!journey.isPaused) {
          const event = this.generateRandomEvent();
          this.server.emit('journeyEvent', event);
          console.log("event");
          journey.events.push(event);
          await this.journeysRepository.save(journey);
        }
        scheduleNextEvent();
      }, delay);
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
    journey.endTime = new Date();
    await this.journeysRepository.save(journey);

    journey.character.journey = null;
    await this.charactersRepository.save(journey.character);
  }

  async pauseJourney(characterId: number) {
    const journey = await this.getJourneyByCharacter(characterId);
    if (!journey) {
      throw new NotFoundException('Active journey not found for character');
    }
    journey.isPaused = true;
    await this.journeysRepository.save(journey);
  }

  async resumeJourney(characterId: number) {
    const journey = await this.getJourneyByCharacter(characterId);
    if (!journey) {
      throw new NotFoundException('Active journey not found for user');
    }
    journey.isPaused = false;
    await this.journeysRepository.save(journey);
  }
}
