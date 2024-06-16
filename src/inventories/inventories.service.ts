import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { Character } from 'src/characters/entities/character.entity';
import { CharactersService } from 'src/characters/characters.service';
import { EquipmentSlots } from './entities/equipmentSlots.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoriesRepository: Repository<Inventory>,
    @InjectRepository(EquipmentSlots)
    private equipmentSlotsRepository: Repository<EquipmentSlots>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    @Inject(forwardRef(() => CharactersService))
    private charactersService: CharactersService //not nesessary may be removed in future
  ) {}
  

  async create(createInventoryDto: CreateInventoryDto) {
    const {capacity, character} = createInventoryDto;
    const targetCharacter:Character = await this.charactersService.findOne(character);
    if(!targetCharacter) {
      throw new NotFoundException(`Character with id ${character} not found`);
    }
    const inventory:Inventory = new Inventory();
    inventory.capacity = capacity;
    inventory.character = targetCharacter;
    return await this.inventoriesRepository.save(inventory);
  }

  async findAll() {
    return await this.inventoriesRepository.find();
  }

  async findOne(_id: number) {
    return await this.inventoriesRepository.findOne({where:{id: _id}});
  }

  async update(_id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory:Inventory = await this.findOne(_id);
    if(!inventory) {
      throw new NotFoundException(`Inventory with id ${_id} not found`);
    }
    const {character, capacity} = updateInventoryDto;
    if(character) {
      const targetCharacter = await this.charactersService.findOne(character);
      if(!targetCharacter) {
        throw new NotFoundException(`Character with id ${character} not found`);
      }
      inventory.character = targetCharacter;
    }
    if(capacity) {
      inventory.capacity = capacity;
    }
    return await this.inventoriesRepository.save(inventory);
  }

  async remove(_id: number) {
    return await this.inventoriesRepository.delete({id: _id});
  }

  async createDefaultInventory(characterId:number) {
    const character = await this.charactersService.findOne(characterId);
    if(!character) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }
    const inventory:Inventory = new Inventory();
    inventory.capacity = 100;
    inventory.character = character;
    
    return await this.inventoriesRepository.save(inventory);
  }

  async createDefaultEquipmentSlots(characterId: number) {
    const character = await this.charactersService.findOne(characterId);
    if(!character) {
      throw new NotFoundException(`Character with id ${characterId} not found`);
    }
    const equipmentSlots:EquipmentSlots = new EquipmentSlots();
    //Defauld loadout, system can be changed in future
    equipmentSlots.armor_boots = "oldBoots";
    equipmentSlots.clothing_legs = "clothPants"
    equipmentSlots.armor_boots = "oldBoots";
    character.equipmentSlots = await this.equipmentSlotsRepository.save(equipmentSlots);
    await this.charactersRepository.save(character);
  }
}
