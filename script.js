const apiKey = "529bec4e82a2441f96421368b9c1e3de";

function fetchNews(searchTerm) {
  const query = searchTerm ? searchTerm : "tesla";
  const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;

  axios.get(url)
    .then(res => {
      console.log('Response:', res.data);
      renderArticles(res.data.articles);
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });
}

function renderArticles(articles) {
  const container = document.getElementById('data');
  container.innerHTML = ''; // Clear previous content

  articles.forEach(article => {
    const column = document.createElement('div');
    column.classList.add('col-md-4', 'mb-4');

    const articleContent = `
      <div class="card">
        <img src="${article.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description}</p>
          <p class="card-text"><small class="text-muted">${article.publishedAt}</small></p>
          <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
        </div>
      </div>
    `;

    column.innerHTML = articleContent;
    container.appendChild(column);
  });
}

// Initial fetch with default search term "tesla"
fetchNews();

document.getElementById('searchInput').addEventListener('input', function(event) {
  const searchTerm = event.target.value.trim();
  fetchNews(searchTerm);
});
