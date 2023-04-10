// Variables
let newsData = [];
const newsDiv = document.querySelector(".news");
const links = document.querySelectorAll("header ul li button");
let countryCode;
let category;

const getNews = (countryCode, category) => {
  newsData = [];
  if (!category) category = "business";
  fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=0fb7dc41d309403bacd4bfcf8c8b854d`
  )
    .then((response) => response.json())
    .then((data) => {
      data.articles.forEach((element) => newsData.push(element));
    })
    .then(() => {
      newsData.forEach((ele) => {
        newsDiv.innerHTML += `<div>
        <h4>${ele.title}</h4>
        <div><img src="${ele.urlToImage}" /></div>
        <p>${ele.description}</p>
      </div>`;
      });
    });
};

links.forEach((link) =>
  link.addEventListener("click", (e) => {
    newsDiv.innerHTML = "";
    if (e.target.hasAttribute("country-code")) {
      countryCode = e.target.getAttribute("country-code");
    } else if (e.target.hasAttribute("category")) {
      category = e.target.getAttribute("category");
    }
    getNews(countryCode, category);
  })
);

getNews("us", "health");
