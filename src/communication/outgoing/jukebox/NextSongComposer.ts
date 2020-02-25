import OutgoingMessage from '../OutgoingMessage';
import Store from '@/store/Store';

export default class NextSongComposer implements OutgoingMessage {
    header: string = "next_song";
    data: any;

    constructor() {
        this.data = {
            "currentIndex": Store.GetInstance().jukebox.currentIndex
        };
    }
}