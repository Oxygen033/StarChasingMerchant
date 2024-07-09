import { ChatColor } from "src/chat/enums/ChatColor.enum";
import { JourneyEventType } from "../enums/journeyEventType.enum";

export class JourneyEvent {
    constructor(_name: string,
        _type: JourneyEventType,
        _startMessage: string,
        _startMessageColor: ChatColor,
        _weight: number,
        _minLevel: number,
        _minStats: Record<string, number>
    ) {
        this.name = _name;
        this.type = _type;
        this.startMessage = _startMessage,
            this.startMessageColor = _startMessageColor,
            this.weight = _weight,
            this.minLevel = _minLevel,
            this.minStats = _minStats
    }

    name: string;
    type: JourneyEventType;
    startMessage: string;
    startMessageColor: ChatColor;
    weight: number;
    minLevel: number;
    minStats: Record<string, number>

    public activate(): void { }
}
