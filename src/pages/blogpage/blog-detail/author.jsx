import PropTypes from 'prop-types';

const Author = ({ author, dark }) => {
    return (
        <div className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md`}>
            <h3 className={`text-xl font-semibold p-6 border-l ${dark ? 'text-white border-secondary' : 'text-zinc-900 border-primary'}`}>About the Author</h3>
            <div className='w-full h-auto flex flex-col gap-4 border-t border-zinc-200/80 p-6'>
                <div className={dark ? 'text-white' : 'text-zinc-900 font-semibold'}>{author}</div>
                <p className={dark ? "text-zinc-300" : "text-zinc-600"}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, quos Repudiandae possimus id ab sit reprehenderit perferendis saepe ratione at repellendus laudantium? Ullam delectus tempore reprehenderit cum harum. Possimus, soluta.</p>
            </div>
        </div>
    )
};

Author.propTypes = {
    author: PropTypes.string,
    dark: PropTypes.bool
}

export default Author;