// Add your custom JavaScript code here
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
  });

////////////////////////////////////////////////////////////////////////////////////
//Tron News Populate
let APIendpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

document.addEventListener('DOMContentLoaded', getAPI)

function getAPI() {
    $.ajax({
      method:'GET',
      url:APIendpoint,
      success: onSuccess,
      error: onError,
    });
  };

  function onSuccess(json){
    let currentTime = new Date();
  
    for(i = 0; i < 3; i++){
      let quakeTime = new Date (json.features[i].properties.time);
      
      let timeElapsed = currentTime - quakeTime;
      timeElapsed = Math.round(10*timeElapsed/1000/60/60)/10;

      let place = json.features[i].properties.place;
      
      let url = json.features[i].properties.url;
      
      let title = json.features[i].properties.title;

      $('#news').append(
        `
        <div class="container">
          <div class="news-container">
            <div class="time">${timeElapsed} 小時前</div>
            <div class="headline">${place}</div>
            <div class="news">${title}</div>
            <div id="news-link"><a href=${url} target="blank">TheNewsCrypto</a></div>
          </div>
        </div>
        `);
    }
  }

  function onError (xhr, status, errorThrown){
    console.log(xhr, status, errorThrown)
  }
////////////////////////////////////////////////////////////////////////////////////
//See More Button
  let buttonArray = ['apple', 'banana', 'cherry', 'date', 'elderberry']
  
  const element = document.getElementById("seeMoreBtn");
  element.addEventListener("click", myFunction);

  function myFunction() {
    console.log(buttonArray[Math.floor(Math.random() * buttonArray.length)]);
  }
////////////////////////////////////////////////////////////////////////////////////

//AI Button
  const x = document.getElementById("toggleBtn");
  x.addEventListener("click", toggleAnimation);

  function toggleAnimation() {
    let x = document.getElementById("animation-container");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////