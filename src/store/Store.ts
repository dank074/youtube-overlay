import YoutubeVideo from './models/YoutubeVideo';

export default class Store {
    private static _instance: Store = new Store();

    connected: boolean = false;
    youtubeVideo: YoutubeVideo = new YoutubeVideo();
    
    public static GetInstance() {
        return Store._instance;
    }
}