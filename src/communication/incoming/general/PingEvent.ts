import App from '@/App';
import PongComposer from '@/communication/outgoing/general/PongComposer';
import IncomingMessage from '../IncomingMessage';

export default class PingEvent implements IncomingMessage {
  parse(data: any): void {
      App.communicationManager.sendMessage(new PongComposer());
  }
}