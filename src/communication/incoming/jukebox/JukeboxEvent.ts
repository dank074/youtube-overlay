import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class JukeboxEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().jukebox.playlist = data.playlist;
        Store.GetInstance().jukebox.open = true;
    }
}