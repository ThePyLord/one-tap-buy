class PrototypingTools {
    /**
     * Clears all Skus inside localstorage
     */
    clearSkusStorage () {
        let arr = {
            skus: []
        };
        localStorage.setItem("skus", JSON.stringify(arr))
    }

    /**
     * Set list of skus to be added to localstorage. This resets all skus inside localstorage.
     * @param {array} skus An array of strings for skus to be added to storage.
     */
     setTestSKUS (skus = []) {
        let arr = {
            skus: skus
        };
        localStorage.setItem("skus", JSON.stringify(arr))
    }

}

export let _PrototypingTools = new PrototypingTools();