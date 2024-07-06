import { BasePrototype } from "./basePrototype";

export abstract class JourneyEventPrototype extends BasePrototype {
    abstract activate(): void;
}