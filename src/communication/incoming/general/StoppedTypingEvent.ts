import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class StoppedTypingEvent implements IncomingMessage{
    Parse(data: any): void {
        Store.GetInstance().isTyping = false;
    }
}