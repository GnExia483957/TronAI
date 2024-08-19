// Set the request parameters
const apiUrl = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:search';
const authToken = 'Bearer ya29.c.c0ASRK0GbL-krZ_TSKH2qPKjmIKbtSa3Rnd9EytJmCHblZ75ZX42vyfjfoqDxTcP0yjafHQaCKaHAXYTWlEO162QCRmoLhHOp_sHgiPGglvK5Yg8vQ62EJc3rPvCUtcB34i2ac8Qr25R8LF9bSMvPp4Y50jGfNf90_dpLxFR9VTkA0fAj_s7PTmo65sT4qqRCDfc1sw3VexlUiy7_5ciyY449dwIO5Ms3ZCRWJtykB66l4UtSKWMriD_S1zrITHyyWNLjMHSz7R96JbxRMj8o7Qhz4lWHE7xm-WjQAr0nnggnMQWCck-FXdMJF0FG23DkAe7XW53OZPZ0tWFsIftRbtzR5ZjwEP9NpASeIUx-GYUiZ2sT7wkk4YN_UNO91Kwaz8zkbegYU5-QTEMKky3tWgZXnftZ39oCiAbAlcfwVI82kZvMF8enZYrIuS1zfS_IxQQKipOXSL4rh0uOTKxgWq0mtUitV3ucG-eNTKShTKmBPSFPmTZgb-mTIcV_Izjek12-zeyD_5_jfyWk5ACHSS4tmPdTOpaHtCW_zeVGgofh1ftN6_RLFg3Gu99_B_1MlXLBX9ETrhlMgg2cQbh1FzNFc7sjqjWaXPrZT6tzyUG_RX8zeioEFV3g76NDa4QT647KsbZufJcbqtXrgR9RbtQX-MSXq_fqxxtBe47mxmfm2gmZx_3Orj7ZhMeRI023qyBYs0rfva868lnZFSXeVl5RlV894gevJvSYiBlw6rhoBtQ2dtWempoao4nZ2tw_pVqbh5J1B0uy349Zi88psfknI8rJRZhrJVzIaikhs6z7_Sw5SvmSw_oSclJWdnfZYx4_u3fM5Ifl3necv-3ZzJyeUXBWxdukM6eVhbXxfqJWVOpoIncfOcgfqVeXvW2pXdBF6nhg_qU6vY5g1dWzM1Fv5I6yeadw5esQjMhmwqUnj22vvpM33uxg3X46rdib40UUWnIzfzVrvOst3cpigpkpo7g5SlWg-5gX4sQ4tM7iYv5jxu5VaYds';
let query = 'what is tron';
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
  var input = document.getElementById("myInput");

  // Get the value of the input
  // 获取输入值
  var value = input.value;

  if (value.trim() !== "") {
    // Display the value after 5 seconds
    // 5 秒后显示输入值
    setTimeout(function() {
      displayInput(value);
    }, 5000);
  } else {
    setTimeout(function() {
      errorInput();
    }, 5000);
  }
}

function displayInput(value) {
  // Append the input value to the output element
  // 将输入值添加到输出元素中
  $('.output').append(`<div>${value}</div>`);
  
  // Toggle the visibility of the loading container
  // 切换加载容器的可见性
  loadingContainer.classList.toggle('visible');
}

function errorInput(){
  console.log("There is no input");
  loadingContainer.classList.toggle('visible');
}


// Make the AJAX request
// function apiCall1(query){
// fetch(apiUrl, {
//   method: 'POST',
//   headers: {
//     'Authorization': authToken,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     query: query,
//     pageSize: pageSize,
//     session: session,
//     spellCorrectionSpec: spellCorrectionSpec
//   })
// })
// .then(response => response.json())
// .then(data => {
//   // Handle the response data
//   console.log(data);
//   console.log("data success");
// })
// .catch(error => {
//   // Handle any errors
//   console.error(error);
// });
// }

////////////////////////////////////////////////////////////////////////////////////


// Set the request parameters
const apiUrl2 = 'https://discoveryengine.googleapis.com/v1alpha/projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/servingConfigs/default_search:answer';
const query2 = {
  text: query,
  queryId: 'projects/1008121697399/locations/global/questions/952123081585650680'
};
const session2 = 'projects/1008121697399/locations/global/collections/default_collection/engines/tron-q-a_1723642895525/sessions/952123081585650929';
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
function aiSearch(query2){

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
    // Handle the response data
    appendChat(data);
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

}

function appendChat(data){
  $('.output').append(`
    <div class="AI-Container>
      <div id="ai-text">${data.answer.answerText}</div>
    </div>
  `);
}