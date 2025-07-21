import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DUMMY_ARTICLES } from "../../data/blogData";

import Loading from "../../UI/loading";
import Articles from "./mainContent/articles";
import Filter from "./mainContent/filter";
import AboutBlog from "./sideContent/about-blog";
import Categories from "./sideContent/categories";
import NewsLetter from "./sideContent/news-letter";
import PopularPost from "./sideContent/popular-post";
import Tags from "./sideContent/tags";

import PropTypes from "prop-types";

const Blog = ({ dark }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [sortBy, setSortBy] = useState(null);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSortChange = () => {
    let newSortBy;

    if (sortBy === 'asc') {
      newSortBy = 'desc';
    } else if (sortBy === 'desc') {
      newSortBy = null;
    } else {
      newSortBy = 'asc';
    };

    const sortedArticles = [...articles];

    if (newSortBy === 'asc') {
      sortedArticles.sort((a, b) => new Date(a.published) - new Date(b.published));
    } else if (newSortBy === 'desc') {
      sortedArticles.sort((a, b) => new Date(b.published) - new Date(a.published));
    };

    setSortBy(newSortBy);
    setArticles(sortedArticles);

    // Apply sort to the currently filtered articles
    const currentArticles = hasSearched ? [...filteredArticles] : [...sortedArticles];
    setFilteredArticles(currentArticles);
  };

  const performSearch = () => {
    setHasSearched(true);
    setIsLoading(true);
    console.log("Performing search for:", searchQuery);

    if (!searchQuery.trim()) {
      console.log("Empty search, showing all articles");
      setFilteredArticles(articles);
      setSearchParams({});
      setIsLoading(false);
      return;
    }

    // Update URL with search query
    setSearchParams({ search: searchQuery });

    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      console.log("Searching for:", query, "in", articles.length, "articles");

      const results = articles.filter(article => {
        const title = article.title.toLowerCase();
        const description = article.description.toLowerCase();
        const category = article.category.toLowerCase();

        return (
          title.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        )
      });

      console.log("Found", results.length, "matching articles");
      setFilteredArticles(results);
      setIsLoading(false);
    }, 500);
  };

  const filteredByCategory = (category) => {
    setSearchQuery(category);
    setHasSearched(true);
    setIsLoading(true);
    console.log("Filtering by category:", category);

    // Update URL with category as search query
    setSearchParams({ search: category });

    setTimeout(() => {
      const results = articles.filter(article =>
        article.category.toLowerCase() === category.toLowerCase()
      );

      console.log("Found", results.length, "articles in category", category);
      setFilteredArticles(results);
      setIsLoading(false);
    }, 500)
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = DUMMY_ARTICLES;

        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const queryFromUrl = searchParams.get('search');

    if (queryFromUrl && articles.length > 0) {
      console.log("Found URL search param:", queryFromUrl);
      setSearchQuery(queryFromUrl);
      setHasSearched(true);

      const query = queryFromUrl.toLowerCase();
      const results = articles.filter(article => (
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      ));

      console.log("Filtered by URL param:", results.length, "of", articles.length);
      setFilteredArticles(results);
    }
  }, [articles, searchParams]);

  return (
    <section className="w-full h-auto grid grid-cols-[2fr,0.8fr] gap-10 px-[5%]">
      <div className="w-full h-auto">
        <Filter
          handleSorting={handleSortChange}
          sortBy={sortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          performSearch={performSearch}
          dark={dark}
        />
        {isLoading ? (
          <div className="w-full h-auto flex items-center justify-center mt-28">
            <Loading />
          </div>
        ) : <Articles articles={filteredArticles} dark={dark} />}
      </div>
      <aside className="w-full h-auto flex flex-col gap-10">
        <AboutBlog dark={dark} />
        <Categories filterByCategory={filteredByCategory} dark={dark} />
        <PopularPost dark={dark} posts={articles} />
        <Tags dark={dark} />
        <NewsLetter dark={dark} />
      </aside>
    </section>
  )
};

Blog.propTypes = {
  dark: PropTypes.bool
}

export default Blog;