// a couple of globals for page wide use
var currentOffset = `0`
var currentPage = 0
var numOfPages = 0

const getLaunchData = (offset) => {
    const launchDataUrl = `http://localhost:8000/launches?offset=${offset}`;
    return fetch(launchDataUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`There was a problem obtaining raw launch data`);
            }
        })
        .then(launchData => {
            return launchData;
        })
        .catch(err => {
            console.log(err.message);
        })
}
const getData = (offset) => {
    return getLaunchData(offset).then(result => result);
}

// initial page load --> get data from zero offset
getData(`0`).then(data => buildUi(data));

// general pagination control logic
const paginateControl = (direction) => {
    if (direction === `previous`) currentOffset = (+currentOffset - 10).toString();
    if (direction === `next`) currentOffset = (+currentOffset + 10).toString();

    let launchContainerElement = document.getElementsByClassName("launch-container")[0];
    while (launchContainerElement.hasChildNodes()) {
        // need to remove all the existing divs before we build the new page of launches
        let elementToRemove = document.getElementsByClassName("launch-details")[0];
        launchContainerElement.removeChild(elementToRemove);
    }
    getData(currentOffset).then(data => buildUi(data));
}

// handle pagination for back
const getPreviousTen = document.getElementById(`previous-page`);
getPreviousTen.addEventListener('click', function() {
    if (currentOffset === `0`) {
        alert(`Already at page 1`);
        return;
    }
    paginateControl(`previous`);
})

// handle pagination for forward
const getNextTen = document.getElementById(`next-page`);
getNextTen.addEventListener('click', function() {
    if (currentPage === numOfPages) {
        alert(`Already at last page`);
        return;
    }
    paginateControl(`next`);
})

// build the UI
const buildUi = (data) => {
    currentPage = +currentOffset / 10 + 1;
    const totalLaunches = data.total;
    numOfPages = Math.ceil(totalLaunches / 10);
    const numOfPagesElement = document.getElementById(`page-control`);
    numOfPagesElement.innerHTML = `Page: ${currentPage} of ${numOfPages}`;
    currentOffset = data.offset;
    let divOfLaunches = document.getElementsByClassName(`launch-container`)[0];
    data.launches.map(launch => {
        divOfLaunches.appendChild(launchCard(launch));
    });
}

// each launch will be shown on its own UI element
const launchCard = (launch) => {
    let rocketWikiLink = launch.rocket.wikiURL;
    let launchDiv = document.createElement(`div`);
    launchDiv.setAttribute("class", "launch-details");

    let launchRocketNameDiv = document.createElement(`div`);
    launchRocketNameDiv.setAttribute("class", "rocket-name");

    let launchDateDiv = document.createElement(`div`);
    launchDateDiv.setAttribute("class", "launch-date");

    let agencyNameDiv = document.createElement(`div`);
    agencyNameDiv.setAttribute("class", "agency-name");

    let launchLocationDiv = document.createElement(`div`);
    launchLocationDiv.setAttribute("class", "launch-location");

    launchDiv.appendChild(launchRocketNameDiv);
    launchDiv.appendChild(agencyNameDiv);
    launchDiv.appendChild(launchLocationDiv);
    launchDiv.appendChild(launchDateDiv);

    let launchRocketNameDivContent = `&#128640; <a href=${rocketWikiLink}>${launch.rocket.name}</a>`;
    launchRocketNameDiv.innerHTML = launchRocketNameDivContent;

    // are agencies known
    if (launch.location.pads[0].agencies.length) {
        var agencyWikiUrl = `${launch.location.pads[0].agencies[0].wikiURL}`;
        var agencyNameDivContent = `<span class="small">agency responsible: </span><a href=${agencyWikiUrl}>${launch.location.pads[0].agencies[0].name}</a>`;
        
    } else {
        var agencyNameDivContent = `<span class="small">agency responsible: </span>unknown`;
    }

    let launchLocationDivContent = `<span class="small">launching from: </span>${launch.location.name}`;
    let launchDateDivContent = `<span class="small">launch scheduled for: </span>${launch.windowstart}`;
    launchDateDiv.innerHTML = launchDateDivContent;
    agencyNameDiv.innerHTML = agencyNameDivContent;
    launchLocationDiv.innerHTML = launchLocationDivContent;
    return launchDiv;
}