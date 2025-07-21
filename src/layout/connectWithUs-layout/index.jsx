import { mdiEmail, mdiPhone, mdiClockOutline, mdiMapMarker, mdiLinkedin, mdiTwitter, mdiFacebook } from "@mdi/js";
import Icon from '@mdi/react';
import ContactInfo from "./contactInfo";
import PropTypes from 'prop-types';

const ConnectWithUs = ({ dark }) => {

    return (
        <section className="w-full h-auto px-4 md:px-[8%] py-12 md:py-24 flex flex-col gap-8 md:gap-16" aria-labelledby="connect-heading" role="region">
            <div className="w-full h-auto flex flex-col gap-3">
                <span className={`text-[15px] italic ${dark ? "text-secondary" : 'text-primary'}`}>Connect</span>
                <h1 id="connect-heading" className={`text-4xl tracking-wide font-bold uppercase ${dark ? "text-white" : "text-zinc-900"}`}>Get In Touch</h1>
                <p className={dark ? "text-zinc-300" : "text-zinc-600"}>We&apos;re here to answer your questions about webinars.</p>
            </div>

            <div className="w-full h-auto flex flex-col gap-8">
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-8 md:gap-12 lg:gap-8 relative">
                    <ul className="w-full h-full flex flex-col gap-4">
                        <ContactInfo to='/contactus' label='Email' text='Reach us anytime via email' link='hello@webinar.com' dark={dark} icon={mdiEmail} />
                        <ContactInfo to='/contactus' label='Phone' text='Call us for immediate assistance' link='(555) 123-4567' dark={dark} icon={mdiPhone} />
                        <ContactInfo to={import.meta.env.VITE_MAP_LINK} blank="_blank" label='Office' text='DKI Jakarta, Indonesia' link='Get Directions' dark={dark} map={true} icon={mdiMapMarker} />
                        <ContactInfo to='/contactus' label='Working Times' text='Monday - Friday: 09.00-17.00' dark={dark} icon={mdiClockOutline} />
                    </ul>
                    <div className="w-full h-64 sm:h-96 md:h-[25rem] lg:h-full" aria-label="Map showing our office location">
                        <iframe
                            src={import.meta.env.VITE_MAP_URL}
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Our Location"
                        />
                    </div>
                </div>

                <div className="w-full h-auto flex flex-col gap-4">
                    <h2 className={`text-xl font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>Follow Us</h2>
                    <div className="flex gap-4">
                        <button onClick={() => window.scrollTo(0, 0)} type="button" className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${dark ? "hover:bg-white text-zinc-300" : "hover:bg-black text-zinc-600"}`} aria-label="linkedin">
                            <Icon path={mdiLinkedin} size={1} />
                        </button>
                        <button onClick={() => window.scrollTo(0, 0)} type="button" className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${dark ? "hover:bg-white text-zinc-300" : "hover:bg-black text-zinc-600"}`} aria-label="twitter">
                            <Icon path={mdiTwitter} size={1} />
                        </button>
                        <button onClick={() => window.scrollTo(0, 0)} type="button" className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${dark ? "hover:bg-white text-zinc-300" : "hover:bg-black text-zinc-600"}`} aria-label="facebook">
                            <Icon path={mdiFacebook} size={1} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
};

ConnectWithUs.propTypes = {
    dark: PropTypes.bool
}

export default ConnectWithUs;
