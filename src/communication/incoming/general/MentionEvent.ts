import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';
import Mention from '@/store/models/Mention';

export default class MentionEvent implements IncomingMessage{
    Parse(data: any): void {
        let sender = data.sender;
        let message = data.message;
        
        Store.GetInstance().mentions.push(new Mention(sender, message));
    }
}