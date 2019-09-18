// Define our data from Google Spreadsheets /list/OUR-LINK/od6
const link = "https://spreadsheets.google.com/feeds/list/1qABL59AhMRLBAoIg8XRuN3Aax98QuyqUxZ1IIADjBLQ/od6/public/values?alt=json";
window.addEventListener("load", getData);

// Define modal elements

let modalWrap = document.querySelector(".data-modal-wrap")
let modalBackground = document.querySelector(".data-modal-bg");
let modal = document.querySelector(".data-modal");

modalBackground.addEventListener("click", () => {
    modalWrap.classList.add("hide");
})

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
    let timeRescued = new Date(doggoData.gsx$timestamp.$t);
    var diff_date = today - timeRescued;

    var num_years = diff_date / 31536000000;
    var num_months = (diff_date % 31536000000) / 2628000000;
    var num_days = ((diff_date % 31536000000) % 2628000000) / 86400000;

    // Defines templete and create a copy
    let template = document.querySelector("template").content;
    let myCopy = template.cloneNode(true);

    // Add sorting classes

    myCopy.querySelector(".data-article").classList.add(doggoData.gsx$sex.$t)

    // Inputs data to cards
    myCopy.querySelector(".data-name").textContent = doggoData.gsx$name.$t;
    myCopy.querySelector(".data-breed").textContent = doggoData.gsx$breed.$t;
    myCopy.querySelector(".data-category").textContent = Math.floor(num_years);
    if (Math.floor(num_years) == 0 && Math.floor(num_months) == 0 && Math.floor(num_days) == 0) {
        myCopy.querySelector(".data-time-in").textContent = "Came in today";
    } else if (Math.floor(num_years) == 0 && Math.floor(num_months) == 0) {
        myCopy.querySelector(".data-time-in").textContent = "Been here: " + Math.floor(num_days) + " Days";
    } else if (Math.floor(num_years) == 0) {
        myCopy.querySelector(".data-time-in").textContent = "Been here: " + Math.floor(num_months) + " Months " + Math.floor(num_days) + " Days";
    } else {
        myCopy.querySelector(".data-time-in").textContent = "Been here: " + Math.floor(num_years) + " Years " + Math.floor(num_months) + " Months " + Math.floor(num_days) + " Days";
    }


    if (!doggoData.gsx$img.$t || doggoData.gsx$img.$t == "undefined") {
        myCopy.querySelector(".data-img").setAttribute("src", "assets/imgs/no_img/adopt-me.png")
    } else {
        myCopy.querySelector(".data-img").setAttribute("src", imageName)
    }

    // Add Eventlistener to Cards on hover
    let card = myCopy.querySelector("article")
    let img = myCopy.querySelector(".data-img")
    card.addEventListener("mouseenter", () => {
        img.classList.add("hover");
        card.classList.add("hover-card");
    })
    card.addEventListener("mouseleave", () => {
        img.classList.remove("hover");
        card.classList.remove("hover-card")
    })

    // Open up modal on click
    card.addEventListener("click", () => {
        modalWrap.classList.remove("hide");
        modal.querySelector(".data-modal-name").textContent = doggoData.gsx$name.$t;
        modal.querySelector(".data-modal-breed").textContent = doggoData.gsx$breed.$t;
        modal.querySelector(".data-modal-sex").textContent = doggoData.gsx$sex.$t;
        modal.querySelector(".data-modal-birthday").textContent = doggoData.gsx$birthday.$t + "Puppy";
        if (!doggoData.gsx$childfriendly.$t) {
            modal.querySelector(".data-modal-child-friend").textContent = "No";
        } else {
            modal.querySelector(".data-modal-child-friend").textContent = "Yes";
        }
        if (!doggoData.gsx$otheranimals.$t) {
            modal.querySelector(".data-modal-other-animals").textContent = "No";
        } else {
            modal.querySelector(".data-modal-other-animals").textContent = "Yes";
        }

        if (Math.floor(num_years) == 0 && Math.floor(num_months) == 0 && Math.floor(num_days) == 0) {
            modal.querySelector(".data-modal-time-in").textContent = "Came in today";
        } else if (Math.floor(num_years) == 0 && Math.floor(num_months) == 0) {
            modal.querySelector(".data-modal-time-in").textContent = Math.floor(num_days) + " Days";
        } else if (Math.floor(num_years) == 0) {
            modal.querySelector(".data-modal-time-in").textContent = Math.floor(num_months) + " Months " + Math.floor(num_days) + " Days";
        } else {
            modal.querySelector(".data-modal-time-in").textContent = Math.floor(num_years) + " Years " + Math.floor(num_months) + " Months "
        }
        if (!doggoData.gsx$img.$t || doggoData.gsx$img.$t == "undefined") {
            modal.querySelector(".data-modal-img").setAttribute("src", "assets/imgs/no_img/adopt-me.png")
        } else {
            modal.querySelector(".data-modal-img").setAttribute("src", imageName)
        }
        modal.querySelector(".data-modal-long-description").textContent = doggoData.gsx$longdescription.$t;

    })


    // Appends cards to main
    document.querySelector(".cardwrap").appendChild(myCopy)

}
// JavaScript click for filter

function clickMe() {
    document.getElementById("filter").classList.toggle("show");
}

window.onclick = function (event) {
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

// JavaScript for sorting filter

let sortAge = document.querySelector(".age")
let sortGender = document.querySelector(".gender")
let resetSort = document.querySelector(".reset")

var genderCounter = 0
var ageCounter = 0

sortGender.addEventListener("click", () => {
    resetSort.classList.remove("hide");
    let sortMale = document.querySelectorAll(".male")
    if (genderCounter == 0) {
        sortMale.forEach(showMales);

        function showMales(showMale) {
            showMale.style.order = -1;
        }
        genderCounter++;
    } else {
        sortMale.forEach(showMales);

        function showMales(showMale) {
            showMale.style.order = 1;
            genderCounter = 0;
        }
    }
})

sortAge.addEventListener("click", () => {
    resetSort.classList.remove("hide");

    let allCards = document.querySelectorAll(".data-article");


    if (ageCounter == 0) {
        allCards.forEach(showAges)

        function showAges(showAge) {
            let age = showAge.querySelector(".data-category").textContent
            showAge.style.order = age
            ageCounter++
        }
    } else {
        allCards.forEach(showAges)

        function showAges(showAge) {
            let age = showAge.querySelector(".data-category").textContent
            showAge.style.order = -age
            ageCounter = 0
        }
    }

})

resetSort.addEventListener("click", () => {
    let resetSort = document.querySelectorAll(".data-article");

    resetSort.forEach(resets)

    function resets(reset) {
        let resetCard = reset.querySelectorAll(".data-article")
        reset.style.order = 0;
    }


})
