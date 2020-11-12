import IncomingMessage from '../IncomingMessage';
import App from '@/App';

export default class SpinResultEvent implements IncomingMessage {
    
    parse(data: any): void {
        App.interfaceManager.container.$store.commit(
            'slotmachine/setResults', 
            [data.result1, data.result2, data.result3]
        );
        App.interfaceManager.container.$store.commit('slotmachine/setWon', data.won);
        App.interfaceManager.container.$store.commit('slotmachine/setPayout', data.payout);
        App.interfaceManager.container.$store.commit('slotmachine/setSpinning', true);
        App.interfaceManager.bus.$emit("results");
    }
}