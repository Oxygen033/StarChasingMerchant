import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class JourneysGateway {
  constructor(private readonly journeysService: JourneysService) { }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startJourney')
  async startJourney(@MessageBody() createJorneyDto: CreateJourneyDto, @ConnectedSocket() client: Socket) {
    try {
      const journey = await this.journeysService.startJorney(createJorneyDto);
      this.server.emit('journeyStarted', journey);
    } catch (error) {
      this.server.emit('error', error.message);
    }
  }

  @SubscribeMessage('pauseJourney')
  async pauseJourney(@MessageBody() characterId: number) {
    try {
      await this.journeysService.pauseJourney(characterId);
      this.server.emit('journeyPaused', characterId);
    } catch (error) {
      this.server.emit('error', error.message);
    }
  }

  @SubscribeMessage('resumeJourney')
  async handleResumeJourney(characterId: number) {
    try {
      await this.journeysService.resumeJourney(characterId);
      this.server.emit('journeyResumed', characterId);
    } catch (error) {
      this.server.emit('error', error.message);
    }
  }
}
