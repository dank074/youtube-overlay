import IncomingMessage from '../IncomingMessage';
import Song from '@/store/models/Song';
import Store from '@/store/Store';

export default class AddSongEvent implements IncomingMessage {
    Parse(data: any): void {
        let song: Song = data.song;
        Store.GetInstance().jukebox.playlist.push(song);
    }
}