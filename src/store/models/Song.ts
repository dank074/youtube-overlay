export default class Song {
    name: string;
    videoId: string;
    channel: string;

    constructor(name: string, videoId: string, channel: string) {
        this.name = name;
        this.videoId = videoId;
        this.channel = channel;
    }
}