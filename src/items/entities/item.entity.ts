import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ItemType } from '../enums/ItemType';

export class Item {
  constructor(_name: string, _desc: string, _type: ItemType, _cost: number) {
    this.name = _name;
    this.type = _type;
    this.cost = _cost;
    this.description = _desc;
  }

  name: string;
  description: string;
  type: ItemType;
  cost: number;

  public use(): void {}
}
