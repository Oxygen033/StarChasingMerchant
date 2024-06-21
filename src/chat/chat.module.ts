import { Module, forwardRef } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [forwardRef(() => ItemsModule)],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway]
})
export class ChatModule {}
