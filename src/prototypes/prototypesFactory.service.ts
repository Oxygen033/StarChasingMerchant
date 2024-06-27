import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { Category } from './enums/category.enum';

@Injectable()
export class PrototypeFactoryService {
    constructor(private prototypeService: PrototypesService) { }

    public instantiatePrototype(category: Category, name: string) {
        const prototype = this.prototypeService.getPrototype(name, category);
        if (!prototype) {
            throw new Error(`Item prototype ${name} not found`);
        }
        switch (category) {
            case Category.ITEMS:
                const itemScriptPath = prototype.script
                    ? path.join(__dirname, '../../dist/items/scripts', prototype.script) +
                    '.js'
                    : path.join(__dirname, '../../dist/items/scripts/nopItem.js');
                const ItemClass = require(itemScriptPath).default;
                return new ItemClass(
                    prototype.name,
                    prototype.description,
                    prototype.type,
                    prototype.cost,
                    prototype.useMessage
                );
            case Category.TOWNS:
                return new ItemClass(
                    prototype.name,
                    prototype.x,
                    prototype.y
                );
        }
    }
}
