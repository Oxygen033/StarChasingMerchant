import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { PrototypesService } from 'src/prototypes/prototypes.service';

@Injectable()
export class ItemFactoryService {
  constructor(private prototypeService: PrototypesService) {}

  createItem(name: string) {
    const prototype = this.prototypeService.getPrototype(name, 'items');
    if (!prototype) {
      throw new Error(`Item prototype ${name} not found`);
    }
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
  }
}
