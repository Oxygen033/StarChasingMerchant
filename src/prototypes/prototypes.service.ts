import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PrototypesService {
    constructor() {
        this.loadPrototypes('items');
    }

    private prototypes: Record<string, Record<string, any>> = {};

    private loadPrototypes(folderName: string) {
        const prototypesPath = path.join(__dirname, '../../resources', folderName);
        const prototypesList: Record<string, any> = {};
        const files = fs.readdirSync(prototypesPath, {recursive: true});
        files.forEach((file) => {
        if (file.endsWith('.json')) {
            try {
            const itemData = JSON.parse(
                fs.readFileSync(path.join(prototypesPath, file), 'utf-8'),
            );
            prototypesList[file.split('\\').pop().replace('.json', '')] = itemData;
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
        this.prototypes[folderName] = prototypesList;
    }

    getPrototype(name: string, category: string) {
        return this.prototypes[category]?.[name];
    }
}
