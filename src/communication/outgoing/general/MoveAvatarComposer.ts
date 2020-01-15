import OutgoingMessage from '../OutgoingMessage';

export default class MoveAvatarComposer implements OutgoingMessage{
    public header = "move_avatar";    
    data: any;

    constructor(direction: string) {
        this.data = {
            "direction": direction 
        };
    }
}