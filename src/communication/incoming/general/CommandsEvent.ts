import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class CommandsEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().commands = data.commands;
        Store.GetInstance().commands_open = true;
    }
}