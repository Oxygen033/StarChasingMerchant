import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(forwardRef(() => ItemsService))
    private itemsService: ItemsService
  ) {}

  async generateItemUseMessage(itemName: string) {
    const itemInfo = await this.itemsService.getItemInfo(itemName);
    if(!itemInfo.useMessage) {
      return `You used ${itemInfo.name}`
    }
    return itemInfo.useMessage.replace('[itemname]', itemInfo.name);
  }
}
