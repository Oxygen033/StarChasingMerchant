import { ChatGateway } from 'src/chat/chat.gateway';
import { ItemPrototype } from 'src/prototypes/classes/itemPrototype';

export default class DebugItem extends ItemPrototype {
  constructor(
    prototypeData: any,
    private chatGateway: ChatGateway
  ) {
    super(prototypeData);
  }

  use() {
    console.log(`${this.prototypeData.name} used! It costs ${this.prototypeData.cost}`);
    this.chatGateway.sendMessage('Dev is sucker');
  }
}
