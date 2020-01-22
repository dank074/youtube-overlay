export default class Mention {
    public sender: string;
    public message: string;
    public time: number;
    
    constructor(sender: string, message: string) {
        this.sender = sender;
        this.message = message;
        this.time = Date.now();
    }
}