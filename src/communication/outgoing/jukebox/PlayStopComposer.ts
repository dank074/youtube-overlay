import OutgoingMessage from '../OutgoingMessage';

export default class PlayStopComposer implements OutgoingMessage {
    header: string = "play_stop";    
    data: any;

    constructor(play: boolean) {
        this.data = {
            "play": play
        };
    }
    
}