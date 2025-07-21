import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';

const Search = ({ dark, placeholder, className, searchIcon, value, onChange, onSubmit, onKeyDown }) => {

    return (
        <section className={className}>
            <div className="w-full h-full flex items-center gap-4">
                <input
                    className={`w-full h-11 px-3 flex bg-transparent items-center justify-start outline-none border-b-2 
                    ${dark ? 'text-zinc-300 border-zinc-300 focus:border-secondary' :
                            'text-zinc-700 border-zinc-500 focus:border-primary'}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                {searchIcon && (
                    <button className="w-auto h-11 flex items-center" type='submit' onSubmit={onSubmit}>
                        <Icon
                            path={mdiMagnify}
                            size={1.25}
                            className={`transition-colors duration-150 hover:cursor-pointer ${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-900 hover:text-primary'}`}
                        />
                    </button>
                )}
            </div>
        </section>
    )
};

Search.propTypes = {
    dark: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    searchIcon: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired
}

export default Search;