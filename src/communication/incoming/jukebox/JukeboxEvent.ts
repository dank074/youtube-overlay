import App from '@/App';
import IncomingMessage from '../IncomingMessage';

export default class JukeboxEvent implements IncomingMessage {
    Parse(data: any): void {
        App.interfaceManager.container.$store.commit('jukebox/setPlaylist', data.playlist);
        App.interfaceManager.container.$store.commit('jukebox/setOpen', true);
    }
}