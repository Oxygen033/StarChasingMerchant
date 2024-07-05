import { Module, forwardRef } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from 'src/chat/chat.module';
import { PrototypesModule } from 'src/prototypes/prototypes.module';

@Module({
  imports: [JwtModule,
    forwardRef(() => ChatModule),
    forwardRef(() => PrototypesModule),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule { }
