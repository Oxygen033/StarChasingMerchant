import { Injectable } from '@nestjs/common';
import { ItemPrototypeService } from './itemsPrototype.service';
import * as path from 'path';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemFactoryService {
  constructor(private readonly itemPrototypeService: ItemPrototypeService) {}

  createItem(name: string) {
    const prototype = this.itemPrototypeService.getItemPrototype(name);
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
