import MovementInteraction from './MovementInteraction';
import Interaction from './Interaction';

export default class InteractionManager {
    private _interactions: Map<String, Interaction>;

    constructor() {
        this._interactions = new Map<String, Interaction>();
        this.registerInteractions();
    }

    private registerInteractions() {
        this._interactions.set("movement", new MovementInteraction());
    }

    public get interactions(): Map<String, Interaction> {
        return this._interactions;
    }
}