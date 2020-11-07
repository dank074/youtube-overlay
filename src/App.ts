import InterfaceManager from '@/interface/InterfaceManager';
import CommunicationManager from '@/communication/CommunicationManager';
import InteractionManager from '@/interaction/InteractionManager';

export default class App {
  private static _interfaceManager: InterfaceManager;
  private static _communicationManager: CommunicationManager;
  private static _interactionManager: InteractionManager;

  public static init() {
    App._interfaceManager = new InterfaceManager();
    App._communicationManager = new CommunicationManager();
    App._interactionManager = new InteractionManager();
  }

  public static get interfaceManager() : InterfaceManager {
    return App._interfaceManager;
  }

  public static get communicationManager() : CommunicationManager {
    return App._communicationManager;
  }

  public static get interactionManager() : InteractionManager {
    return App._interactionManager;
  }
}