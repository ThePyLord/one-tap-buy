const { ipcRenderer } = require('electron');
let events =  require("events")

process.on("loaded", (e) => {
    global.APP =  new events.EventEmitter
    global.ipcRenderer = ipcRenderer;
})