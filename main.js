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

    document.querySelector("main").appendChild(myCopy)

}
