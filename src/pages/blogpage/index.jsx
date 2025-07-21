import Header from "../../components/header";
import PropTypes from "prop-types";
import { BLOG_HEADER } from "../../config/configData";
import Blog from "../../layout/blog-layout";
import ToTop from "../../UI/toTop";

const BlogPage = ({ dark }) => {
  return (
    <main className="w-full h-auto pb-24" aria-label="Blog Page">
      <Header
        ariaLabel="Blog Page"
        dark={dark}
        description={BLOG_HEADER.description}
        title={BLOG_HEADER.title}
        tagline="News & Updates"
      />
      <section aria-labelledby="blog-section">
        <div id="blog-section">
          <Blog dark={dark} />
        </div>
        <ToTop dark={dark} />
      </section>
    </main>
  );
};

BlogPage.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default BlogPage;