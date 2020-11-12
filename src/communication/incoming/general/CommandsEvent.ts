import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class CommandsEvent implements IncomingMessage {
    Parse(data: any): void {
        App.interfaceManager.container.$store.commit('commands/setCommands', data.commands);
        App.interfaceManager.container.$store.commit('commands/setOpen', true);
    }
}