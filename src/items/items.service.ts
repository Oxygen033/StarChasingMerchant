import { Inject, Injectable, Req, forwardRef } from '@nestjs/common';
import { Request } from 'express';
import { ChatGateway } from 'src/chat/chat.gateway';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { PrototypeFactoryService } from 'src/prototypes/prototypesFactory.service';
import { Category } from 'src/prototypes/enums/category.enum';

@Injectable()
export class ItemsService {
  constructor(
    private prototypeService: PrototypesService,
    private prototypesFactoryService: PrototypeFactoryService,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway,
  ) { }

  useItem(itemName: string, @Req() req: Request) {
    const item = this.prototypesFactoryService.instantiatePrototype(Category.ITEMS, itemName);
    const currentDate = new Date();
    console.log(
      `\x1b[34m[LOG ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]\x1b[0m User ${req.username} (${req.id}) used item ${itemName}`,
    );
    this.chatGateway.sendItemUseMessage(itemName);
    return item.use();
  }

  getItemInfo(itemName: string) {
    return this.prototypeService.getPrototype(itemName, Category.ITEMS);
  }
}
