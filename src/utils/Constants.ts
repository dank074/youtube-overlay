export default class Constants {
    private static avatarImagerUrl =  "https://habbo.es/habbo-imaging/avatarimage?figure="
    private static youtubeApiUrl =  "https://api-music.herokuapp.com/search?keyword="

    public static getAvatarImagerUrl() : string {
        return Constants.avatarImagerUrl;
    }

    public static getYoutubeApiUrl(): string {
        return Constants.youtubeApiUrl;
    }
}