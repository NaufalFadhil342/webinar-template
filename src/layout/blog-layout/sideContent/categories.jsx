import { Link } from "react-router";
import { DUMMY_CATEGORIES } from "../../../data/blogData";
import PropTypes from "prop-types";

const Categories = ({ filterByCategory, dark }) => {
    const categories = DUMMY_CATEGORIES;

    return (
        <div className={`w-full h-auto ${dark ? "bg-zinc-800" : "bg-white"} rounded-md overflow-hidden`}>
            <h3 className={`h-12 px-6 flex items-center border-l ${dark ? "border-l-secondary text-white" : "border-l-primary text-zinc-900"} text-xl font-semibold`}>Categories</h3>
            <ul className={`w-full h-auto flex flex-col p-6 border-t ${dark ? 'border-t-zinc-400' : 'border-t-zinc-200/80'}`}>
                {categories.map((category) => (
                    <li key={category.id} className="w-full h-10">
                        <Link
                            className={`w-full h-full ${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-500 hover:text-primary'} flex items-center justify-between gap-4 
                        transition-colors duration-150`}
                            onClick={() => filterByCategory(category.name)}
                        >
                            <p>{category.name}</p>
                            <span>({category.amount})</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

Categories.propTypes = {
    filterByCategory: PropTypes.func,
    dark: PropTypes.bool
}

export default Categories;