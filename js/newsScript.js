let newDate = new Date();
let currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate);
let currentDayNumber = newDate.getDate();
let currentDay;

switch (currentDayNumber) {
  case 1:
  case 21:
  case 31:
    currentDay = `${currentDayNumber}st`;
    break;
  case 2:
  case 22:
    currentDay = `${currentDayNumber}nd`;
    break;
  case 3:
  case 23:
    currentDay = `${currentDayNumber}rd`;
    break;
  default:
    currentDay = `${currentDayNumber}th`;
    break;
}

let currentYear = newDate.getFullYear();

$('#Top-title').append(`
  <div class="box-container">  
      <div class="rounded-box">
        <div class="month-year">${currentMonthName} ${currentDay}</div>
        <div class="year">${currentYear}</div>
    </div>
  </div>
`);


let currentIndex = 0;
const itemsPerPage = 3;
const currentDate = new Date();

// function getTimeAgo(newsDate, newsTime) {
//   const newsDateTime = new Date(`${newsDate}T${newsTime}`);
//   const currentDateTime = new Date();
//   const diffMs = currentDateTime - newsDateTime;
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//   const diffDays = Math.floor(diffHours / 24);

//   if (diffDays > 0) {
//     return `${diffDays} ${diffDays === 1 ? 'day ago' : 'days'} ${diffHours % 24 > 0 ? `and ${diffHours % 24} ${diffHours % 24 === 1 ? 'hour' : 'hours'} ago` : ''}`;
//   } else if (diffHours > 0) {
//     return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
//   } else {
//     return `1 hour ago`;
//   }
// }

function loadNews() {
  fetch("../assets/JSON/data.json")
    .then((res) => res.json())
    .then((data) => {
      const newsContainer = $('#news');
      newsContainer.empty(); // Clear the existing news items

      if (currentIndex < data.length) {
        for (let i = currentIndex; i < Math.min(currentIndex + itemsPerPage, data.length); i++) {
          newsContainer.append(`
            <div class="news-container">
              <div id="news-link">
                <a href=https://coinmarketcap.com/ target="blank">
                  <div class="time">${data[i].time}</div>
                  <div class="headline">${data[i].headline}</div>
                  <div class="news">${data[i].subheadline}</div>
                </a></div>
            </div>

          `);
        }
        currentIndex += itemsPerPage;
      } else {
        newsContainer.append('<p>No more news to load.</p>');
      }
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