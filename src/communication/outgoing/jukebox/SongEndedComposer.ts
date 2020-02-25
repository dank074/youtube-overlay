import OutgoingMessage from '../OutgoingMessage';
import Store from '@/store/Store';

export default class SongEndedComposer implements OutgoingMessage {
    header: string = "song_ended";    
    data: any;

    composer() {
        this.data = {
            "currentIndex": Store.GetInstance().jukebox.currentIndex
        }
    }
}