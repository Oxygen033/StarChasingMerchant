import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { Character } from 'src/characters/entities/character.entity';
import { CharactersService } from 'src/characters/characters.service';
import { EquipmentSlots } from './entities/equipmentSlots.entity';
import { InventoryItem } from 'src/items/entities/inventoryItem.entity';
import { PrototypesService } from 'src/prototypes/prototypes.service';
import { Category } from 'src/prototypes/enums/category.enum';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoriesRepository: Repository<Inventory>,
    @InjectRepository(EquipmentSlots)
    private equipmentSlotsRepository: Repository<EquipmentSlots>,
    @InjectRepository(InventoryItem)
    private invItemsRepository: Repository<InventoryItem>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    @Inject(forwardRef(() => CharactersService))
    private charactersService: CharactersService,
    private prototypesService: PrototypesService
  ) { }


  async create(createInventoryDto: CreateInventoryDto) {
    const { capacity, character } = createInventoryDto;
    const targetCharacter: Character = await this.charactersService.findOne(character);
    if (!targetCharacter) {
      throw new NotFoundException(`Character with id ${character} not found`);
    }
    const inventory: Inventory = new Inventory();
    inventory.capacity = capacity;
    inventory.remainingCapacity = capacity;
    inventory.character = targetCharacter;
    return await this.inventoriesRepository.save(inventory);
  }

  async findAll() {
    return await this.inventoriesRepository.find();
  }

  async findOne(_id: number) {
    return await this.inventoriesRepository.findOne({ where: { id: _id } });
  }

  async update(_id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory: Inventory = await this.findOne(_id);
    if (!inventory) {
      throw new NotFoundException(`Inventory with id ${_id} not found`);
    }
    const { character, capacity } = updateInventoryDto;
    if (character) {
      const targetCharacter = await this.charactersService.findOne(character);
      if (!targetCharacter) {
        throw new NotFoundException(`Character with id ${character} not found`);
      }
      inventory.character = targetCharacter;
    }
    if (capacity) {
      inventory.capacity = capacity;
    }
    return await this.inventoriesRepository.save(inventory);
  }

  async remove(_id: number) {
    return await this.inventoriesRepository.delete({ id: _id });
  }

  async createDefaultInventory(characterId: number) {
    const character = await this.charactersService.findOne(characterId);
    if (!character) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }
    return await this.create({
      character: character.id,
      capacity: 100
    });
  }

  async createDefaultEquipmentSlots(characterId: number) {
    const character = await this.charactersService.findOne(characterId);
    if (!character) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }
    const equipmentSlots: EquipmentSlots = new EquipmentSlots();
    //Defauld loadout, system can be changed in future
    equipmentSlots.armor_boots = "oldBoots";
    equipmentSlots.clothing_legs = "clothPants"
    equipmentSlots.armor_boots = "oldBoots";
    character.equipmentSlots = await this.equipmentSlotsRepository.save(equipmentSlots);
    await this.charactersRepository.save(character);
  }

  async addItem(inventoryId: number, itemName: string, count: number, charId: number) {
    const inventory = await this.inventoriesRepository.findOne({ where: { id: inventoryId } });

    if (charId != inventory.character.id) {
      throw new UnauthorizedException('Character mismatch');
    }

    if (inventory.remainingCapacity - count < 0) {
      throw new Error('No place in inventory!');
    }

    if (!inventory) {
      throw new NotFoundException('Inventory not found!');
    }

    if (!(await this.prototypesService.getPrototype(itemName, Category.ITEMS))) {
      throw new NotFoundException('Item not found!');
    }

    for (let i = 0; i < count; i++) {
      const invItem = new InventoryItem();
      invItem.inventory = inventory;
      invItem.itemName = itemName;
      invItem.slotNumber = await this.calculateInvSlot(inventoryId);
      await this.invItemsRepository.save(invItem);
    }
    inventory.remainingCapacity -= count;
    this.inventoriesRepository.save(inventory);
  }

  async calculateInvSlot(inventoryId: number) {
    const invItems = await this.invItemsRepository.find({ where: { inventory: await this.inventoriesRepository.findOne({ where: { id: inventoryId } }) }, select: { slotNumber: true } });
    let slotNumber = 0;
    invItems.forEach((item) => {
      if (item.slotNumber > slotNumber) {
        slotNumber = item.slotNumber;
      }
    })
    slotNumber += 1;
    return slotNumber;
  }

  async removeItem(inventoryId: number, itemName: string, count: number, charId: number) {
    const inventory = await this.inventoriesRepository.findOne({ where: { id: inventoryId } });

    if (charId != inventory.character.id) {
      throw new UnauthorizedException('Character mismatch');
    }

    if (!inventory) {
      throw new NotFoundException('Inventory not found!');
    }

    if (!(await this.prototypesService.getPrototype(itemName, Category.ITEMS))) {
      throw new NotFoundException('Item not found!');
    }

    for (let i = 0; i < count; i++) {
      const recordToDelete = await this.invItemsRepository.findOne({
        where: { inventory: inventory, itemName: itemName },
        order: { id: "DESC" },
      });

      if (recordToDelete) {
        await this.invItemsRepository.remove(recordToDelete);
      } else {
        throw new InternalServerErrorException('Item not found!');
      }
    }
    inventory.remainingCapacity += count;
    this.inventoriesRepository.save(inventory);
  }
}
