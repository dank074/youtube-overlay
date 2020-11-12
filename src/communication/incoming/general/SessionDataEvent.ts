import App from '@/App';
import IncomingMessage from '../IncomingMessage';

export default class SessionDataEvent implements IncomingMessage {
    parse(data: any): void {
        App.interfaceManager.container.$store.commit('session/setCredits', data.credits);
        App.interfaceManager.container.$store.commit('session/setId', data.id);
        App.interfaceManager.container.$store.commit('session/setUsername', data.username);
        App.interfaceManager.container.$store.commit('session/setLook', data.look);
    }
}