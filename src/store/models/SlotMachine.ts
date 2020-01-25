export default class SlotMachine {
    public results: number[];
    public open: boolean;
    public audio: Map<String, HTMLAudioElement>;
    public isSpinning: boolean;
    public won: boolean;
    public items: SlotItem[];
    public itemId: number;
    public payout: number;

    constructor() {
        this.results = [];
        this.open = false;
        this.itemId = 0;
        this.isSpinning = false;
        this.won = false;
        this.payout = 0;
        this.audio = new Map<String, HTMLAudioElement>();
        this.audio.set("win", new Audio('https://freesound.org/data/previews/387/387232_1474204-lq.mp3'));
        this.audio.set("insertCoin", new Audio('https://freesound.org/data/previews/276/276091_5123851-lq.mp3'));
        this.audio.set("bigwin", new Audio('https://freesound.org/data/previews/270/270319_5123851-lq.mp3'));
        this.audio.set("spin", new Audio('https://freesound.org/data/previews/120/120373_824230-lq.mp3'));
        this.audio.set("spinEnd", new Audio('https://freesound.org/data/previews/145/145441_2615119-lq.mp3'));
        this.audio.set("lock", new Audio('https://freesound.org/data/previews/56/56246_91374-lq.mp3'));
        this.items = [
            new SlotItem("Lemon", 3, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Lemon-512.png"), 
            new SlotItem("Melon", 8, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Watermelon-512.png"),
            new SlotItem("Grapes", 10, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Grapes-512.png"),
            new SlotItem("Cherry", 32, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Cherry-512.png"),
            new SlotItem("Bar", 64, "https://cdn4.iconfinder.com/data/icons/casino-games/512/bar-512.png")
        ];
    }
}

class SlotItem {
    public name: string;
    public value: number;
    public image: string;

    constructor(name: string, value: number, image: string) {
        this.name = name;
        this.value = value;
        this.image = image;
    }
}