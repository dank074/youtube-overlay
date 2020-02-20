import Song from "./Song";

export default class Jukebox {
    open: boolean = false;
    playlist: Song[] = [];
    currentIndex: number = 0;
}