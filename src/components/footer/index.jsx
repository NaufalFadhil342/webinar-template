import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { mdiInstagram, mdiFacebook, mdiTwitter, mdiLinkedin, mdiYoutube } from "@mdi/js";
import PropTypes from 'prop-types';
import AdditionalLinks from "./additionalLinks";
import SocialMedia from "./socialMedia";
import TermPolice from "./termPolice";

const socialMedia = [
    { icon: mdiInstagram },
    { icon: mdiFacebook },
    { icon: mdiTwitter },
    { icon: mdiLinkedin },
    { icon: mdiYoutube }
];

const additionalLinks = [
    { id: 'about', name: "About Us", link: "aboutus" },
    { id: 'webinar', name: "Webinars", link: "live" },
    { id: 'support', name: "Support", link: "support" },
    { id: 'contact', name: "Contact Us", link: "contactus" },
    { id: 'blog', name: "Blog", link: "blog" },
    { id: 'faq', name: "FAQ", link: "faq" },
    { id: 'career', name: "Careers", link: "careers" },
    { id: 'testimony', name: "Tertimonials", link: "testimonials" },
    { id: 'event', name: "Events", link: "events" },
    { id: 'discuss', name: "Community", link: "discuss" },
];

const Footer = ({ dark }) => {
    const backToTopHandler = useCallback(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const [subscribe, setSubscribe] = useState('');
    const [openSubscribe, setOpenSubscribe] = useState(false);

    const filterFirstAdds = additionalLinks.slice(0, 5);
    const filterSecondAdds = additionalLinks.slice(5, 10);

    return (
        <section className={`w-full h-auto py-20 px-[8%] ${dark ? 'bg-zinc-800' : 'bg-zinc-400/70'}`}>
            <div className={`w-full h-auto flex flex-col gap-8 pb-7 border-b ${dark ? 'border-white' : 'border-zinc-800'}`}>
                <div className="w-full h-auto grid md:grid-cols-2 gap-8">
                    <div className={`w-full h-auto flex flex-col gap-4 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                        <span className="w-fit font-bold text-3xl">MitNar.</span>
                        <h1 className="font-bold text-5xl uppercase tracking-wide">Stay Connected with Our Latest Updates</h1>
                        <p className={dark ? 'text-zinc-300' : "text-zinc-600"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, nam dolore voluptatibus blanditiis.
                        </p>
                    </div>
                    <div className="w-full h-auto flex md:justify-end gap-10">
                        <ul>
                            {
                                filterFirstAdds.map((addLink) => (
                                    <AdditionalLinks dark={dark} key={addLink.id} toTopScreen={backToTopHandler} to={addLink.link} name={addLink.name} />
                                ))
                            }
                        </ul>
                        <ul>
                            {
                                filterSecondAdds.map((addLink) => (
                                    <AdditionalLinks dark={dark} key={addLink.id} toTopScreen={backToTopHandler} to={addLink.link} name={addLink.name} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className='w-full h-auto flex gap-8 flex-wrap justify-between items-end'>
                    <div className='w-auto'>
                        {openSubscribe && <div className='w-full h-auto flex items-center gap-4 mb-4'>
                            <input type="email" placeholder="Enter your email" value={subscribe} onChange={(e) => setSubscribe(e.target.value)} className={`w-full h-10 flex items-center pl-2 bg-transparent rounded-md border outline-none ${dark ? " text-zinc-300 border-zinc-300" : "text-zinc-600 border-zinc-700"}`} />
                            <button type='submit' aria-label="Submit subscription" className={`w-auto h-10 px-4 rounded flex items-center ${dark ? "bg-white text-zinc-600 hover:bg-zinc-300" : "bg-zinc-700 text-white hover:bg-zinc-600"}`}>Submit</button>
                        </div>}
                        <div className="w-auto flex gap-4">
                            <button
                                className={`w-fit h-10 px-4 flex items-center text-white ${dark ? 'bg-secondary rounded hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} duration-150 transition-colors`}
                                onClick={() => setOpenSubscribe(!openSubscribe)}
                            >
                                Subscribe
                            </button>
                            <Link to='/contactus' onClick={backToTopHandler} aria-label="Contact us" className={`w-fit h-10 px-4 flex items-center bg-transparent border ${dark ? 'border-zinc-300 text-zinc-300 hover:bg-white hover:text-zinc-600' : 'border-zinc-700 text-zinc-600 hover:text-white hover:bg-zinc-800'} transition-all duration-150`}>Contact</Link>

                        </div>
                    </div>
                    <div className="w-auto h-fit flex items-center gap-2">
                        {
                            socialMedia.map((media, index) => (
                                <SocialMedia key={index} dark={dark} icon={media.icon} size={1} toTopScreen={backToTopHandler} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='w-full h-auto mt-5 flex flex-col sm:flex-row items-center gap-6 justify-between'>
                <p className={dark ? "text-white" : 'text-zinc-600'}>&copy; 2025 MeetNar. All rights reserved.</p>
                <TermPolice dark={dark} toTopScreen={backToTopHandler} />
            </div>
        </section>
    )
};

Footer.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default Footer;
