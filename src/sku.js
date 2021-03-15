const { ipcMain } = require('electron');
const axios = require('axios');
const cheerio = require('cheerio');
const fs =  require('fs');

ipcMain.on("get-skus-list", (event, args) => {
	let skus = args;

	skus.forEach(sku => {
		let returnData = {
			name: "",
			item: undefined
		}

		scrapeProd(sku).then(item => {
			returnData.item = item;
			findProdName(item.productURL).then(name => {
				returnData.name = name.split(' ').slice(0, 4).toString().replace(/,/g, ' ');
				event.reply('received-data', [returnData])
			})
		}).catch(err => console.log(`e -> ${err}`));
	})

});


// Get SKU info
ipcMain.on("get-sku-data", (event, args) => {
	let sku = args;
	let returnData = {
		name: "",
		shortName: "",
		item: undefined
	}

	scrapeProd(sku).then(item => {
		returnData.item = item;

		findProdName(item.productURL).then(name => {
			returnData.name = name;
			let shortName = name
			.split(' ')
			.slice(0, 4)
			.toString()
			.replace(/,/g, ' ');
			returnData.shortName = shortName;
			console.log(returnData.shortName)
			// console.log(re)
			event.reply('received-data', [returnData])

		}).catch(err => {
			// console.log("44 -");
			console.log(err)
		})
	}).catch(err => {
		// console.log("48")
		console.log(err)
	})
});



function scrapeProd(sku) {

	return new Promise((resolve, reject) => {
		// GET REQUEST HEADER INFORMATION
		let requestQuery = {
			method: "GET",
			url: `https://www.bestbuy.ca/ecomm-api/availability/products?accept=application%2Fvnd.bestbuy.standardproduct.v1%2Bjson&accept-language=en-CA&locations=977%7C203%7C931%7C62%7C617%7C927%7C965%7C57%7C938%7C237%7C943%7C932%7C956%7C202%7C200%7C937%7C926%7C795%7C916%7C544%7C910%7C954%7C207%7C233%7C930%7C622%7C223%7C245%7C925%7C985%7C990%7C959%7C949%7C942&postalCode=M5G2C3&skus=${sku}`,
			headers: {
				"authority": 'www.bestbuy.ca',
				"pragma": 'no-cache',
				"cache-control": 'no-cache',
				"user-agent": 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4159.2 Safari/537.36',
				"accept": '*/*',
				"sec-fetch-site": 'same-origin',
				"sec-fetch-mode": 'cors',
				"sec-fetch-dest": 'empty',
				"accept-language": 'en-US,en;q=0.9'
			}
		}

		axios(requestQuery).then(data => {
			
			// this is the item metadata
			const item = {
				quantityRemaining: data.data["availabilities"]["0"]["shipping"]["quantityRemaining"],
				stockInfo: data.data["availabilities"]["0"]["shipping"]["status"],
				stockLimit: data.data["availabilities"]["0"]["shipping"]["orderLimit"],
				imageFromAPI: `https://multimedia.bbycastatic.ca/multimedia/products/500x500/${data.data["availabilities"]["0"]["sku"].toString().substr(0, 3)}/${data.data["availabilities"]["0"]["sku"].toString().substr(0, 5)}/${data.data["availabilities"]["0"]["sku"]}.jpg`,
				productURL: `https://www.bestbuy.ca/en-ca/product/${data.data["availabilities"]["0"]["sku"]}`,
				SKU: data.data["availabilities"]["0"]["sku"]
			}
			resolve(item);

		}).catch(err => {
			reject(err)
		});
	})

}

function findProdName (url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then((res) => {
			const content = res.data
			const $ = cheerio.load(content);
			const prodName = $('h1').text()
			resolve(prodName)
		});
	});
}