import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({
      where: { username: username },
      relations: { character: true }
    });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(
      { username: username },
      updateUserDto,
    );
  }

  async remove(username: string) {
    return await this.usersRepository.delete({ username: username });
  }
}
