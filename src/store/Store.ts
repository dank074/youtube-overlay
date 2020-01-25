import YoutubeVideo from './models/YoutubeVideo';
import Mention from './models/Mention';
import User from './models/User';
import SlotMachine from './models/SlotMachine';
import SessionData from './models/SessionData';

export default class Store {
    private static _instance: Store = new Store();

    connected: boolean = false;
    
    isTyping: boolean = false;
    youtubeVideo: YoutubeVideo = new YoutubeVideo();
    mentions: Mention[] = [];
    session: SessionData = new SessionData();
    slotMachine: SlotMachine = new SlotMachine();

    public static GetInstance() {
        return Store._instance;
    }
}