// bring in 'node-fetch' package for easy async data fetching
const fetch = require('node-fetch');

const getLaunchData = (date, offset) => {
    let launchDataUrl = `https://launchlibrary.net/1.2/launch/${date}?offset=${offset}`
    return fetch(launchDataUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`There was a problem getting the data.`);
            }
        })
        .then(launchData => launchData)
        .catch(err => {
            console.log(err.message);
        })
}

const getData = (date, offset) => {
    return getLaunchData(date, offset).then(result => result);
}

module.exports = getData;