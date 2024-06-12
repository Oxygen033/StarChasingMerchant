import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('use/:itemName')
  use(@Param('itemName') itemName: string, @Req() req: Request) {
    return this.itemsService.useItem(itemName, req);
  }

  @UseGuards(AuthGuard)
  @Get(':itemName')
  getInfo(@Param('itemName') itemName: string) {
    return this.itemsService.getItemInfo(itemName);
  }
}
