import OutgoingMessage from '../OutgoingMessage';
import Store from '@/store/Store';

export default class PreviousSongComposer implements OutgoingMessage {
    header: string = "prev_song";    
    data: any;

    constructor() {
        this.data = {
            "currentIndex": Store.GetInstance().jukebox.currentIndex
        };
    }
    
}