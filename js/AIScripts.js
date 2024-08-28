let inputValue = localStorage.getItem('inputValue');
const myInput = document.getElementById('myInput');
let searchBtn = document.getElementById('toggleBtn');

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
  console.log("this button is being clicked");
  toggleLoading();
});

myInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    toggleLoading();
    getInputValue();
  }
});
const apiUrl = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:search';
const authToken = 'Bearer ya29.a0AcM612zxzl7oDcf4ImMbyhDRYRHYhlzG-njEXS13JNfSeDQtVGDYQtgMXGTnsWTSP0v4wAGxm4qnXZvn7ne_LmZHdxa8qGiyyM4lE27GDM55LY_pNIu6wdhrVCYjzDN2qtYObDAcE4-tF7eyfwIH3ebJawKKtohgONvAR0ci_BPevQaCgYKAZcSARASFQHGX2MiHLwd2dK0_WUpbMHh1Vq8Gw0181';
const pageSize = 3;
const session = 'projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/sessions/-';
const spellCorrectionSpec = { mode: 'AUTO' };


// AI Button
const loadingBtn = document.getElementById('toggleBtn');
// AI 按钮
// 获取 ID 为 'toggleBtn' 的元素

const loadingContainer = document.querySelector('.loading-container');
const toggleButton = document.getElementById('toggleButton');

const loadingIndicator = document.getElementById('loadingIndicator');
// 获取 ID 为 'loadingIndicator' 的元素

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
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      pageSize: pageSize,
      session: session,
      spellCorrectionSpec: spellCorrectionSpec
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle the response data
    let initialData = data;
    let queryId1 = data.sessionInfo.queryId;
    let sessionName = data.sessionInfo.name;
    apiCall2(query, queryId1, sessionName, initialData);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
}

function appendSearchResults(data) {
  // Check if the .AI-Search-Results element already exists
  if ($('.AI-Search-Results').length > 0) {
    // Update the existing .AI-Search-Results element
    $('.AI-Search-Results').each(function(index) {
      // Update the content of the existing .AI-Search-Results element
      $(this).find('#results-link').text(data.results[index].document.derivedStructData.link);
      $(this).find('#results-header').text(data.results[index].document.derivedStructData.title);
      $(this).find('#results-description').text(data.results[index].document.derivedStructData.snippets[0].snippet);
    });
  } else {
    // Create a new .AI-Search-Results element
    $('.result-container').append(`
      <div id="reference-header">Reference Documentation</div>
    `);

    for (let i = 0; i < pageSize; i++) {
      $('#reference-header').append(`
        <div class="AI-Search-Results">
        <a id="search-link" href="${data.results[i].document.derivedStructData.link}">
          <div id="results-link">${data.results[i].document.derivedStructData.link}</div>
          <div id="results-header">${data.results[i].document.derivedStructData.title}</div>
          <div id="results-description">${data.results[i].document.derivedStructData.snippets[0].snippet}</div>
          </div>
        </a>
      `);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////

// Set the request parameters
  function apiCall2(query, queryId1, sessionName, initialData){

  const apiUrl2 = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:answer';
  const query2 = {
      text: query,
      queryId: queryId1
  };
  const session2 = sessionName;
  const relatedQuestionsSpec = {
      enable: true
  };
  const answerGenerationSpec = {
      ignoreAdversarialQuery: true,
      ignoreNonAnswerSeekingQuery: true,
      ignoreLowRelevantContent: true,
      includeCitations: true
  };
  
  // Make the fetch request 2
  fetch(apiUrl2, {
      method: 'POST',
      headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          query: query2,
          session: session2,
          relatedQuestionsSpec: relatedQuestionsSpec,
          answerGenerationSpec: answerGenerationSpec
      })
  })
  .then(response => response.json())
  .then(data => {
    let output = data.answer.answerText;
      appendText(output);
      appendSearchResults(initialData);
      toggleLoading();
    })
  .catch(error => {
      // Handle any errors
      toggleLoading();
      console.error(error);
  });
}

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

