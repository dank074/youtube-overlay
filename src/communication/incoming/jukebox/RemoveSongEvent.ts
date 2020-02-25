import IncomingMessage from '../IncomingMessage';
import InterfaceManager from '@/interface/InterfaceManager';
import JukeboxYoutubeComponent from '@/interface/components/jukebox/JukeboxYoutubeComponent.vue';

export default class RemoveSongEvent implements IncomingMessage {
    Parse(data: any): void {
        let index:number = data.index;
        (InterfaceManager.Container.$root.$children[0].$refs.jukeboxPlayer as JukeboxYoutubeComponent).$emit("removeSong", index);
    }
}