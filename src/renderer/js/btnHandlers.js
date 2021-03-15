import {checkSKU} from "./handleSKUCards.js";
// methods for export and import

function addSKU() {
    let inputData = document.getElementById("text-box").value;
    
    if (checkSKU(inputData)) {
        let skusSaved = JSON.parse(localStorage.getItem("skus"));
        if (skusSaved.skus.includes(inputData)) {
            alert("This sku is already saved. You cant save it again :)");
        } else {
            skusSaved.skus.push(inputData);
            
            localStorage.setItem("skus", JSON.stringify(skusSaved));
            ipcRenderer.send('get-sku-data', inputData);
        }
        
    } else {
        // Should make a custom alert box
        alert("SKU doesn't match");
    }

    document.getElementById("text-box").value = "";

}


// event handlers

document.getElementById("add-sku-btn").addEventListener("click", addSKU);