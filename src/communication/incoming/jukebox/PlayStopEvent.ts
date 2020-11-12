import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class PlayStopEvent implements IncomingMessage {
    parse(data: any): void {
        let playing: boolean = data.playing;
        App.interfaceManager.bus.$emit("play", playing);
    }
}