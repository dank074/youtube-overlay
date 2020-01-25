import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';

export default class SlotMachineEvent implements IncomingMessage {
    Parse(data: any): void {
        Store.GetInstance().slotMachine.itemId = data.itemId;
        Store.GetInstance().session.credits = data.credits;
        Store.GetInstance().slotMachine.open = true;
    }
}