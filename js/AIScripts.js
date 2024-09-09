let inputValue = localStorage.getItem('inputValue');
const myInput = document.getElementById('myInput');
let searchBtn = document.getElementById('toggleBtn');
const loadingContainer = document.querySelector('.loading-container');

if (inputValue && inputValue.trim() !== '') {
  window.addEventListener('load', function() {
    if (myInput) {
      myInput.value = inputValue;
      toggleLoading();
      getValue(inputValue);
    }
  });
}

function toggleLoading() {
  loadingContainer.classList.toggle('visible');
}

function getInputValue() {
  const inputValue = myInput.value.trim();
  if (inputValue !== '') {
    getValue(inputValue);
  } else {
    alert('Please enter some text in the input field.');
  }
}

searchBtn.addEventListener('click', () => {
  toggleLoading();
});

myInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    toggleLoading();
    getInputValue();
  }
});


//////////////////////////////////////////////////////////////////////////////////////
function clearAIDivs() {
  const elementsToClear = document.querySelectorAll('.output, .result-container');
  elementsToClear.forEach(element => {
    element.textContent = '';
  });
}

function getValue() {
  // Get the input element
  // 获取输入元素
  let input = document.getElementById("myInput");

  // Get the value of the input
  // 获取输入值
  let value = input.value;

  if (value.trim() !== "") {
    clearAIDivs();    
    aiSearch(value);
  } else {
    errorInput();
  }
}

function errorInput(){
  console.log("There is no input");
  toggleLoading();
}

function aiSearch(query) {
  // Make the fetch request
  // Define the query variable
  // Use the variable in the fetch request
  fetch(`https://0a4b-182-239-89-23.ngrok-free.app/v1/g_query?query=${encodeURIComponent(query)}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      toggleLoading();
      appendText(data.data.answer);
      appendSearchResults(data.data);
      
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function appendSearchResults(data) {
  // Check if the .AI-Search-Results element already exists
  if ($('.AI-Search-Results').length > 0) {
    // Update the existing .AI-Search-Results element
    $('.AI-Search-Results').each(function(index) {
      // Update the content of the existing .AI-Search-Results element
      $(this).find('#results-link').text(data.pages[index].link);
      $(this).find('#results-header').text(data.pages[index].title);
      $(this).find('#results-description').text(data.pages[index].snippet);
    });
  } else {
    // Create a new .AI-Search-Results element
    $('.result-container').append(`
      <div id="reference-header">Reference Documentation</div>
    `);

    for (let i = 0; i < 3; i++) {
      $('#reference-header').append(`
        <div class="AI-Search-Results">
        <a id="search-link" href="${data.pages[i].link}">
          <div id="results-link">${data.pages[i].link}</div>
          <div id="results-header">${data.pages[i].title}</div>
          <div id="results-description">${data.pages[i].snippet}</div>
          </div>
        </a>
      `);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////

function appendText(output) {
  var outputElement = document.querySelector('.output');
  var aiContainer = outputElement.querySelector('.AI-Container');

  if (!aiContainer) {
    aiContainer = document.createElement('div');
    aiContainer.classList.add('AI-Container');

    var aiHeader = document.createElement('div');
    aiHeader.id = 'ai-header';
    aiHeader.textContent = 'Generated Answer';

    var aiText = document.createElement('div');
    aiText.id = 'ai-text';
    aiContainer.appendChild(aiHeader);
    aiContainer.appendChild(aiText);

    outputElement.appendChild(aiContainer);
  } else {
    var aiText = aiContainer.querySelector('#ai-text');
  }

  typeText(aiText, output);
}

function typeText(element, text) {
  element.textContent = '';
  var words = text.split(' ');
  var index = 0;
  var interval = 50; // Adjust the typing speed (in milliseconds)

  function typeWord() {
    if (index < words.length) {
      element.textContent += words[index] + ' ';
      index++;
      setTimeout(typeWord, interval);
    } else {
    }
  }

  typeWord();
}





