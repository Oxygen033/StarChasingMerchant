import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  sendMessage(message: string) {
    this.server.emit('chatMessage', message);
  }

  async sendItemUseMessage(itemName: string) {
    this.server.emit('chatMessage', await this.chatService.generateItemUseMessage(itemName));
  }
}
