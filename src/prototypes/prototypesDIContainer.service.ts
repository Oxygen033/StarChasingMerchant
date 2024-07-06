// The existence of this service and this system is still 
// extremely experimental and may be changed in the future
import { Injectable } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.gateway';
import { JourneysService } from 'src/journeys/journeys.service';

@Injectable()
export class PrototypesDIContainer {
    constructor(
        private readonly chatGateway: ChatGateway,
        private readonly journeysService: JourneysService,
        // Other nesessary services will be added here
    ) { }

    //This part WILL BE REWORKED
    //For now it works as is
    getInjectable(key: string): any {
        const injectables = {
            'ChatGateway': this.chatGateway,
            'JourneysService': this.journeysService,
        };
        return injectables[key];
    }
}