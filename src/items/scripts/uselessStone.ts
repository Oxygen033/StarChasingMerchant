import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatColor } from 'src/chat/enums/ChatColor.enum';
import { ItemPrototype } from 'src/prototypes/classes/itemPrototype';

export default class UselessStone extends ItemPrototype {
  constructor(
    prototypeData: any,
    private chatGateway: ChatGateway
  ) {
    super(prototypeData);
  }

  use() {
    console.log(`${this.prototypeData.name} used! It costs ${this.prototypeData.cost}`);
    this.chatGateway.sendMessage('oh yeah you used stone. Dev is looser btw');
    console.log('second stage, lessgoo');
  }
}
