import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const JobDetail = ({ dark }) => {
    const location = useLocation();
    const career = location.state?.career || null;

    return (
        <section className="w-full h-auto flex flex-col gap-8">
            <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>{career.position}</h1>
            <div className="flex flex-col">
                <span className="flex items-center gap-2">
                    <div className={dark ? "text-zinc-300" : "text-zinc-600"}>Job:</div>
                    <p className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>{career.job}</p>
                </span>
                <span className="flex items-center gap-2">
                    <div className={dark ? "text-zinc-300" : "text-zinc-600"}>Work Location:</div>
                    <p className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>{career.location}</p>
                </span>
                <span className="flex items-center gap-3">
                    <div className={dark ? "text-zinc-300" : "text-zinc-600"}>Employment Type:</div>
                    <p className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>{career.assignment}</p>
                </span>
            </div>
        </section>
    )
};

JobDetail.propTypes = {
    dark: PropTypes.bool
}

export default JobDetail;