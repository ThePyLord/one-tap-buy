const { ipcRenderer } = require('electron');

process.on("loaded", (e) => {
    global.ipcRenderer = ipcRenderer;
})