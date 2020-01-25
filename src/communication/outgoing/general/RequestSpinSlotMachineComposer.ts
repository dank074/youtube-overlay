import OutgoingMessage from '../OutgoingMessage';

export default class RequestSpinSlotMachineComposer implements OutgoingMessage {
    public header: string = "spin_slot_machine";    
    data: any;

    constructor(item_id: number, bet: number) {
        this.data = {
            "itemId": item_id,
            "bet": bet
        };
    }
}