let currentIndex = 0;
const itemsPerPage = 3;
const currentDate = new Date().toISOString().slice(0, 10);

let newDate = new Date();
let currentMonth = newDate.getMonth() + 1; // Months are zero-indexed, so we add 1
let currentDay = newDate.getDate();
let currentYear = newDate.getFullYear();


function getDaysDiff(newsDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((new Date(currentDate) - new Date(newsDate)) / oneDay));
  return diffDays;
}

$('#news').append(`
  <div class="box-container">  
      <div class="rounded-box">
        <div class="month-year">${currentMonth} 月 / ${currentDay} 日</div>
        <div class="year">${currentYear}</div>
    </div>
  </div>
`);


function loadNews() {
  fetch("../data.json")
    .then((res) => res.json())
    .then((data) => {
      for (let i = currentIndex; i < currentIndex + itemsPerPage; i++) {
        
        $('#news').append(`
          <div class="news-container">
            <div class="time">${getDaysDiff(data[i].date)} days ago</div>
            <div class="headline">${data[i].headline}</div>
            <div class="news">${data[i].subheadline}</div>
            <div id="news-link"><a href=${data[i].url} target="blank">Crypto News Link</a></div>
          </div>
        `);
      }
      currentIndex += itemsPerPage;
    })
    .catch((error) => {
      console.error('Error loading data:', error);
      $('#news').append('<p>Error loading data.</p>');
    });
}

document.addEventListener('DOMContentLoaded', loadNews());
// 监听 'DOMContentLoaded' 事件，当 DOM 完全加载后调用 getAPI 函数
// Attaches an event listener to the 'DOMContentLoaded' event, which calls the getAPI function when the DOM is fully loaded

$('#seeMoreBtn').click(function() {
  loadNews(currentIndex);
});



////////////////////////////////////////////////////////////////////////////////////


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

// console.log("Filtered Sentences:");
// console.log(filteredSentences);
///////////////////////////////////////////////////////////////////////////

