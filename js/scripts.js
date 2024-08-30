const inputField = document.getElementById('input-field');
let toggleBtn = document.getElementById('toggleBtn');


inputField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    saveInput();
  }
});

function saveInput() {
  const inputValue = inputField.value.trim();
  if (inputValue === '') {
    alert('Please enter some text in the input field.');
  } else {
    console.log('Input value:', inputValue);
    localStorage.setItem('inputValue', inputValue);
    window.location.href = 'AI.html';
  }
}

//clears the local storage if AI link is pressed
document.getElementById('AILink').addEventListener('click', function(event) {
  event.preventDefault();
  localStorage.removeItem('inputValue');
  window.location.href = 'AI.html';
});

////////////////////////////////////////////////////////////////////////////////////


//test algorithm that filters out sentences without certain words

// const sentences = [
//   "The Tron Foundation is a blockchain company.",
//   "USDT is a popular stablecoin.",
//   "Justin Sun is the CEO of Tron.",
//   "Ethereum is a popular blockchain platform.",
//   "I invested in USDT last year.",
//   "The Tron network has fast transaction speeds.",
//   "Justin Sun is a influential figure in the cryptocurrency space.",
//   "Bitcoin is the most well-known cryptocurrency.",
//   "USDT is used for trading on many exchanges.",
//   "The Tron project has been expanding recently."
// ];

// const filteredSentences = sentences.filter(sentence =>
//   sentence.includes("Tron") || sentence.includes("USDT") || sentence.includes("Justin")
// );

// const filteredOutSentences = sentences.filter(sentence =>
//  "!"sentence.includes("Tron") && !sentence.includes("USDT") && !sentence.includes("Justin")
// );

// console.log("Filtered Sentences:");
// console.log(filteredSentences);


{/* <div class="news-container">
  <div class="time">${getTimeAgo(data[i].date, data[i].time)}</div>
  <div class="headline">${data[i].headline}</div>
  <div class="news">${data[i].subheadline}</div>
  <div id="news-link"><a href=https://coinmarketcap.com/ target="blank">Crypto News Link</a></div>
</div> */}


///////////////////////////////////////////////////////////////////////////

