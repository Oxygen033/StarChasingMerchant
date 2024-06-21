import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { JorneysService } from './jorneys.service';
import { CreateJorneyDto } from './dto/create-jorney.dto';
import { UpdateJorneyDto } from './dto/update-jorney.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class JorneysGateway {
  constructor(private readonly jorneysService: JorneysService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startJorney')
  start(@MessageBody() createJorneyDto: CreateJorneyDto, @ConnectedSocket() client: Socket) {
    this.server.emit('journeyStarted', { journeyId: createJorneyDto.name })
  }
}
