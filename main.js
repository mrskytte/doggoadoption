// Define our data from Google Spreadsheets /list/OUR-LINK/od6
const link = "https://spreadsheets.google.com/feeds/list/1qABL59AhMRLBAoIg8XRuN3Aax98QuyqUxZ1IIADjBLQ/od6/public/values?alt=json";
window.addEventListener("load", getData);

// Fetch our Data

function getData() {
    fetch(link)
        .then(res => res.json())
        .then(showData);
}

function showData(data) {
    const myArray = data.feed.entry;
    myArray.forEach(showDoggos);
}


function showDoggos(doggoData) {
    console.log(doggoData)

// Using a local img folder with names from Spreadsheet
    let imageName = "assets/imgs/dogs/" + doggoData.gsx$img.$t + ".jpg";

// Calculate years, months and days in
    let today = new Date();
    let timeRescued = new Date(doggoData.gsx$timein.$t);
    var diff_date = today - timeRescued;

    var num_years = diff_date / 31536000000;
    var num_months = (diff_date % 31536000000) / 2628000000;
    var num_days = ((diff_date % 31536000000) % 2628000000) / 86400000;

// Defines templete and create a copy
    const template = document.querySelector("template").content;
    const myCopy = template.cloneNode(true);

// Inputs data to cards
    myCopy.querySelector(".data-name").textContent = doggoData.gsx$name.$t;
    myCopy.querySelector(".data-breed").textContent = doggoData.gsx$breed.$t;
    myCopy.querySelector(".data-category").textContent = doggoData.gsx$category.$t;
    myCopy.querySelector(".data-time-in").textContent = "Been here: " + Math.floor(num_years) + " Years " + Math.floor(num_months) + " Months " + Math.floor(num_days) + " Days";
    myCopy.querySelector(".data-img").setAttribute("src", imageName)



// Appends cards to main
    document.querySelector("main").appendChild(myCopy)

}
