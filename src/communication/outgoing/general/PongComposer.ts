import OutgoingMessage from '../OutgoingMessage';

export default class PongComposer implements OutgoingMessage {
  header: string = "pong";    
  data: any;
  
  constructor() {
      this.data = {
          "message": ""
      };
  }
}