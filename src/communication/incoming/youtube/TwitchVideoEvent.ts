import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class TwitchVideoEvent implements IncomingMessage{
    parse(data: any): void {
        let channel = data.videoId;

        if(channel == "")
            return;

        App.interfaceManager.container.$store.commit('twitchplayer/setChannel', channel);
        App.interfaceManager.container.$store.commit('twitchplayer/setOpen', true);
    }
}