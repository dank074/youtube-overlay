import App from '@/App';
import IncomingMessage from './incoming/IncomingMessage';
import YoutubeTVEvent from './incoming/youtube/YoutubeTVEvent';
import OutgoingMessage from './outgoing/OutgoingMessage';
import Logger from '@/utils/Logger';
import SlotMachineEvent from './incoming/slot-machine/SlotMachineEvent';
import SpinResultEvent from './incoming/slot-machine/SpinResultEvent';
import SessionDataEvent from './incoming/general/SessionDataEvent';
import UpdateCreditsEvent from './incoming/general/UpdateCreditsEvent';
import CommandsEvent from './incoming/general/CommandsEvent';
import JukeboxEvent from './incoming/jukebox/JukeboxEvent';
import PlayStopEvent from './incoming/jukebox/PlayStopEvent';
import PlaySongEvent from './incoming/jukebox/PlaySongEvent';
import PlaylistEvent from './incoming/jukebox/PlaylistEvent';
import DisposePlaylistEvent from './incoming/jukebox/DisposePlaylistEvent';
import AddSongEvent from './incoming/jukebox/AddSongEvent';
import RemoveSongEvent from './incoming/jukebox/RemoveSongEvent';
import TwitchVideoEvent from './incoming/youtube/TwitchVideoEvent';

export default class CommunicationManager {
    private _events : Map<String, IncomingMessage>;

    constructor() {
        this._events = new Map<String, IncomingMessage>();
        this.registerMessages();
    }

    private registerMessages(): void {
        this._events.set("youtube_tv", new YoutubeTVEvent());
        this._events.set("slot_machine", new SlotMachineEvent());
        this._events.set("slot_result", new SpinResultEvent());
        this._events.set("session_data", new SessionDataEvent());
        this._events.set("update_credits", new UpdateCreditsEvent());
        this._events.set("commands", new CommandsEvent());
        this._events.set("jukebox_player", new JukeboxEvent());
        this._events.set("play_stop", new PlayStopEvent());
        this._events.set("play_song", new PlaySongEvent());
        this._events.set("add_song", new AddSongEvent());
        this._events.set("remove_song", new RemoveSongEvent());
        this._events.set("playlist", new PlaylistEvent());
        this._events.set("dispose_playlist", new DisposePlaylistEvent());
        this._events.set("twitch", new TwitchVideoEvent());
    }

    public sendMessage(message: OutgoingMessage): void {
        if (!App.interfaceManager.container.$store.state.connected || !message)
            return;
        let swfObject: any = document.querySelector('object, embed') as any;
        if(swfObject)
            swfObject.openroom(JSON.stringify(message));
    }

    public onMessage(message: string): void {
        let json = JSON.parse(message.replace(/&#47;/g, "/"));
        let parser = this._events.get(json.header);
        if(parser) {
            parser.Parse(json.data);
        } else {
            Logger.Log(json);
        }
    }

    public get events(): Map<String, IncomingMessage> {
        return this._events;
    }
}