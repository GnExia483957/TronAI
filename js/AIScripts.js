const apiUrl = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:search';
const authToken = 'Bearer ya29.c.c0ASRK0GY1S1MY4zd2-e_z3FDX_5IB41VB5vxfsyfXjv8GA9ZJNi_zAdVwiYkmjQ78nKXY-qjUGgesOJPvcnso2u1YRcCGuTopPtEtvKsM-evRleccREuCEUkdu1AlcxVBAUJY_NHCqbF_d8B3RWkitJv8yIvOjJ74ZufmagWLWeBBeQa9OCZYeUAK_Leo5xi_OU3pL949c66luIdRCix2HPrenZTfZj-8QNljl4urY3ubDwkTZuU8qdQ8UVv11i17a-l91ainrFDcM25PErBviIGt1fMgP7CKcZ6_WxlYv5yI8Xh7oyChCytu1_8hIcH5phPJLxWpCkha4EtamQyntvBP6qXKxgFuSU4zdY0sjFHMPa41sfSF2znWfStGgHhk8psqVDwqVDneZjK8-kDnR52XxpwzmtuDywpxtpOyTJ-8kGfBapLiRqWYkQqcWCvkUrQKIj1JlnPMzYIbeBs8a5uidl9JrjeK0_aTSMqFfYkvOLhSvb_mj4GhWp-kZDq4e9XLeqRAgrsMnywhm0IXOfwO2ipIkCqQKubzv_-hxFZlbFqxLH4okpCEHJlhpQzDt8TV5FKWPGTTM_NkGAr2vOuwFqi5WDQle2ipVBSAuEKCKPfSEBhqa2zlnDbI4J4H648KBapQtrV9Syf1rkOXbUbv2p0OIQ6c5s6_rW8b3tJ3uoXSnubZMw_uc38qJp0fVpg6WgQp8VVhJk8l04tUuB-9-ZY_9W5bnhm-kRxs2drmhcz91czp7QWxb7VYwX4jq96VSStZjFv_Uvjvbres4h68ObimXf3o2_urxO__q9h9bdq9nXi_IFQ9vhJgjI5ym_Ulp9XwSkWvudpvqhWnf-kxnuhc5Wc7op0R209XStwrhomduYBOvOk0VVJjg30_gp0rWfZfoF5woXJOt1miOBsnJogr8t0w1jByZ5hUfrXB6fxJ_t5J2vVtYvda25IBdf1jFhw1lBzxSRsZ2izU2Oaw1cMIZtpXq-u-7QFe5czXI5pvy-yUsiQ';
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
    for(i = 0; i < pageSize; i++){
      $('.result-container').append(`
        <div class="AI-Search-Results">
          <div id="results-link">${data.results[i].document.derivedStructData.link}/</div>
          <div id="results-header">${data.results[i].document.derivedStructData.title}</div>
          <div id="results-description">${data.results[i].document.derivedStructData.extractive_answers[0].content}</div> 
        </div>
      `);
    }

    let queryId1 = data.sessionInfo.queryId
    let sessionName = data.sessionInfo.name
    // console.log(queryId1);
    // console.log(sessionName);
    apiCall2(query, queryId1, sessionName);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
    loadingContainer.classList.toggle('visible');
  });
}

////////////////////////////////////////////////////////////////////////////////////

  // Set the request parameters
  function apiCall2(query, queryId1, sessionName){

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
      appendText(output);
  })
  .catch(error => {
      // Handle any errors
      console.error(error);
  });
}

function appendText(output){
  $('.output').append(`
    <div class="AI-Container">
      <div id="ai-header">Generative AI</div>
      <div id="ai-text">${output}</div>
    </div>
  `);
  loadingContainer.classList.toggle('visible');
}