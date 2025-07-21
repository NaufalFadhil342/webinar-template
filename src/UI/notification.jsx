import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { dummyNotifData } from "../data/notiveData";
import PropTypes from 'prop-types';

const Notification = ({ navbarState, markAsRead, setMarkAsRead, dark }) => {
    const [viewAllNotif, setViewAllNotif] = useState(false);

    const handleViewAllNotif = () => setViewAllNotif((prev) => !prev)

    return (
        <AnimatePresence>
            {navbarState === 'open' && <motion.section
                className={`w-72 h-auto py-6 px-6 absolute top-20 right-0 z-[3] overflow-y-hidden shadow-md shadow-zinc-500/25 ${dark ? 'bg-zinc-800' : 'bg-white'}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.75 }}
            >
                <div className="w-full h-auto flex justify-between items-center gap-3">
                    <h3 className={`font-medium text-xl ${dark ? 'text-white' : 'text-zinc-900'}`}>Notifications</h3>
                    <span className={`hover:font-medium transition-all duration-150 cursor-default ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 text-sm hover:text-zinc-900'}`} onClick={() => setMarkAsRead(true)}>Mark as read</span>
                </div>
                <div
                    className={`w-full h-auto my-4 py-4 border-y overflow-y-hidden flex flex-col gap-4 ${dark ? 'border-zinc-300' : 'border-zinc-700'}`}
                >
                    {dummyNotifData.slice(0, viewAllNotif ? dummyNotifData.length : 2).map((notif) => (
                        <div key={notif.id} className="w-full h-auto flex flex-col gap-2">
                            {dark ? <p className={markAsRead ? 'text-zinc-300' : 'text-white'}>{notif.webinar}</p> : <p className={markAsRead ? 'text-zinc-500' : 'text-zinc-700'}>{notif.webinar}</p>}
                            <div className={`italic text-sm font-medium ${dark ? 'text-secondary' : 'text-primary'}`}>{notif.date}</div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-end">
                    <button onClick={handleViewAllNotif} className={`underline duration-150 transition-colors ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-primary'}`}>View all</button>
                </div>
            </motion.section>}
        </AnimatePresence>
    )
}

Notification.propTypes = {
    markAsRead: PropTypes.bool.isRequired,
    setMarkAsRead: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired,
    navbarState: PropTypes.any
}

export default Notification;