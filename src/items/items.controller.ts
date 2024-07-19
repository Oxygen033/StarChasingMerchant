import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @UseGuards(AuthGuard)
  @Get(':itemName')
  getInfo(@Param('itemName') itemName: string) {
    return this.itemsService.getItemInfo(itemName);
  }
}
