import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class UpdateCreditsEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().session.credits = data.credits;
    }
}