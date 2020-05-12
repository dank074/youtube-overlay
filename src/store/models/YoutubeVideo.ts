export default class YoutubeVideo {
    public open: boolean;
    public videoId: string;
    public itemId: number;
    public editMode: boolean;
  
    constructor() {
      this.open = false;
      this.videoId = "";
      this.itemId = 0;
      this.editMode = false;
    }
}