import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class PlaylistEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().jukebox.playlist = data.playlist;
    }
}