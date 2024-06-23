import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import { ChatColor } from './enums/ChatColor.enum';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  sendMessage(_message: string, _color: ChatColor = ChatColor.WHITE) {
    this.server.emit('chatMessage', {message: _message, color: _color});
  }

  async sendItemUseMessage(itemName: string) {
    this.sendMessage(await this.chatService.generateItemUseMessage(itemName), ChatColor.WHITE);
  }
}
