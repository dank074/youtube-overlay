import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class SlotMachineEvent implements IncomingMessage {
    parse(data: any): void {
        App.interfaceManager.container.$store.commit('slotmachine/setItemId', data.itemId);
        App.interfaceManager.container.$store.commit('session/setCredits', data.credits);
        App.interfaceManager.container.$store.commit('slotmachine/setOpen', true);
    }
}