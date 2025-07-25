import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { dummyAllSpeakers as allSpeakers } from "../../../data/speakersData";
import PropTypes from 'prop-types';
import Header from "../../../components/header";
import { SESSIONS_HEADER as header } from "../../../config/configData";
import ToTop from "../../../UI/toTop";
import Sessions from "./sessions";

const SpeakerDetail = ({ dark }) => {
    const { speakerId } = useParams();
    const location = useLocation();
    const [speaker, setSpeaker] = useState(null);

    useEffect(() => {
        const fetchSpeakerData = async () => {
            try {
                if (location.state && location.state.speaker) {
                    setSpeaker(location.state.speaker);
                } else {
                    // Try localStorage first
                    const storedSpeaker = localStorage.getItem('currentSpeaker');
                    if (storedSpeaker) {
                        setSpeaker(JSON.parse(storedSpeaker));
                    } else {
                        // Fall back to finding by ID
                        const speakersData = allSpeakers.find((speaker) =>
                            String(speaker.id).trim() === String(speakerId).trim()
                        );
                        setSpeaker(speakersData);
                    }
                }
            } catch (error) {
                console.error('Error fetching speakers data:', error);
            }
        }

        fetchSpeakerData();
    }, [location.state, speakerId]);

    // Handle case where speaker is not found
    if (!speaker) {
        return <div className="w-full h-screen flex items-center justify-center">
            <div className={`${dark ? 'text-white' : 'text-primary'} text-xl`}>Speaker not found</div>
        </div>;
    }

    return (
        <main className="w-full h-auto flex flex-col gap-10">
            <Header
                ariaLabel="schedule sessions header"
                title={header.title}
                description={header.description}
                tagline="schedule"
                dark={dark}
            />
            <section className="w-full h-auto pb-24" aria-labelledby="schedule content">
                <div id='schedule content'>
                    <Sessions speaker={speaker} allSpeakers={allSpeakers} dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
};

SpeakerDetail.propTypes = {
    dark: PropTypes.bool
};

export default SpeakerDetail;