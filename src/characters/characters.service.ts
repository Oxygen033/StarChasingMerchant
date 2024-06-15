import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { InventoriesService } from 'src/inventories/inventories.service';

@Injectable()
export class CharactersService {
  constructor(
     @InjectRepository(Character)
     private charactersRepository: Repository<Character>,
     @Inject(forwardRef(() => InventoriesService))
     private inventoriesService: InventoriesService
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character:Character = new Character();
    Object.assign(character, createCharacterDto);
    const createdCharacter = await this.charactersRepository.save(character);
    await this.inventoriesService.createDefaultInventory(createdCharacter.id);
  }

  async findAll() {
    return await this.charactersRepository.find();
  }

  async findOne(_id: number) {
    return await this.charactersRepository.findOne({where: {id: _id}});
  }

  async update(_id: number, updateCharacterDto: UpdateCharacterDto) {
    return await this.charactersRepository.update(
      { id: _id },
      updateCharacterDto,
    );
  }

  async remove(_id: number) {
    return await this.charactersRepository.delete({id: _id});
  }
}
