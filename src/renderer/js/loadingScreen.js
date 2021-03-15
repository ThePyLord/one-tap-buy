let loadingBar = document.getElementById("loading-bar")
let percentageText = document.getElementById("loading-percent");

let total_skus_to_load = 0;
let loaded_count = 0;

APP.on("getting-sku-init-data", (data) => {
    total_skus_to_load = data.length;
});


function updateLoadingPercentage (percentage = .001) {
    console.log(`Loading ${(percentage * 100).toFixed(0)}%.`);
    if (percentage >= 1) {
        APP.emit("loading-finished");
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main").style.display = "block";
    } else {
        percentageText.innerText = `Loading: ${(percentage * 100).toFixed(0)}%`;
        let width = document.getElementById("shell-loading").clientWidth * percentage; // get the required width of the inndebar
        loadingBar.style.width = `${width}px`;
    }
}


APP.on("new-data-loaded", (e) => {
    loaded_count += 1;
    let percentageLoadedCurrently = loaded_count / total_skus_to_load;
    updateLoadingPercentage(percentageLoadedCurrently);

})
