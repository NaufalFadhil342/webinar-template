import Icon from "@mdi/react";
import { mdiChevronRight } from '@mdi/js';
import { Link } from "react-router";
import { Link as ScrollLink } from "react-scroll";
import PropTypes from "prop-types";
import discoverImg from '../../assets/team/man2.jpg';

const Discover = ({ dark }) => {
    const discoverHandle = () => window.scrollTo({ top: 0 });

    return (
        <section className="w-full h-auto py-24 px-[8%] flex flex-col md:flex-row gap-12">
            <div className="w-full h-auto flex flex-col gap-3 md:py-20">
                <span className={`text-[15px] italic transition-colors duration-300 ${dark ? "text-secondary" : "text-primary"
                    }`}>
                    Join
                </span>
                <h1 className={`text-4xl uppercase font-bold tracking-wide transition-colors duration-300 ${dark ? "text-white" : "text-zinc-900"
                    }`}>
                    Discover Your Future with Us Today
                </h1>
                <p className={`transition-colors duration-300 ${dark ? "text-zinc-300" : "text-zinc-600"
                    }`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo similique atque vel! Labore, eaque. Ipsam suscipit odio harum quia non illo nostrum, sint veritatis exercitationem doloribus sunt.
                </p>
                <div className="w-full h-auto flex items-center gap-4 mt-2">
                    <ScrollLink
                        to="discover"
                        smooth={true}
                        className={`w-fit h-9 rounded flex items-center text-white px-4 transition-colors duration-300 cursor-pointer ${dark ? "bg-secondary hover:bg-darkSecondary" : "bg-primary hover:bg-darkPrimary"
                            }`}
                        aria-label="Apply for position"
                    >
                        Apply
                    </ScrollLink>
                    <Link
                        to='/aboutus'
                        className={`w-fit h-fit flex items-end transition-colors duration-300 ${dark ? "text-zinc-300 hover:text-secondary" : "text-zinc-600 hover:text-primary"
                            }`}
                        onClick={discoverHandle}
                        aria-label="Learn more about careers"
                    >
                        <>Learn More</>
                        <Icon path={mdiChevronRight} size={1} aria-hidden="true" />
                    </Link>
                </div>
            </div>
            <div className={`w-full h-[50vh] md:h-auto overflow-hidden border-2 rounded-[35%] transition-colors duration-300 ${dark ? "border-secondary" : "border-primary"
                }`}>
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${discoverImg})` }}
                    role="img"
                    aria-label="Team member working"
                />
            </div>
        </section>
    )
};

Discover.propTypes = {
    dark: PropTypes.bool
}

export default Discover;
