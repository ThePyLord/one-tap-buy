
/**
 * Given the data for a card: creates a card with the revelent sku data. Then appends it to the parent DOM element.
 * @param {*} cardData The data that will be needed to craft the card.
 * @param {*} masterContainer The container that will now append the new card to.
 */
 export function createProductCard(cardData, masterContainer) {

    let sku, stock, img, remaining, prodName;
    let cardBody = document.createElement('div')
    cardBody.classList = "card auto";
    
    // Product name and revelent styling
    prodName = document.createElement('h1')
    prodName.classList = 'product-name'
    prodName.innerText = cardData.name;

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

    // apend new elems to the master element
	cardBody.appendChild(prodName)
    cardBody.appendChild(stock)
    cardBody.appendChild(img)
    cardBody.appendChild(sku)
    cardBody.appendChild(remaining)
    
    
    masterContainer.appendChild(cardBody);
}

/**
 * Given a string representation of the sku this function will return true/false whether or not the sku is in a valid format.
 * @param {string} sku The sku in string format. If sku is an integer then convert to a str.
 * @returns boolean -> isSku in correct format
 */
export function checkSKU(sku) {
	let passed = false;
	// console.log(`Printing sku.length !== 8: ${sku.length !== 8}`)
	if ((sku.length === 8) && (typeof sku === 'string')) {
		passed = true;
		return passed;
	}
}

/**
 * Shortens the length of the product and returns it.
 * @param {string} name A string containing the name to be shortened.
 */
function shortenLenghth (name) {
    let shortName = name
			.split(' ')
			.slice(0, 4)
			.toString()
			.replace(/,/g, ' ');
    return shortName;
}