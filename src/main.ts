import Store from './store/Store';
import CommunicationManager from './communication/CommunicationManager';
import InteractionManager from './interaction/InteractionManager';
import InterfaceManager from './interface/InterfaceManager';

declare global {
  interface Window {
    FlashExternalInterface: {
      legacyTrack: (arg1: string, arg2: string, arg3: string) => void;
      listPlugins: () => string;
      logEventLog: (arg1: string) => void;
      track: (arg1: string, arg2: string, arg3: number) => void;
      logDebug: (arg1: string) => void;
      logWarn: (arg1: string) => void;
      logCrash: (arg1: string) => void;
      logError: (arg1: string) => void;
      openPage: (arg1: string) => void;
      openExternalLink: (arg1: string) => void;
      openHabblet: (arg1: string, arg2: string) => void;
      openWebPageAndMinimizeClient: (arg1: string) => void;
    };
    open(): void;
  }
}

if(process.env.NODE_ENV == 'production') {
  window.FlashExternalInterface.openHabblet = function(arg1: string, arg2: string) {
    CommunicationManager.getInstance().OnMessage(arg1);
  };
  
  window.FlashExternalInterface.legacyTrack = function(arg1: string, arg2: string, arg3: string) {
    if (arg1 == "authentication") {
      Store.GetInstance().connected = true;
      InteractionManager.init();
    }
  };
  
  window.FlashExternalInterface.listPlugins = function() {
    let txt: string = "";
    for (var i = 0; i < navigator.plugins.length; i++) {
      txt += navigator.plugins[i].name + "|";
    }
  
    return txt;
  };
}

InterfaceManager.Init();