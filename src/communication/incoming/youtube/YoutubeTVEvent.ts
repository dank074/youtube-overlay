import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class YoutubeTVEvent implements IncomingMessage{
    Parse(data: any): void {
        let VideoId = data.videoId;

        Store.GetInstance().youtubeVideo.open = true;
        Store.GetInstance().youtubeVideo.videoId = VideoId;
        Store.GetInstance().youtubeVideo.itemId = data.itemId;
        Store.GetInstance().youtubeVideo.editMode = (VideoId == "");
    }
}