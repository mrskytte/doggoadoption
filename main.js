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
    let template = document.querySelector("template").content;
    let myCopy = template.cloneNode(true);

    // Inputs data to cards
    myCopy.querySelector(".data-name").textContent = doggoData.gsx$name.$t;
    myCopy.querySelector(".data-breed").textContent = doggoData.gsx$breed.$t;
    myCopy.querySelector(".data-category").textContent = doggoData.gsx$category.$t;
    if (Math.floor(num_years) == 0 && Math.floor(num_months) == 0 && Math.floor(num_days) == 0) {
        myCopy.querySelector(".data-time-in").textContent = "Came in today";
    } else if (Math.floor(num_years) == 0 && Math.floor(num_months) == 0) {
        myCopy.querySelector(".data-time-in").textContent = "Been here: " + Math.floor(num_days) + " Days";
    } else if (Math.floor(num_years) == 0) {
        myCopy.querySelector(".data-time-in").textContent = "Been here: " + " Years " + Math.floor(num_months) + " Months " + Math.floor(num_days) + " Days";
    } else {
        myCopy.querySelector(".data-time-in").textContent = "Been here: " + Math.floor(num_years) + " Years " + Math.floor(num_months) + " Months " + Math.floor(num_days) + " Days";
    }


    if (!doggoData.gsx$img.$t) {
        myCopy.querySelector(".data-img").setAttribute("src", "assets/imgs/no_img/adopt-me.png")
    } else {
        myCopy.querySelector(".data-img").setAttribute("src", imageName)
    }

    // Add Eventlistener to Cards on hover
    let card = myCopy.querySelector("article")
    let img = myCopy.querySelector(".data-img")
    card.addEventListener("mouseenter", () => {
        img.classList.add("hover");
    })
    card.addEventListener("mouseleave", () => {
        img.classList.remove("hover");
    })


    // Appends cards to main
    document.querySelector("main").appendChild(myCopy)

}
// JavaScript click for filter

function clickMe() {
  document.getElementById("filter").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown_content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
