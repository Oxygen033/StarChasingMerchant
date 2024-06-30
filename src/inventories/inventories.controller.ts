import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Request } from 'express';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) { }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoriesService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoriesService.remove(+id);
  }

  @Post('additem/:inventoryId/:itemName/:count')
  async addItem(@Param('inventoryId') inventoryId: number, @Param('itemName') itemName: string, @Param('count') count: number = 1, @Req() req: Request) {
    return await this.inventoriesService.addItem(inventoryId, itemName, count, req.char);
  }

  @Post('removeitem/:inventoryId/:itemName/:count')
  async removeItem(@Param('inventoryId') inventoryId: number, @Param('itemName') itemName: string, @Param('count') count: number = 1, @Req() req: Request) {
    return await this.inventoriesService.removeItem(inventoryId, itemName, count, req.char);
  }
}
