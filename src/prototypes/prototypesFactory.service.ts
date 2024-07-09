import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { Category } from './enums/category.enum';
import { PrototypesDIContainer } from './prototypesDIContainer.service';
import { BasePrototype } from './classes/basePrototype';
import { ItemPrototype } from './classes/itemPrototype';
import { JourneyEventPrototype } from './classes/journeyEventPrototype';
import { TownPrototype } from './classes/townPrototype';

@Injectable()
export class PrototypeFactoryService {
    constructor(
        private prototypeService: PrototypesService,
        private diContainer: PrototypesDIContainer
    ) { }

    public instantiatePrototype<T extends BasePrototype>(category: Category, name: string): T {
        const prototype = this.prototypeService.getPrototype(name, category);
        if (!prototype) {
            throw new Error(`Prototype ${name} not found in category ${category}`);
        }

        const scriptPath = this.getScriptPath(category, prototype.script);
        const PrototypeClass = require(scriptPath).default;

        return this.createPrototypeInstance<T>(PrototypeClass, prototype, category);
    }

    private getScriptPath(category: Category, script: string): string {
        const basePath = path.join(__dirname, '../../dist');
        switch (category) {
            case Category.ITEMS:
                return path.join(basePath, 'items/scripts', script || 'nopItem') + '.js';
            case Category.JOURNEYS_EVENTS:
                return path.join(basePath, 'journeys/events/scripts', script || 'nopEvent') + '.js';
            case Category.TOWNS:
                return path.join(basePath, 'towns/scripts', script || null) + '.js';
            default:
                throw new Error(`Unknown category: ${category}`);
        }
    }

    //This system NEED TO BE COMPLETELY REWORKED to exclude
    //unnesessary dependencies from prototype
    //For now, it works as is
    private createPrototypeInstance<T extends BasePrototype>(
        PrototypeClass: new (...args: any[]) => T,
        prototypeData: any,
        category: Category
    ): T {
        const instance = new PrototypeClass(
            prototypeData,
            this.diContainer.getInjectable('ChatGateway'),
            this.diContainer.getInjectable('JourneysService')
        );
        this.validatePrototypeInstance(instance, category);
        return instance;
    }

    private validatePrototypeInstance(instance: BasePrototype, category: Category): void {
        switch (category) {
            case Category.ITEMS:
                if (!(instance instanceof ItemPrototype)) {
                    throw new Error(`Invalid prototype instance for category ${category}. Expected ItemPrototype.`);
                }
                break;
            case Category.JOURNEYS_EVENTS:
                if (!(instance instanceof JourneyEventPrototype)) {
                    throw new Error(`Invalid prototype instance for category ${category}. Expected JourneyPrototype.`);
                }
                break;
            case Category.TOWNS:
                if (!(instance instanceof TownPrototype)) {
                    throw new Error(`Invalid prototype instance for category ${category}. Expected TownPrototype.`);
                }
                break;
            default:
                throw new Error(`Unknown category: ${category}`);
        }
    }
}
