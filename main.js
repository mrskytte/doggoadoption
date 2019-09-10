const link = "https://spreadsheets.google.com/feeds/list/1qABL59AhMRLBAoIg8XRuN3Aax98QuyqUxZ1IIADjBLQ/od6/public/values?alt=json";
window.addEventListener("load", getData);

function getData() {
    fetch(link)
    .then(res => res.json())
    .then(showData);
}

function showData(data){
    const myArray = data.feed.entry;
    myArray.forEach(showDoggos);
}

function showDoggos(doggoData) {
     console.log(doggoData)


    const template = document.querySelector("template").content;
    const myCopy = template.cloneNode(true);


    myCopy.querySelector(".breed").textContent = doggoData.gsx$breed.$t;
    myCopy.querySelector(".name").textContent = doggoData.gsx$name.$t;
    myCopy.querySelector(".sex").textContent = doggoData.gsx$sex.$t;
    myCopy.querySelector(".shortD").textContent = doggoData.gsx$shortdescription.$t;
    myCopy.querySelector(".longD").textContent = doggoData.gsx$longdescription.$t;
    myCopy.querySelector(".childFriend").textContent = "Child Friendly: " + doggoData.gsx$childfriendly.$t;
    myCopy.querySelector(".category").textContent = doggoData.gsx$category.$t;

    document.querySelector("main").appendChild(myCopy)

}
