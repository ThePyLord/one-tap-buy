import {createProductCard, checkSKU} from "./handleSKUCards.js"; // handle dom with skus
import {_PrototypingTools} from "./testing/Tools.js"; // testing library
import {initSkusSettings} from "./storage/storage.js";

let renderedSkusList = []; // list of all skus that have been appended to the dom.
let loadingFinished = false;

_PrototypingTools.setTestSKUS(['14575596','14583636','15317229', '15178453','13444247','14425777', '15254466', '15299574', '15136919', '14583636', '14967578', '14934419', '14584169']); // run this then comment out line:)
// _PrototypingTools.clearSkusStorage() used to clear storage. TESTING FUNCTION MAINLY

function initData() {

    initSkusSettings().then(config => {

        if (config.skus.length > 0) 
        {             

            ipcRenderer.send('get-skus-list', [config.skus, loadingFinished]);
            APP.emit("getting-sku-init-data", {skus: config.skus, length: config.skus.length}); // were emmiting to the global scope that were gettig skus
        }
    });
}

initData()


ipcRenderer.on('received-data', (event, data) => {
    
    if (data.length === 1 && !renderedSkusList.includes(data[0].item.SKU)) {
        renderedSkusList.push(data[0].item.SKU)
        let cardsContainer = document.getElementById('cards');
        createProductCard(data[0], cardsContainer);
    }

    // hendle loading animations with curent data
    if (!loadingFinished) {
        APP.emit("new-data-loaded");
    }

});

//// skus: ['15317229', '15178453','13444247','14425777']


APP.on("loading-finished", (e) => {
    loadingFinished = true;
});