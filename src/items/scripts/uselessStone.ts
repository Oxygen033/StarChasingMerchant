import { Item } from '../entities/item.entity';

export default class UselessStone extends Item {
  public override use() {
    console.log(`${this.name} used! It costs ${this.cost}`);
  }
}
