import {createProductCard, checkSKU} from "./handleSKUCards.js"; // handle dom with skus
import {_PrototypingTools} from "./testing/Tools.js"; // testing library
import {initSkusSettings} from "./storage/storage.js";

// Needed Variables to handle adding skus to the dom.
let renderedSkusList = []; // list of all skus that have been appended to the dom.
let loadingFinished = false;


// TESTING DATA /// REMOVE IN PRODUCTION
_PrototypingTools.setTestSKUS(['14575596','14583636','15317229', '15178453','13444247','14425777', '15254466', '15299574', '15136919', '14583636', '14967578', '14934419', '14584169']); // run this then comment out line:)
// _PrototypingTools.clearSkusStorage() used to clear storage. TESTING FUNCTION MAINLY


/**
 * Takes the products from storage and retrieves the product information data from bb.
 */
function initData() {

    initSkusSettings().then(config => {

        if (config.skus.length > 0) 
        {             

            ipcRenderer.send('get-skus-list', [config.skus, loadingFinished]);
            APP.emit("getting-sku-init-data", {skus: config.skus, length: config.skus.length}); // were emmiting to the global scope that were gettig skus
        }
    });
}

// get all the products and their corresponding data.
// this will also initialize the sequence to the loading screen.
initData()


// 
ipcRenderer.on('received-data', (event, data) => {
    
    // handle adding the new data to the dom.
    if (data.length === 1 && !renderedSkusList.includes(data[0].item.SKU)) {
        renderedSkusList.push(data[0].item.SKU)
        let cardsContainer = document.getElementById('cards');
        createProductCard(data[0], cardsContainer);
    }


    // hendle loading animations with curent data
    if (!loadingFinished) { // runs only if in the initial loading state.
        APP.emit("new-data-loaded");
    }

});

//// skus: ['15317229', '15178453','13444247','14425777']


// used to signifiy the loading sequence is finished.
APP.once("loading-finished", (e) => {
    loadingFinished = true;
});