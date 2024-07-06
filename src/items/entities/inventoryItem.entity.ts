import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.items)
  inventory: Inventory;

  @Column()
  itemName: string;

  @Column()
  slotNumber: number;

  @Column({ default: false })
  equipped: boolean;
}
