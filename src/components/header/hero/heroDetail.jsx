/* eslint-disable react/prop-types */
import { motion } from 'motion/react';
import Icon from '@mdi/react'
import { useNavigate } from 'react-router-dom';
import {
    mdiClockOutline,
    mdiChatProcessingOutline,
    mdiCertificate,
    mdiMicrophone,
} from '@mdi/js'

const HeroDetail = ({ image, title, description, narasumber, dark }) => {
    const navigate = useNavigate();

    const handleJoinButton = () => {
        window.scrollTo(0, 0)
        navigate(`/events`)
    }

    return (
        <section
            className="w-full h-screen flex-100 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className={`w-full h-full flex flex-col gap-8 bg-gradient-to-t ${dark ? 'from-secondary to-zinc-900/50' : 'from-primary to-zinc-900/50'} px-[8%] py-12`}>
                <motion.div
                    className="w-full h-full flex flex-col justify-center gap-4 text-white"
                    initial={{
                        opacity: 0,
                        y: -25
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <h1 className="text-5xl tracking-wide font-semibold uppercase -ml-[1px]">
                        {title}
                    </h1>
                    <h2 className='text-2xl font-medium'>by {narasumber}</h2>
                    <p className='text-zinc-200 overflow-y-auto h-12 sm:h-auto'>{description}</p>
                    <div className='w-full h-auto flex justify-start gap-4'>
                        <div className='flex-50 sm:flex-30 flex flex-col gap-3 text-zinc-200'>
                            <span>Starts:</span>
                            <span className='text-xl font-medium text-white'>
                                January 15, 2025 <br />
                                20:00 PM ETC
                            </span>
                        </div>
                        <div className='flex-50 sm:flex-70 flex flex-col gap-3 text-zinc-200'>
                            <span>Price:</span>
                            <span className='text-xl font-medium text-white'>
                                $12,99 (Includes live session and access to recording)
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-auto flex items-center gap-4">
                        <button onClick={handleJoinButton} className={`w-auto h-10 px-4 flex items-center bg-white hover:bg-zinc-200 ${dark ? 'text-secondary ' : 'text-primary'} font-medium hover:cursor-pointer transition-colors duration-150`} type="button">Join</button>
                        <button className={`w-auto h-10 px-4 flex items-center bg-transparent border-2 border-white text-white font-medium hover:bg-white ${dark ? 'hover:text-secondary' : 'hover:text-primary'} hover:cursor-pointer transition-colors duration-150`} type="button">Learn More</button>
                    </div>
                </motion.div>
                <motion.div
                    className='w-auto h-auto flex flex-wrap gap-4'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <span className='text-zinc-200 flex items-center gap-2'>
                        <Icon path={mdiClockOutline} size={1} />
                        <p>Live class and recording</p>
                    </span>
                    <span className='text-zinc-200 flex items-center gap-2'>
                        <Icon path={mdiChatProcessingOutline} size={1} />
                        <p>Live Q&A</p>
                    </span>
                    <span className='text-zinc-200 flex items-center gap-2'>
                        <Icon path={mdiCertificate} size={1} />
                        <p>Certificate of completion</p>
                    </span>
                    <span className='text-zinc-200 flex items-center gap-2'>
                        <Icon path={mdiMicrophone} size={1} />
                        <p>English</p>
                    </span>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroDetail;