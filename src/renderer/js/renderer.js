import {createProductCard, checkSKU} from "./handleSKUCards.js"; // handle dom with skus
import {_PrototypingTools} from "./testing/Tools.js"; // testing library
import {initSkusSettings} from "./storage/storage.js";

function initData() {

    initSkusSettings().then(config => {
        if (config.skus.length > 0) ipcRenderer.send('get-skus-list', config.skus);
    });
}

initData()



ipcRenderer.on('received-data', (err, data) => {

	if(err) console.log(err);
	
    if (data.length === 1) {
        let cardsContainer = document.getElementById('cards');
        createProductCard(data[0], cardsContainer);
    }

});

//_PrototypingTools.clearSkusStorage()
//// skus: ['15317229', '15178453','13444247','14425777']
