import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ItemPrototypeService {
  private itemsDirectory = path.join(__dirname, '../../resources/items');
  private itemPrototypes: Record<string, any> = {};

  constructor() {
    this.loadItemPrototypes();
  }

  private loadItemPrototypes() {
    const files = fs.readdirSync(this.itemsDirectory, {recursive: true});
    files.forEach((file) => {
      if (file.endsWith('.json')) {
        try {
          const itemData = JSON.parse(
            fs.readFileSync(path.join(this.itemsDirectory, file), 'utf-8'),
          );
          this.itemPrototypes[file.split('\\').pop().replace('.json', '')] = itemData;
          console.log(
            '\x1b[32m',
            `Successfully loaded prototype for item: ${itemData.name}`,
          );
        } catch (exception) {
          console.log(
            '\x1b[31m',
            `Error while loading prototype in file: ${file}`,
          );
        }
      }
    });
  }

  getItemPrototype(name: string) {
    return this.itemPrototypes[name];
  }
}
