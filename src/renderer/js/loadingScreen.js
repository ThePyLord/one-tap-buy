let loadingBar = document.getElementById("loading-bar")
let percentageText = document.getElementById("loading-percent");

// Variables needed for the loading sequence.
let total_skus_to_load = 0;
let loaded_count = 0;

APP.once("getting-sku-init-data", (data) => {
    total_skus_to_load = data.length;
});

/**
 * Updates the Starting loading screens percentage.
 * @param {number} percentage 0.01 - 1
 */
function updateLoadingPercentage (percentage = .001) {
    console.log(`Loading ${(percentage * 100).toFixed(0)}%.`);
    if (percentage >= 1) {
        
        APP.emit("loading-finished");
        APP.removeListener("new-data-loaded") // remove the event listener so it clears up some memory allocation.

        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main").style.display = "block";
    } else {
        percentageText.innerText = `Loading: ${(percentage * 100).toFixed(0)}%`;
        let width = document.getElementById("shell-loading").clientWidth * percentage; // get the required width of the inndebar
        loadingBar.style.width = `${width}px`;
    }
}


// whenever some data has been loaded and added to the dom during startup.
APP.on("new-data-loaded", (e) => {
    // loaded count is the count of all the elementsm retrieved from the initial startup sequence
    loaded_count += 1;
    let percentageLoadedCurrently = loaded_count / total_skus_to_load;
    updateLoadingPercentage(percentageLoadedCurrently);

})
