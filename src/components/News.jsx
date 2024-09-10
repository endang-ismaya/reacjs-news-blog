import Calendar from "./Calendar";
import Weather from "./Weather";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "science",
  "sports",
  "health",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=3b930d8ace8e23722dc91af7f2fd8a52`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=3b930d8ace8e23722dc91af7f2fd8a52`;
      }

      const response = await axios.get(url);
      const fetchNews = response.data.articles;

      // if there is no image
      // use the no-img.png
      fetchNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchNews[0]);
      setNews(fetchNews.slice(1, 7));
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();

    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    console.log("form submitted");
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User Image" />
            <p>Mary&apos;s Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}

              <a href="#" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          {news && (
            <div className="news-grid">
              {news.map((article, index) => (
                <div key={index} className="news-grid-item">
                  <img src={article.image || noImg} alt={article.title} />
                  <h3>
                    {article.title}
                    <i className="fa-regular fa-bookmark bookmark"></i>
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="my-blogs">My Blog</div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};
export default News;
