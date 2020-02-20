import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class DisposePlaylistEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().jukebox.playlist = [];
    }
}