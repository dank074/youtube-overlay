import IncomingMessage from '../IncomingMessage';
import Song from '@/store/models/Song';
import App from '@/App';

export default class AddSongEvent implements IncomingMessage {
    parse(data: any): void {
        let song: Song = data.song;
        App.interfaceManager.container.$store.commit('jukebox/addToPlaylist', song);
    }
}