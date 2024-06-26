import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Category } from './enums/category.enum';

@Injectable()
export class PrototypesService {
    constructor() {
        this.loadPrototypes('items');
        this.loadPrototypes('towns');
    }
    /*All prototypes should be placed inside resources/ directory and loaded with loadPrototypes(foldername)
    where "foldername" is name of prototypes category. All sub-directories inside root folders parsed automatically*/
    private prototypes: Record<string, Record<string, any>> = {};

    private loadPrototypes(folderName: string) {
        console.log(`\x1b[36m [ Loading ${folderName} prototypes ]\x1b[0m`)
        const prototypesPath = path.join(__dirname, '../../resources', folderName);
        const prototypesList: Record<string, any> = {};
        const files = fs.readdirSync(prototypesPath, { recursive: true });
        files.forEach((file) => {
            if (file.endsWith('.json')) {
                try {
                    const itemData = JSON.parse(
                        fs.readFileSync(path.join(prototypesPath, file), 'utf-8'),
                    );
                    prototypesList[file.split('\\').pop().replace('.json', '')] = itemData;
                    console.log(
                        '\x1b[32m',
                        `Successfully loaded prototype: ${itemData.name}`,
                        '\x1b[0m'
                    );
                } catch (exception) {
                    console.log(
                        '\x1b[31m',
                        `Error while loading prototype in file: ${file}`,
                        '\x1b[0m'
                    );
                }
            }
        });
        this.prototypes[folderName] = prototypesList;
    }

    getPrototype(name: string, category: Category) {
        return this.prototypes[category]?.[name];
    }

    getPrototypesList(category: Category) {
        console.log(this.prototypes[category]);
        return this.prototypes[category];
    }
}
