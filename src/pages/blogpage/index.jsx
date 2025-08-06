import { Fragment, useCallback, useEffect, useState } from 'react';
import Header from "../../components/header";
import PropTypes from "prop-types";
import { BLOG_HEADER } from "../../config/configData";
import Blog from "../../layout/blog-layout";
import ToTop from "../../UI/toTop";
import { failLoadData as message } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const BlogPage = ({ dark }) => {
  const [, setPageData] = useState(null);
  const { isLoading, stopLoading } = usePageLoading({
    initialDelay: 50,
    minDuration: 500,
    maxDuration: 1500,
    autoStart: true
  });

  const fetchPageData = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setPageData({ loaded: true })
    } catch (error) {
      console.error(message.error, error)
    } finally {
      stopLoading()
    }
  }, [stopLoading])

  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  return (
    <Fragment>
      <LoadingOverlay isLoading={isLoading} dark={dark} />
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
    </Fragment>
  );
};

BlogPage.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default BlogPage;