import Interaction from './Interaction';
import Store from '@/store/Store';

export default class CommandInteraction implements Interaction {
    enabled: boolean;
    buffer: String[];
    isLogging: boolean;

    constructor() {
        this.enabled = true;
        document.addEventListener("keydown", this.OnKeyDown.bind(this));
        document.addEventListener("keyup", this.OnKeyUp.bind(this));
        window.addEventListener("focus", this.OnFocus.bind(this));
        window.addEventListener('blur', this.OnBlur.bind(this));
        this.buffer = [];
        this.isLogging = false;
    }

    OnKeyUp(e: KeyboardEvent): void {
        if (this.enabled && e.key == ":") {
            // do something
        }
    }

    OnKeyDown(e: KeyboardEvent): void {
        if (this.enabled && e.key == ":" && !this.isLogging) {
            // do something
            this.isLogging = true;
            this.buffer.push(e.key);
        }
        else if(this.enabled && e.key == "Enter" && this.isLogging && Store.GetInstance().isTyping) {
            this.isLogging = false;
            console.log(this.buffer.join(''));
            this.buffer = [];
        }
        else if(this.enabled && this.isLogging && Store.GetInstance().isTyping) {
            this.buffer.push(e.key)
        }
    }

    OnFocus(e: FocusEvent): void {
        console.log("gained focus");
    }

    OnBlur(e: FocusEvent): void {
        console.log("lost focus");
    }
}