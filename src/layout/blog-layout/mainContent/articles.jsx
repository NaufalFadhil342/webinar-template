import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import Pagination from "../../../UI/pagination";

const Articles = ({ articles, dark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 3;

    const totalArticles = articles.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentPages = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        window.scrollTo(0, 0);
    };

    return (
        <div className="w-full h-auto flex flex-col gap-10 mt-10">
            {currentPages.map((article) => {
                return (
                    <article key={article.id} className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} overflow-hidden rounded-lg`}>
                        <div className="w-full h-80 bg-cover bg-no-repeat bg-center relative" style={{ backgroundImage: `url(${article.image})` }}>
                            <div className={`w-full h-full flex items-end justify-start p-6 absolute z-[2] bg-gradient-to-b from-transparent ${dark ? 'to-secondary' : 'to-primary'}`}>
                                <div className="flex items-center gap-4">
                                    <small className="p-2 bg-white text-zinc-700 rounded-full">{article.category}</small>
                                    <p className="text-zinc-200">{article.published}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col gap-6 p-6">
                            <h2 className={`text-[2em] font-semibold ${dark ? 'text-white' : 'text-zinc-900'} text-left leading-none`}>{article.title}</h2>
                            <p className={dark ? "text-zinc-300" : "text-zinc-600"}>{article.description.substring(0, 200)}...</p>
                            <Link
                                to={`/blog/${article.id}`}
                                state={{ article }}
                                className={`flex items-center gap-1 ${dark ? 'text-white hover:text-secondary' : 'text-zinc-600 hover:text-primary'} transition-all duration-300 ease-in-out`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <>Read More</>
                                <Icon path={mdiArrowRight} size={1} />
                            </Link>
                        </div>
                    </article>
                )
            })}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                dark={dark}
            />
        </div>
    )
};

Articles.propTypes = {
    articles: PropTypes.array.isRequired,
    dark: PropTypes.bool
};


export default Articles;