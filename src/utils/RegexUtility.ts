export default class RegexUtility {
    public static getVideoIdFromYoutubeURL = function(url: string) {
        const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        let matches = url.match(regex);
        if(matches == null || matches.length < 2)
            return "";  
        
        return matches[1];
    }
}