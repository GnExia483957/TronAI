let newDate = new Date();
let currentMonth = newDate.getMonth() + 1; // Months are zero-indexed, so we add 1
let currentDay = newDate.getDate();
let currentYear = newDate.getFullYear();

$('#news').append(`
  <div class="box-container">  
      <div class="rounded-box">
        <div class="month-year">${currentMonth} 月 / ${currentDay} 日</div>
        <div class="year">${currentYear}</div>
    </div>
  </div>
`);

let currentIndex = 0;
const itemsPerPage = 3;
const currentDate = new Date();

function getTimeAgo(newsDate, newsTime) {
  const newsDateTime = new Date(`${newsDate}T${newsTime}`);
  const currentDateTime = new Date();
  const diffMs = currentDateTime - newsDateTime;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ${diffHours % 24 > 0 ? `and ${diffHours % 24} ${diffHours % 24 === 1 ? 'hour' : 'hours'} ago` : ''}`;
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffHours === 0 ? '1 hour' : '0 hours'} ago`;
  }
}

function loadNews() {
  fetch("../data.json")
    .then((res) => res.json())
    .then((data) => {
      const newsContainer = $('#news');
      newsContainer.empty(); // Clear the existing news items

      for (let i = currentIndex; i < currentIndex + itemsPerPage; i++) {
        newsContainer.append(`
          <div class="news-container">
            <div class="time">${getTimeAgo(data[i].date, data[i].time)}</div>
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

document.addEventListener('DOMContentLoaded', loadNews);

$('#seeMoreBtn').click(function() {
  loadNews();
});


function saveInput() {
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  localStorage.setItem('inputValue', inputValue);
  window.location.href = 'AI.html';
}
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

