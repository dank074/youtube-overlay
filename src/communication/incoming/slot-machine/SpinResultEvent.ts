import IncomingMessage from '../IncomingMessage';
import Store from '@/store/Store';
import InterfaceManager from '@/interface/InterfaceManager';
import SlotMachineComponent from '@/interface/components/slot-machine/SlotMachineComponent.vue';

export default class SpinResultEvent implements IncomingMessage {
    
    Parse(data: any): void {
        Store.GetInstance().slotMachine.results.push(data.result1);
        Store.GetInstance().slotMachine.results.push(data.result2);
        Store.GetInstance().slotMachine.results.push(data.result3);
        Store.GetInstance().slotMachine.won = data.won;
        Store.GetInstance().slotMachine.payout = data.payout;
        Store.GetInstance().slotMachine.isSpinning = true;
        (InterfaceManager.Container.$root.$children[0].$refs.slotmachine as SlotMachineComponent).$emit("results");
    }
}