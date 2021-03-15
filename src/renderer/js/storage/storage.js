/**
 * Sets the localstorage on initialize and returns the data to be saved into memory.
 */
export function initSkusSettings() {
    return new Promise((resolve, reject) => {
        let localConfig = localStorage.getItem("skus");

        if(typeof localConfig !== "string") {
            //'15317229', '15178453',
            let config = {
                skus: ['13444247','14425777']
            };
            
            localStorage.setItem("skus", JSON.stringify(config));
            resolve(config)
        }
        else {
            let config = JSON.parse(localConfig);
            resolve(config)
        }
    })

}