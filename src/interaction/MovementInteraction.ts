import Interaction from './Interaction';
import { KeyboardKeys } from './KeyboardKeys';
import MoveAvatarComposer from '@/communication/outgoing/general/MoveAvatarComposer';
import App from '@/App';

export default class MovementInteraction implements Interaction {
    public enabled: boolean;
    private keys: KeyboardKeys[];
    private walking: boolean;
    private _walkInterval: any;

    constructor() {
        this.enabled = true;
        this.walking = false;
        this._walkInterval = null;
        document.addEventListener("keydown", this.OnKeyDown.bind(this));
        document.addEventListener("keyup", this.OnKeyUp.bind(this));
        this.keys = [KeyboardKeys.Down, KeyboardKeys.Left, KeyboardKeys.Right, KeyboardKeys.Up];
    }

    OnKeyUp(e: KeyboardEvent): void {
        if (this.enabled && this.keys.includes(e.keyCode)) {
            if (this.walking) {
                this.walking = false;
                this._walkInterval = setTimeout(() => {
                    if (this.walking)
                        return;
                    App.communicationManager.sendMessage(new MoveAvatarComposer("stop"));
                }, 500);
            }
        }
    }

    OnKeyDown(e: KeyboardEvent): void {
        if (this.enabled && this.keys.includes(e.keyCode)) {
            this.walking = true;
            clearTimeout(this._walkInterval);
            let direction = "";
            switch (e.keyCode) {
                case KeyboardKeys.Left:
                    direction = "left";
                    break;
                case KeyboardKeys.Up:
                    direction = "up";
                    break;
                case KeyboardKeys.Right:
                    direction = "right";
                    break;
                case KeyboardKeys.Down:
                    direction = "down";
                    break;
                default:
                    return;
            }
            App.communicationManager.sendMessage(new MoveAvatarComposer(direction));
        }
    }
}