// Add your custom JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
  });

  fetch("data/data.json")
  .then(response => response.json())
  .then(data => showInfo(data));
  
  function showInfo(data) {
  console.table(data.countries);
  }