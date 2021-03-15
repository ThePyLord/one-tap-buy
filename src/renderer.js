
let config = {
    // skus: ['15317229', '15178453','13444247','14425777']
};

//localStorage.setItem("skus", JSON.stringify(config));
function initData() {

    initConfig()
    
    
   // ipcRenderer.send('test', config.skus)
}

initData()

function checkSKU(sku) {
	let passed = false;
	// console.log(`Printing sku.length !== 8: ${sku.length !== 8}`)
	if ((sku.length === 8) && (typeof sku === 'string')) {
		passed = true;
		return passed;
	}
}

function addSKU() {
    let inputData = document.getElementById("text-box").value;
    
    if (checkSKU(inputData)) {
        config.skus.push(inputData);
        
        localStorage.setItem("skus", JSON.stringify(config));
        ipcRenderer.send('get-sku-data', inputData);
        console.log("clicked")
    } else {
        // Should make a custom alert box
        alert("SKU doesn't match");
    }


}

function initConfig() {
    let localConfig = localStorage.getItem("skus");
    // console.log(localConfig)
	//Check if the SKU provided
    if(typeof localConfig !== "string") {
		//'15317229', '15178453',
        let config = {
            skus: ['13444247','14425777']
        };
        
        localStorage.setItem("skus", JSON.stringify(config));
    }
    else {
        config = JSON.parse(localConfig);

    }

}

ipcRenderer.on('received-data', (err, data) => {
	/* [0].name */
	console.log('Printing data \n', data)
	if(err) console.log(err);
	
    if (data.length === 1) {
        let cardsContainer = document.getElementById('cards');
        createProductCard(data[0], cardsContainer);
    } else {
        updateDOM(data)
    }

});



function updateDOM(data) {
    let cardsContainer = document.getElementById('cards')
    cardsContainer.innerHTML = ""

    data.forEach(product => {
        createProductCard(product, cardsContainer);
    })
}

function createProductCard(cardData, masterContainer) {

    let sku, stock, img, remaining;
    let cardBody = document.createElement('div')
    cardBody.classList = "card-dark auto";
    
    // Product name
    prodName = document.createElement('h1')
    prodName.classList = 'product-name'
    prodName.innerText = cardData.shortName
	console.log(cardData)
    // sku
    sku = document.createElement("h4")
    sku.classList = 'small-header sku'
    sku.innerText = `SKU: ${cardData.item.SKU}`
    
    // stock
    stock = document.createElement('p')
    stock.classList = 'text light top-10'
    stock.innerText = `Stock availability: ${cardData.item.stockInfo}`;
	stock.style.color = '#dc143c';

    // img
    img = document.createElement('img')
    img.classList = 'product-image'
    img.src = `${cardData.item.imageFromAPI}`
	img.style.maxHeight = '300px'
	img.style.maxWidth = '300px'


    // quantityRemaining
    remaining = document.createElement('h4')
    remaining.classList = 'small-header'
    remaining.innerText = `Amount in stock: ${cardData.item.quantityRemaining}`;

	cardBody.appendChild(prodName)
    cardBody.appendChild(stock)
    cardBody.appendChild(img)
    cardBody.appendChild(sku)
    cardBody.appendChild(remaining)
    
    masterContainer.appendChild(cardBody);
}


function clearSkus () {
    let arr = {
        skus: []
    };
    localStorage.setItem("skus", JSON.stringify(arr))
}

clearSkus()