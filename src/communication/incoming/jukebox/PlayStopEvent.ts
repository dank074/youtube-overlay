import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class PlayStopEvent implements IncomingMessage {
    Parse(data: any): void {
        let playing: boolean = data.playing;
        App.interfaceManager.bus.$emit("play", playing);
    }
}