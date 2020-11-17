# youtube-overlay

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## How to run it in your client
1. Transpile the project to javascript by running `npm run build`
2. Copy the files from your `dist` folder to your webserver
3. Create a div with id=app in your client.php
4. Import the javascript and css files into your client.php
5. Call the function `window.startYTOverlay(sso?: string, wsUrl?: string)` if you want to use a WebSocket connection rather than the FlashExternalInterface for communication.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
