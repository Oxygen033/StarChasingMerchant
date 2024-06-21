import { Injectable } from '@nestjs/common';
import { CreateJorneyDto } from './dto/create-jorney.dto';
import { UpdateJorneyDto } from './dto/update-jorney.dto';
import { Repository } from 'typeorm';
import { Jorney } from './entities/jorney.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class JorneysService {
  constructor(
    @InjectRepository(Jorney)
    private jorneysRepository: Repository<Jorney>,
    private chatGateway: ChatGateway,
  ) {}

  async startJorney(createJorneyDto: CreateJorneyDto) {
    const jorney:Jorney = new Jorney();
    Object.assign(jorney, createJorneyDto);
    this.chatGateway.sendMessage("Jorney from ")
    return (await this.jorneysRepository.save(jorney)).id;
  }


}
