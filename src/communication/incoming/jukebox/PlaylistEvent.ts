import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class PlaylistEvent implements IncomingMessage {
    parse(data: any): void {
        App.interfaceManager.container.$store.commit('jukebox/setPlaylist', data.playlist);
    }
}