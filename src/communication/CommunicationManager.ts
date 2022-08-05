import { CommunicationType } from './CommunicationType';
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
import PingEvent from './incoming/general/PingEvent';
import SSOTicketComposer from './outgoing/general/SSOTicketComposer';

export default class CommunicationManager {
    private _webSocket?: WebSocket;
    private _events : Map<String, IncomingMessage>;
    private _mode?: CommunicationType;
    private _sso?: string;
    private _wsUrl?: string;

    constructor() {
        this._events = new Map<String, IncomingMessage>();
        this.registerMessages();
    }

    private registerMessages(): void {
        this._events.set("ping", new PingEvent());
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
        if(this._mode === CommunicationType.WebSocket) {
            if (!this._webSocket || this._webSocket.readyState != WebSocket.OPEN) return;
            this._webSocket.send(JSON.stringify(message));
        } else if(this._mode === CommunicationType.IFrameExternalFlashInterface) {
            let frame: any = document.getElementById('nitro');
            if(frame != null && frame.contentWindow) frame.contentWindow.openroom(JSON.stringify(message));
            else (window as any).openroom(JSON.stringify(message));
        } else {
            let swfObject: any = document.querySelector('object, embed') as any;
            if(swfObject) swfObject.openroom(JSON.stringify(message));
        }
    }

    public onMessage(message: string | MessageEvent): void {
        let json: any;
        if (typeof message === 'string' || message instanceof String) {
            json = JSON.parse(message.replace(/&#47;/g, "/"));
        } else {
            json = JSON.parse(message.data);
        }
        let parser = this._events.get(json.header);
        if(parser) parser.parse(json.data);
        else Logger.Log(json);
    }

    public onOpen(): void {
        if(this._mode === CommunicationType.WebSocket && this._sso) {
            this.sendMessage(new SSOTicketComposer(this._sso))
        }
        App.interfaceManager.container.$store.commit("setConnected", true);
        Logger.Log("connected");
    }

    private onClose(): void {
        App.interfaceManager.container.$store.commit("setConnected", false);
        Logger.Log("WebSocket closed");
    }

    private onError(ev: Event): void {
        Logger.Log("WebSocket Error");
    }

    public connectWebSocket(): void {
        if(!this._sso || !this._wsUrl) {
            throw new Error("Cannot start websocket connection with undefined sso ticket or ws url");
        }
        this._webSocket = new WebSocket(this._wsUrl);
        this._webSocket.onopen = this.onOpen;
        this._webSocket.onclose = this.onClose;
        this._webSocket.onmessage = this.onMessage;
        this._webSocket.onerror = this.onError;
    }

    public get events(): Map<String, IncomingMessage> {
        return this._events;
    }

    public get mode(): CommunicationType {
        return this._mode!;
    }

    public set mode(type: CommunicationType) {
        this._mode = type;
    }

    public set wsUrl(url: string) {
        this._wsUrl = url;
    }

    public set sso(sso: string) {
        this._sso = sso;
    }
}
