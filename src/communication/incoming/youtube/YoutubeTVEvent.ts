import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class YoutubeTVEvent implements IncomingMessage{
    parse(data: any): void {
        App.interfaceManager.container.$store.commit('youtubeplayer/setOpen', true);
        App.interfaceManager.container.$store.commit('youtubeplayer/setVideoId', data.videoId);
        App.interfaceManager.container.$store.commit('youtubeplayer/setItemId', data.itemId);
        App.interfaceManager.container.$store.commit('youtubeplayer/setEditMode', data.videoId == "");
    }
}