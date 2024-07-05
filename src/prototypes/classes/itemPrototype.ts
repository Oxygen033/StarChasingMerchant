import { BasePrototype } from "./basePrototype";

export abstract class ItemPrototype extends BasePrototype {
    abstract use(): void;
}