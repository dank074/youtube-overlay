import IncomingMessage from '../IncomingMessage';
import Song from '@/store/models/Song';
import App from '@/App';

export default class AddSongEvent implements IncomingMessage {
    Parse(data: any): void {
        let song: Song = data.song;
        App.interfaceManager.container.$store.commit('jukebox/addToPlaylist', song);
    }
}