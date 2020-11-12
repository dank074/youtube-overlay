import OutgoingMessage from '../OutgoingMessage';

export default class SongEndedComposer implements OutgoingMessage {
    header: string = "song_ended";    
    data: any;

    composer(currentIndex: number) {
        this.data = {
            "currentIndex": currentIndex
        }
    }
}