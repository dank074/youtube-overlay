import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class TwitchVideoEvent implements IncomingMessage{
    Parse(data: any): void {
        let channel = data.videoId;

        if(channel == "")
            return;

        Store.GetInstance().twitch.open = true;
        Store.GetInstance().twitch.channel = channel;
    }
}