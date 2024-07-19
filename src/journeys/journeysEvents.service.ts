import { Injectable } from '@nestjs/common';
import { Character } from 'src/characters/entities/character.entity';
import { Category } from 'src/prototypes/enums/category.enum';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { JourneyEvent } from './entities/journeyEvent';

@Injectable()
export class JourneysEventsService {
    eventsList: Record<string, JourneyEvent>;

    constructor(
        private prototypeService: PrototypesService
    ) {
        this.eventsList = prototypeService.getPrototypesList(Category.JOURNEYS_EVENTS);
    }

    spawnEvent(character: Character) {
        let matchedEvents: Record<string, number> = {};
        let summWeight = 0;
        for (const [key, value] of Object.entries(this.eventsList)) {
            if (value.minLevel <= character.level &&
                value.minStats.strenght <= character.stats.strenght &&
                value.minStats.agility <= character.stats.agility &&
                value.minStats.intelligence <= character.stats.intellignce &&
                value.minStats.magicPresence <= character.stats.magicPresence
            ) {
                matchedEvents[key] = value.weight;
                summWeight += value.weight;
            }
        }

        const randWeight = Math.random() * summWeight;
        let currentWeight = 0;

        for (const [key, weight] of Object.entries(matchedEvents)) {
            currentWeight += weight;
            if (currentWeight > randWeight) {
                return key;
            }
        }
    }
}