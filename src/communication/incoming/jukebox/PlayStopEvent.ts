import IncomingMessage from '../IncomingMessage';
import InterfaceManager from '@/interface/InterfaceManager';
import JukeboxYoutubeComponent from '@/interface/components/jukebox/JukeboxYoutubeComponent.vue';

export default class PlayStopEvent implements IncomingMessage {
    Parse(data: any): void {
        let playing: boolean = data.playing;
        (InterfaceManager.Container.$root.$children[0].$refs.jukeboxPlayer as JukeboxYoutubeComponent).$emit("play", playing);
    }
}