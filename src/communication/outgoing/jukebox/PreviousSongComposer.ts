import OutgoingMessage from '../OutgoingMessage';
import Store from '@/store/store';

export default class PreviousSongComposer implements OutgoingMessage {
    header: string = "prev_song";    
    data: any;

    constructor(currentIndex: number) {
        this.data = {
            "currentIndex": currentIndex
        };
    }
    
}