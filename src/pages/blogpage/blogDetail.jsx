import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { BLOG_DETAIL_HEADER as blogDetailHeader } from "../../config/configData";
import { DUMMY_ARTICLES as articles } from "../../data/blogData";
import { faker } from "@faker-js/faker";

import Categories from "../../layout/blog-layout/sideContent/categories";
import NewsLetter from "../../layout/blog-layout/sideContent/news-letter";
import PopularPost from "../../layout/blog-layout/sideContent/popular-post";
import Tags from "../../layout/blog-layout/sideContent/tags";
import PropTypes from "prop-types";
import Loading from "../../UI/loading";
import Header from '../../components/header';
import Author from "./blog-detail/author";
import Article from "./blog-detail/article";
import Comments from "./blog-detail/comments";

const BlogDetail = ({ dark }) => {
    const { blogId } = useParams();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchArticleData = async () => {
            setIsLoading(true);

            try {
                if (location.state && location.state.article) {
                    setArticle(location.state.article);
                    fetchComments(blogId);
                } else {
                    const articleData = articles.find((article) => article.id === blogId);
                    setArticle(articleData);
                    fetchComments(blogId);
                }
            } catch (error) {
                console.error("Error fetching article data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleData();

    }, [location.state, blogId]);

    const fetchComments = async () => {
        setIsLoading(true);

        try {
            const data = [
                {
                    id: 1,
                    name: faker.person.fullName(),
                    text: "Great article! I really enjoyed reading it.",
                    avatar: faker.image.url(),
                    date: faker.date.past().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                },
                {
                    id: 2,
                    name: faker.person.fullName(),
                    text: "This is a very informative post. Thanks for sharing!",
                    avatar: faker.image.url(),
                    date: faker.date.past().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                },
                {
                    id: 3,
                    name: faker.person.fullName(),
                    text: "I found this article very helpful. Keep up the good work!",
                    avatar: faker.image.url(),
                    date: faker.date.past().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                },
            ]
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-auto flex justify-center mt-28">
                <Loading />
            </div>
        );
    };

    if (!article) {
        return (
            <div className="w-full h-auto flex justify-center mt-28">
                <p className={dark ? "text-zinc-300" : "text-zinc-600"}>Article not found</p>
            </div>
        );
    };

    return (
        <main className="w-full h-auto">
            <Header
                dark={dark}
                title={blogDetailHeader.title}
                description={blogDetailHeader.description}
                ariaLabel="Blog Detail Header"
            />
            <section className="w-full h-auto grid grid-cols-[2fr,0.8fr] gap-10 px-[5%] pb-24" aria-label="Blog Detail Section">
                <div className="w-full h-auto flex flex-col gap-10">
                    <Article article={article} dark={dark} />
                    <Comments comments={comments} setComments={setComments} dark={dark} />
                </div>
                <aside className="w-full h-auto flex flex-col gap-10 mt-10">
                    <Author author={article.author} dark={dark} />
                    <Categories dark={dark} />
                    <PopularPost dark={dark} posts={articles} />
                    <NewsLetter dark={dark} />
                    <Tags dark={dark} />
                </aside>
            </section>
        </main>
    )
};

BlogDetail.propTypes = {
    dark: PropTypes.bool.isRequired,
};

export default BlogDetail;