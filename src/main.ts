import Logger from '@/utils/Logger';
import App from './App';
import { CommunicationType } from './communication/CommunicationType';

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
    startYTOverlay: (sso?: string, wsUrl?: string) => void;
    connectWebSocket: () => void;
  }
}

App.init();
App.interfaceManager.initInterface();

window.startYTOverlay = function(sso?: string, wsUrl?: string) {
  if(sso && wsUrl) {
    App.communicationManager.mode = CommunicationType.WebSocket;
    App.communicationManager.wsUrl = wsUrl;
    App.communicationManager.sso = sso;
  } else {
    App.communicationManager.mode = CommunicationType.ExternalFlashInterface;
  }
  initExternalFlashInterface();
  Logger.Log(`Started application with mode ${App.communicationManager.mode}`);
}

window.connectWebSocket = function() {
  App.communicationManager.connectWebSocket();
}

let initExternalFlashInterface = function() {
  if(!window.FlashExternalInterface) {
    window.FlashExternalInterface = {
      legacyTrack: (arg1: string, arg2: string, arg3: string) => {},
      listPlugins: () => { return ''},
      logEventLog: (arg1: string) => {},
      track: (arg1: string, arg2: string, arg3: number) => {},
      logDebug: (arg1: string) => {},
      logWarn: (arg1: string) => {},
      logCrash: (arg1: string) => {},
      logError: (arg1: string) => {},
      openPage: (arg1: string) => {},
      openExternalLink: (arg1: string) => {},
      openHabblet: (arg1: string, arg2: string) => {},
      openWebPageAndMinimizeClient: (arg1: string) => {},
    };
  }

  window.FlashExternalInterface.openHabblet = function(arg1: string, arg2: string) {
    App.communicationManager.onMessage(arg1);
  };

  window.FlashExternalInterface.legacyTrack = function(arg1: string, arg2: string, arg3: string) {
    if (arg1 === "authentication") {
      if(App.communicationManager.mode === CommunicationType.WebSocket) {
        App.communicationManager.connectWebSocket();
      } else {
        App.communicationManager.onOpen();
      }
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

initExternalFlashInterface();

let frame : any = document.getElementById('nitro');
//@ts-ignore
if(NitroConfig || frame) {
  App.communicationManager.mode = CommunicationType.IFrameExternalFlashInterface;
  App.communicationManager.onOpen();//force connection to true for now
}

if(frame && frame.contentWindow) {
  window.addEventListener('message', (ev) => {
    if (!frame || ev.source !== frame.contentWindow) return;
  
    const legacyInterface = 'Nitro_LegacyExternalInterface';
  
    if (typeof ev.data !== 'string') return;
  
    if (ev.data.startsWith(legacyInterface)) {
      const { method, params } = JSON.parse(
        ev.data.substr(legacyInterface.length)
      );
  
      if (!('FlashExternalInterface' in window)) return;
  
      const fn = (window.FlashExternalInterface as any)[method];
      if (!fn) return;
  
      fn(...params);
      return;
    }
  });
}
