import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

const Article = ({ article, dark }) => {
    const ContentSections = ({ subHeading }) => {
        return (
            <div className='flex flex-col gap-4'>
                <h2 className={`text-3xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'} mb-4`}>{subHeading}</h2>
                {article.contentSections.map((section, index) => (
                    <p key={index} className={`w-full ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{section}</p>
                ))}
            </div>
        );
    };

    return (
        <article className="w-full h-auto flex flex-col gap-10 mt-10">
            <section className="w-full h-auto flex flex-col gap-4">
                <h1 className={`text-[2.5em] font-semibold leading-none ${dark ? 'text-white' : 'text-zinc-900'}`}>{article.title}</h1>
                <div className="w-full h-auto flex items-center gap-4">
                    <small className={`p-2 ${dark ? 'bg-secondary' : 'bg-primary'} text-white rounded-full`}>{article.category}</small>
                    <p className={dark ? "text-zinc-300" : "text-zinc-600"}>{article.published}</p>
                </div>
            </section>
            <div className="w-full h-[30rem] bg-cover bg-no-repeat bg-center relative" style={{ backgroundImage: `url(${article.image})` }} />
            <section className='w-full h-auto flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    {article.contentSections.map((section, index) => (
                        <p key={index} className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{section}</p>
                    ))}
                </div>
                <div className='flex flex-col gap-4'>
                    <ContentSections subHeading="Key Developments in Quantum Computing" />
                    <ContentSections subHeading="Challenges and Limitations" />
                    <ContentSections subHeading="Looking Forward" />
                </div>
            </section>
            <section className='border-y border-zinc-300 py-8'>
                <div className='w-full flex items-center gap-3'>
                    <div className={`w-[4.25rem] h-16 rounded-[100%] border-2 ${dark ? 'border-secondary' : 'border-primary'} overflow-hidden`}>
                        <img className='w-full h-full object-cover' src={faker.image.urlPicsumPhotos()} alt={article.author} />
                    </div>
                    <div className='w-full h-auto'>
                        <div className={`${dark ? 'text-white' : 'text-zinc-900'} font-medium text-lg`}>{article.author}</div>
                        <p className={dark ? 'text-secondary' : 'text-primary'}>Author</p>
                    </div>
                </div>
            </section>
        </article>
    )
};

Article.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        published: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        contentSections: PropTypes.arrayOf(PropTypes.string).isRequired,
        author: PropTypes.string,
    }).isRequired,
    subHeading: PropTypes.string,
    dark: PropTypes.bool
};

export default Article;