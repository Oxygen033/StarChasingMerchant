import { Module, forwardRef } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { InventoriesModule } from 'src/inventories/inventories.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character, User]),
    forwardRef(() => InventoriesModule),
    JwtModule
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
