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



///////////////////////////////////////////////////////////////////////////
//test algorithm that filters out sentences without certain words

const sentences = [
  "The Tron Foundation is a blockchain company.",
  "USDT is a popular stablecoin.",
  "Justin Sun is the CEO of Tron.",
  "Ethereum is a popular blockchain platform.",
  "I invested in USDT last year.",
  "The Tron network has fast transaction speeds.",
  "Justin Sun is a influential figure in the cryptocurrency space.",
  "Bitcoin is the most well-known cryptocurrency.",
  "USDT is used for trading on many exchanges.",
  "The Tron project has been expanding recently."
];

const filteredSentences = sentences.filter(sentence =>
  sentence.includes("Tron") || sentence.includes("USDT") || sentence.includes("Justin")
);

const filteredOutSentences = sentences.filter(sentence =>
  !sentence.includes("Tron") && !sentence.includes("USDT") && !sentence.includes("Justin")
);

console.log("Filtered Sentences:");
console.log(filteredSentences);
///////////////////////////////////////////////////////////////////////////