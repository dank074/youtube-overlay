import YoutubeVideo from './models/YoutubeVideo';
import Mention from './models/Mention';

export default class Store {
    private static _instance: Store = new Store();

    connected: boolean = false;

    isTyping: boolean = false;
    youtubeVideo: YoutubeVideo = new YoutubeVideo();
    mentions: Mention[] = [];
    
    public static GetInstance() {
        return Store._instance;
    }
}