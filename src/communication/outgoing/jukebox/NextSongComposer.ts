import OutgoingMessage from '../OutgoingMessage';
import Store from '@/store/store';

export default class NextSongComposer implements OutgoingMessage {
    header: string = "next_song";
    data: any;

    constructor(currentIndex: number) {
        this.data = {
            "currentIndex": currentIndex
        };
    }
}