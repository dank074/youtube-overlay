import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class YoutubeTVEvent implements IncomingMessage{
    Parse(data: any): void {
        let VideoId = data.videoId;

        if(VideoId == "")
            return;

        Store.GetInstance().youtubeVideo.open = true;
        Store.GetInstance().youtubeVideo.videoId = VideoId;
    }
}