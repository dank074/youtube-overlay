import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class UpdateCreditsEvent implements IncomingMessage {
    Parse(data: any): void {
        App.interfaceManager.container.$store.commit('session/setCredits', data.credits);
    }
}