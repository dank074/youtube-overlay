import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class SessionDataEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().session.id = data.id;
        Store.GetInstance().session.username = data.username;
        Store.GetInstance().session.look = data.look;
        Store.GetInstance().session.credits = data.credits;
    }
}