window.addEventListener('load', function() {
  const inputValue = localStorage.getItem('inputValue');
  if (inputValue) {
    document.getElementById('myInput').value = inputValue;
    loadingContainer.classList.toggle('visible');
    getValue(inputValue);
  }
});

const apiUrl = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:search';
const authToken = 'Bearer ya29.c.c0ASRK0GbRLM0t0kjHCJqe-9OfUfjQ6CQAqgmXnJyzcn4lvAY19VI2wxi49acCTnOejNGLAW1J_UCTsY6ha-JGCBD81Q9HXDvDq07vIzy5knIw_XWJnP-517YNoETijSzz5G7hFK_iXwvNltVzKfwgheo8oXHHNE7Hz6Wb0R2AVS9n2bvLHu5E_Imre1PT471d8KnZ3wLGJyMPpVri5muz0KEIZNNa8V5-fJkqgObMG3MiHK3RU39W3rhl7eVwi2iH2N9n30BTKNjBNLg0Xs20j2TI3thJzJnPc-cLEJXSapVswxan_Z8cO0aumVKjjaym9P0a6PGGZLfI93boPjEuDOEiJqKkw0L7XbtqY1IiX9Q8qWVqFwBW3_-T8YDusVsv4hWGRPM3qYigILiq4IopXqZonYVY70yvVBD2AbexaBpO-hU5kib9zPflYUC3qdchH3lwmmkYxGMPyysIruHJaRv0MtIr9tyBLJtJa1PDkV0gfL3LCXnMeWUAJJcHqmVc7tfKZJY6Ws1jhep-VCgBT6vWPbdaXkLGVHHmf8QBqi9ScjddzOTK52vKVgfE3HDPxuAcRXPoYGmkOpJ079ipvtUQC5aQLb1k-kYPFrRgs4b0_Jffn8oMUKOGgulRL645DYuemwWgq9_5aFikXSy6lIipns44Fg5XzpIbpY3bjgFkeldQjQ89YWZ7coIMmYkyfpBgpgJO0wSxgRcSS20ulq99zbxyWOXMbI-f_sIQ7XWySXipweUFI_jV9RQMzeagkUMvdF1FfX7lcBQqg9mOVgZrm52JQcqU7746M45BQbh1MVeF_n3Z779MxrX4FmslUQdu18U7QFs5U5OeVgfo5labf1p-QOn5wk-_3S1l6_hhbBnvsxYW_oSk9v2y8kbV7IpfbIbgR1Y1VdZgp973kRjbW25ZmuvXJvjXfb5ZiXxid9RmIFZxxvtlaW4ulXF8ngh33WzIXImsF4r2n3BU13dhi3xiJgJpkSJ_5Z5O4kS0c9hqiIBM7OZ';
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

// Add a click event listener to the button
loadingBtn.addEventListener('click', () => {
  loadingContainer.classList.toggle('visible');
});
  // 为按钮添加点击事件监听器
  // Remove the 'hidden' class from the loading indicator to make it visible
  // 移除加载指示器的 'hidden' 类以使其可见
//////////////////////////////////////////////////////////////////////////////////////

function getValue() {
  // Get the input element
  // 获取输入元素
  let input = document.getElementById("myInput");

  // Get the value of the input
  // 获取输入值
  let value = input.value;

  if (value.trim() !== "") {
    // Display the value after 5 seconds
    // 5 秒后显示输入值
    setTimeout(function() {
      aiSearch(value);
    }, 5000);
  } else {
    setTimeout(function() {
      errorInput();
    }, 5000);
  }
}

function errorInput(){
  console.log("There is no input");
  loadingContainer.classList.toggle('visible');
}

function aiSearch(query){
  //Make the AJAX request
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
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    let initalData = data;
    
    let queryId1 = data.sessionInfo.queryId
    let sessionName = data.sessionInfo.name
    // console.log(queryId1);
    // console.log(sessionName);
    apiCall2(query, queryId1, sessionName, initalData);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
    loadingContainer.classList.toggle('visible');
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
      $('.result-container').append(`
        <div class="AI-Search-Results">
        <a href="${data.results[i].document.derivedStructData.link}">
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
  
  // Make the AJAX request
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
      // Handle the response data
      loadingContainer.classList.toggle('visible');
      appendText(output);
      appendSearchResults(initialData);
  })
  .catch(error => {
      // Handle any errors
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

