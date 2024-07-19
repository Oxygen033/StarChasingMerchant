import { Inject, Injectable, Req, forwardRef } from '@nestjs/common';
import { Request } from 'express';
import { ChatGateway } from 'src/chat/chat.gateway';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { Category } from 'src/prototypes/enums/category.enum';
import { ItemPrototype } from 'src/prototypes/classes/itemPrototype';
import { PrototypeFactoryService } from 'src/prototypes/prototypesFactory.service';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(forwardRef(() => PrototypesService))
    private prototypeService: PrototypesService,
    @Inject(forwardRef(() => PrototypeFactoryService))
    private prototypesFactoryService: PrototypeFactoryService,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway,
  ) { }

  getItemInfo(itemName: string) {
    return this.prototypeService.getPrototype(itemName, Category.ITEMS);
  }
}
