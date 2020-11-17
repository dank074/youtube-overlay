import OutgoingMessage from '../OutgoingMessage';

export default class SSOTicketComposer implements OutgoingMessage {
  header: string = "sso";    
  data: any;
  
  constructor(sso: string) {
      this.data = {
          "ticket": sso
      };
  }
}