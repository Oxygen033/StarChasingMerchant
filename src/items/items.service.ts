import { Injectable, Req } from '@nestjs/common';
import { ItemFactoryService } from './itemsFactory.service';
import { Request } from 'express';
import { ItemPrototypeService } from './itemsPrototype.service';
import { ItemType } from './enums/ItemType';

@Injectable()
export class ItemsService {
  constructor(
    private itemsFactoryService: ItemFactoryService,
    private itemPrototypeService: ItemPrototypeService,
  ) {}

  useItem(itemName: string, @Req() req: Request) {
    const item = this.itemsFactoryService.createItem(itemName);
    const currentDate = new Date();
    console.log(
      `\x1b[34m[LOG ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]\x1b[0m User ${req.username} (${req.id}) used item ${itemName} (cost: ${item.cost})`,
    );
    return item.use();
  }

  getItemInfo(itemName: string) {
    return this.itemPrototypeService.getItemPrototype(itemName);
  }
}
