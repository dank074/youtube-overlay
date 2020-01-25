import OutgoingMessage from '../OutgoingMessage';

export default class RequestCreditsComposer implements OutgoingMessage {
    header: string = "request_credits";    
    data: any;
    
    constructor() {
        this.data = {
            "idk": false
        };
    }
}