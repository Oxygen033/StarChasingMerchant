import { ForbiddenException, Inject, Injectable, InternalServerErrorException, Req, forwardRef } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { InventoriesService } from 'src/inventories/inventories.service';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class CharactersService {
  constructor(
     @InjectRepository(Character)
     private charactersRepository: Repository<Character>,
     @Inject(forwardRef(() => InventoriesService))
     private inventoriesService: InventoriesService,
     @InjectRepository(User)
     private usersRepository: Repository<User>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto, @Req() req:Request) {
    const user = await this.usersRepository.findOne({where: {id: req.id}, relations: {character: true}});
    if(user.character) {
      throw new InternalServerErrorException('Character for this user already exists');
    }
    const character:Character = new Character();
    Object.assign(character, createCharacterDto);
    const createdCharacter = await this.charactersRepository.save(character);
    user.character = createdCharacter;
    await this.usersRepository.save(user);
    await this.inventoriesService.createDefaultInventory(createdCharacter.id);
    await this.inventoriesService.createDefaultEquipmentSlots(createdCharacter.id);
  }

  async findAll() {
    return await this.charactersRepository.find();
  }

  async findOne(_id: number) {
    return await this.charactersRepository.findOne({where: {id: _id}, relations: {inventories: true, equipmentSlots: true, journey: true}});
  }

  async update(_id: number, updateCharacterDto: UpdateCharacterDto, @Req() req:Request) {
    if((await this.usersRepository.findOne({where: {id: req.id}, relations: {character: true}})).character.id != _id) {
      throw new ForbiddenException();
    }
    return await this.charactersRepository.update(
      { id: _id },
      updateCharacterDto,
    );
  }

  async remove(_id: number, @Req() req:Request) {
    if((await this.usersRepository.findOne({where: {id: req.id}, relations: {character: true}})).character.id != _id) {
      throw new ForbiddenException();
    }
    return await this.charactersRepository.delete({id: _id});
  }
}
