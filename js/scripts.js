// Add your custom JavaScript code here
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
  });


//Tron News Populate
  var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

  $(document).ready(function() {
    $.ajax({
      method:'GET',
      url:weekly_quakes_endpoint,
      success: onSuccess,
      error: onError,
    });
  });


  function onSuccess(json){
    console.log(json);
    var currentTime = new Date();
    var coordinates = [];
  
    for(i = 0; i < 3; i++){
  
      var quakeTime = new Date (json.features[i].properties.time);
      var timeElapsed = currentTime - quakeTime;
  
      timeElapsed = Math.round(10*timeElapsed/1000/60/60)/10;
      $('#info').append(`<p>M: ${json.features[i].properties.mag} - ${json.features[i].properties.place} / ${timeElapsed} 小時前</p>`);
      coordinates.push([json.features[i].geometry.coordinates[0], json.features[i].geometry.coordinates[1]]);
    }
  }

  function onError (xhr, status, errorThrown){
    console.log(xhr, status, errorThrown)
  }

//See More Button
  var buttonArray = ['apple', 'banana', 'cherry', 'date', 'elderberry']
  
  const element = document.getElementById("myBtn");
  element.addEventListener("click", myFunction);

  function myFunction() {
    console.log(buttonArray[Math.floor(Math.random() * buttonArray.length)]);
    // document.getElementById("demo").innerHTML = "Hello World";
  }