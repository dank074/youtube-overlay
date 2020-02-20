import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class StopPlayingEvent implements IncomingMessage {
    Parse(data: any): void {
        // here throw an event or something
    }
}