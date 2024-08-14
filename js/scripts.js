let APIendpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
// 定义 API 端点的 URL
// Defines the URL of the API endpoint to be used

let currentPage = 0;
// 初始化当前页面索引为 0
// Initializes the current page index to 0

const itemsPerPage = 3;
// 定义每页显示的新闻条数
// Defines the number of news items to be displayed per page

let jsonData = null;
// 初始化 jsonData 变量为 null
// Initializes the jsonData variable to null

document.addEventListener('DOMContentLoaded', getAPI);
// 监听 'DOMContentLoaded' 事件，当 DOM 完全加载后调用 getAPI 函数
// Attaches an event listener to the 'DOMContentLoaded' event, which calls the getAPI function when the DOM is fully loaded

document.getElementById('seeMoreBtn').addEventListener('click', loadMoreNews);
// 监听 ID 为 'seeMoreBtn' 的元素的 'click' 事件，当按钮被点击时调用 loadMoreNews 函数
// Attaches an event listener to the 'click' event of an element with the ID 'seeMoreBtn', which calls the loadMoreNews function when the button is clicked

function getAPI() {
  $.ajax({
    method: 'GET',
    url: APIendpoint,
    success: onSuccess,
    error: onError
  });
}
// 定义 getAPI 函数，使用 jQuery 的 AJAX 方法从 API 端点获取数据
// 'success' 和 'error' 回调函数分别定义为 onSuccess 和 onError 函数
// Defines the getAPI function, which uses jQuery's AJAX method to fetch data from the API endpoint
// The 'success' and 'error' callbacks are defined as onSuccess and onError functions respectively

function onSuccess(json) {
  jsonData = json;
  displayNews(json.features.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
  currentPage++;
}
// 定义 onSuccess 函数，在 AJAX 请求成功时调用
// 它将获取的 JSON 数据存储在 jsonData 变量中，调用 displayNews 函数显示前 3 条新闻，并递增 currentPage 索引
// Defines the onSuccess function, which is called when the AJAX request is successful
// It stores the fetched JSON data in the jsonData variable, calls the displayNews function to display the first 3 news items, and increments the currentPage index

function onError(xhr, status, errorThrown) {
  console.log(xhr, status, errorThrown);
}
// 定义 onError 函数，在 AJAX 请求出错时调用
// 它将错误信息记录到控制台
// Defines the onError function, which is called when the AJAX request encounters an error
// It logs the error information to the console

function displayNews(newsItems) {
  let currentTime = new Date();

  newsItems.forEach(item => {
    let quakeTime = new Date(item.properties.time);
    let timeElapsed = currentTime - quakeTime;

    timeElapsed = Math.round(10 * timeElapsed / 1000 / 60 / 60) / 10;

    let place = item.properties.place;
    let url = item.properties.url;
    let title = item.properties.title;

    $('#news').append(`
      <div class="container">
        <div class="news-container">
          <div class="time">${timeElapsed} 小時前</div>
          <div class="headline">${place}</div>
          <div class="news">${title}</div>
          <div id="news-link"><a href=${url} target="blank">Crypto News Link</a></div>
        </div>
      </div>
    `);
  });
}
// 定义 displayNews 函数，它接受一个新闻条目数组作为输入
// 它计算每个地震事件发生的时间间隔，然后将 HTML 元素附加到 '#news' 容器中以显示新闻条目
// Defines the displayNews function, which takes an array of news items as input
// It calculates the time elapsed since each earthquake, and then appends HTML elements to the '#news' container to display the news items

function loadMoreNews() {
  if (jsonData) {
    displayNews(jsonData.features.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    currentPage++;
  } else {
    getAPI();
  }
}
// 定义 loadMoreNews 函数，当点击 "查看更多" 按钮时调用
// 如果 jsonData 变量不为 null，它会调用 displayNews 函数显示下一 3 条新闻
// 如果 jsonData 变量为 null，它会调用 getAPI 函数从 API 获取新数据
// Defines the loadMoreNews function, which is called when the 'See More' button is clicked
// If the jsonData variable is not null, it calls the displayNews function to display the next 3 news items
// If the jsonData variable is null, it calls the getAPI function to fetch new data from the API
////////////////////////////////////////////////////////////////////////////////////

// AI Button
const loadingBtn = document.getElementById('toggleBtn');
// AI 按钮
// 获取 ID 为 'toggleBtn' 的元素

const loadingIndicator = document.getElementById('loadingIndicator');
// 获取 ID 为 'loadingIndicator' 的元素

// Add a click event listener to the button
loadingBtn.addEventListener('click', () => {
  // 为按钮添加点击事件监听器

  // Remove the 'hidden' class from the loading indicator to make it visible
  loadingIndicator.classList.remove('hidden');
  // 移除加载指示器的 'hidden' 类以使其可见
});
//////////////////////////////////////////////////////////////////////////////////////