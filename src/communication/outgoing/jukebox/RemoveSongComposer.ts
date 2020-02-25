import OutgoingMessage from '../OutgoingMessage';

export default class RemoveSongComposer implements OutgoingMessage {
    header: string = "remove_song";    
    data: any;

    constructor(index: number) {
        this.data = {
            "index": index
        };
    }
    
}