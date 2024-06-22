import { Module, forwardRef } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemFactoryService } from './itemsFactory.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { PrototypesModule } from 'src/prototypes/prototypes.module';

@Module({
  imports: [JwtModule, forwardRef(() => ChatModule), PrototypesModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemFactoryService],
  exports: [ItemsService]
})
export class ItemsModule {}
