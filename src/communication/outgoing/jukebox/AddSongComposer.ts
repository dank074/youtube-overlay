import OutgoingMessage from '../OutgoingMessage';
import Song from '@/store/models/Song';

export default class AddSongComposer implements OutgoingMessage {
    public header: string = "add_song";
    data: any;

    constructor(song: Song) {
        this.data = {
            "name": song.name,
            "videoId": song.videoId,
            "channel": song.channel
        };
    }
    
}