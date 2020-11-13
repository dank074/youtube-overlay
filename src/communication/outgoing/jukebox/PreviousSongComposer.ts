import OutgoingMessage from '../OutgoingMessage';

export default class PreviousSongComposer implements OutgoingMessage {
    header: string = "prev_song";    
    data: any;

    constructor(currentIndex: number) {
        this.data = {
            "currentIndex": currentIndex
        };
    }
    
}