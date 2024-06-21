import { Inject, Injectable, Req, forwardRef } from '@nestjs/common';
import { ItemFactoryService } from './itemsFactory.service';
import { Request } from 'express';
import { ItemPrototypeService } from './itemsPrototype.service';
import { ItemType } from './enums/ItemType';
import { ChatGateway } from 'src/chat/chat.gateway';
import { PrototypesService } from 'src/prototypes/prototypes.service';

@Injectable()
export class ItemsService {
  constructor(
    private itemsFactoryService: ItemFactoryService,
    private prototypeService: PrototypesService,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway,
  ) {}

  useItem(itemName: string, @Req() req: Request) {
    const item = this.itemsFactoryService.createItem(itemName);
    const currentDate = new Date();
    console.log(
      `\x1b[34m[LOG ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]\x1b[0m User ${req.username} (${req.id}) used item ${itemName}`,
    );
    this.chatGateway.sendItemUseMessage(itemName);
    return item.use();
  }

  getItemInfo(itemName: string) {
    return this.prototypeService.getPrototype(itemName, "items");
  }
}
