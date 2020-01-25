import User from './User';

export default class SessionData extends User{
    public credits: number;

    constructor() {
        super();
        this.credits = 0;
    }
}