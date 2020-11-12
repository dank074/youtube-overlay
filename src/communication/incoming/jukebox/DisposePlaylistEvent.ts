import App from '@/App';
import IncomingMessage from '../IncomingMessage';

export default class DisposePlaylistEvent implements IncomingMessage {
    parse(data: any): void {
        App.interfaceManager.container.$store.commit('jukebox/setPlaylist', []);
    }
}