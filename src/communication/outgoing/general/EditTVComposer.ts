import OutgoingMessage from '../OutgoingMessage';

export default class EditTvComposer implements OutgoingMessage {
    header: string = "edit_tv";
    data: any;

    constructor(ItemId: number, VideoId: string) {
        this.data = {
            "itemId": ItemId, 
            "videoId": VideoId
        };
    }
}