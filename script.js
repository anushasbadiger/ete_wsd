let newsData = [];
let currentPage = 1;
const itemsPerPage = 3; 

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    setupSorting();
    setupFiltering();
});



function fetchNews() {
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            newsData = data; 
            displayNews(newsData); 
            setupPagination(newsData);
        })
        .catch(error => console.log('Error fetching news:', error));
}
//  display the news
function displayNews(news) {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const paginatedNews = news.slice(start, end); 

    paginatedNews.forEach(article => {
        const newsCard = `
            <div class="news-item">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <img src="${article.urlToImage}" alt="${article.title}">
                <p>By ${article.author} on ${new Date(article.publishedAt).toLocaleDateString()}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}
//  sorting
function setupSorting() {
    const sortDropdown = document.getElementById('sortOptions');
    sortDropdown.addEventListener('change', function () {
        const sortBy = this.value;
        if (sortBy === 'title') {
            newsData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'author') {
            newsData.sort((a, b) => a.author.localeCompare(b.author));
        } else if (sortBy === 'publishedAt') {
            newsData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        }
        currentPage = 1; 
        displayNews(newsData);
        setupPagination(newsData);
    });
}
// filtering
function setupFiltering() {
    const filterInput = document.getElementById('filterInput');
    filterInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredNews = newsData.filter(article => 
            article.title.toLowerCase().includes(query) || 
            article.author.toLowerCase().includes(query)
        );
        currentPage = 1; 
        displayNews(filteredNews);
        setupPagination(filteredNews);
    });
}
// setting up pagination
function setupPagination(news) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(news.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayNews(news);
        });
        paginationContainer.appendChild(pageButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission until validation passes
        validateForm();
    });
});

// checking if all the details are filled correctly 
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessages = document.getElementById('errorMessages');
    
    let valid = true;
    let messages = [];

    if (name.trim() === '' || name.length < 3) {
        valid = false;
        messages.push("Name must be at least 3 characters long.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        valid = false;
        messages.push("Please enter a valid email address.");
    }

    if (password.length < 6) {
        valid = false;
        messages.push("Password must be at least 6 characters long.");
    }

    if (!valid) {
        errorMessages.innerHTML = messages.join('<br>'); 
        errorMessages.style.color = 'red';
    } else {
        errorMessages.innerHTML = ''; 
        alert("Form submitted successfully!");
        form.reset(); 
    }
}



