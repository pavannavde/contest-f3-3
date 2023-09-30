const bodyTag= document.getElementById("body")
const inputDate=document.getElementById('search-input')
const formbtn=document.getElementById('search-form')
const searchHistory = document.querySelector('#search-history')
let ArrayOfDate;
let prevdate;

async function getPicture(Date) {
    try{
        let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=CQQBwYgos7657bUSxyAwtd88h9DgHdKG6ysCZ6wV&date=${Date}`);
        let data = await response.json();
        rendertoUI(data);
    }
    catch(error){
        alert(` An error Occured : ${error.message}`)
    }
}
 function getcurrentPictureOfDay(){
    const currentDate = new Date().toISOString().split("T")[0];
    getPicture(currentDate);
 };
getcurrentPictureOfDay();

formbtn.addEventListener('submit',(event)=>{
    event.preventDefault();
    getPictureofDay();
    renderhistory(prevdate);
});

function getPictureofDay(){
  let UserDate = inputDate.value;
  saveSearch(UserDate);
  getPicture(UserDate);
  prevdate=UserDate;

}
function rendertoUI(Data) {
    bodyTag.innerHTML='';
  let imageContainer = document.createElement("div");
  imageContainer.className = "current-image-container";
  imageContainer.innerHTML = `
         <h1>Image of the day ${Data.date}</h1>
         <img src="${Data.url}" alt="image">
         <h3>${Data.title}</h3>
         <p>${Data.explanation}</p>`;

   bodyTag.append(imageContainer);
}
 function renderhistory(date){
    if(date){
        const history =document.createElement("li")
        history.innerHTML=`${date}`
        searchHistory.append(history);
        history.addEventListener("click",()=>{
            getPicture(history.innerText)
        })
    }
       
 }
function saveSearch(date){
    if(localStorage.getItem('ArrayOfDate')){
        let tempArray = JSON.parse(localStorage.getItem('ArrayOfDate'))
        tempArray.push(date);
        localStorage.setItem('ArrayOfDate',JSON.stringify(tempArray))
    }
    else{
        let tempArray=[date]
        localStorage.setItem('ArrayOfDate',JSON.stringify(tempArray))
    }

}

// copyright: "Antonio Tartarini";
// date: "2023-09-30";
// explanation: "For northern hemisphere dwellers, September's Full Moon was the Harvest Moon. Reflecting warm hues at sunset, it rises behind cypress trees huddled on a hill top in Tuscany, Italy in this telephoto view from September 28.  Famed in festival, story, and song, Harvest Moon is just the traditional name of the full moon nearest the autumnal equinox.  According to lore the name is a fitting one. Despite the diminishing daylight hours as the growing season drew to a close, farmers could harvest crops by the light of a full moon shining on from dusk to dawn. This Harvest Moon was also known to some as a supermoon, a term becoming a traditional name for a full moon near perigee. It was the fourth and final supermoon for 2023.   Note: Non-NASA APOD mirror sites will be updated if the US goverment shuts down.";
// hdurl: "https://apod.nasa.gov/apod/image/2309/HarvestMoonNest.jpg";
// media_type: "image";
// service_version: "v1";
// title: "A Harvest Moon over Tuscany";
// url: "https://apod.nasa.gov/apod/image/2309/HarvestMoonNest.jpg";
