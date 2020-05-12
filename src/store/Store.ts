import YoutubeVideo from './models/YoutubeVideo';
import Mention from './models/Mention';
import User from './models/User';
import SlotMachine from './models/SlotMachine';
import SessionData from './models/SessionData';
import Jukebox from './models/Jukebox';
import Twitch from './models/Twitch';

export default class Store {
    private static _instance: Store = new Store();

    connected: boolean = false;
    
    youtubeVideo: YoutubeVideo = new YoutubeVideo();
    twitch: Twitch = new Twitch();
    mentions: Mention[] = [];
    session: SessionData = new SessionData();
    commands: string[] = [];
    commands_open: boolean = false;
    slotMachine: SlotMachine = new SlotMachine();
    jukebox: Jukebox = new Jukebox();

    public static GetInstance() {
        return Store._instance;
    }
}