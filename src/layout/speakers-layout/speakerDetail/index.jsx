import { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { dummyAllSpeakers as allSpeakers } from "../../../data/speakersData";
import PropTypes from 'prop-types';
import Header from "../../../components/header";
import { SESSIONS_HEADER as header } from "../../../config/configData";
import ToTop from "../../../UI/toTop";
import Sessions from "./sessions";
import { usePageLoading } from "../../../hooks/usePageLoading";
import { failLoadData as message } from '../../../config/configData';
import LoadingOverlay from "../../../components/loadingOverlay";

const SpeakerDetail = ({ dark }) => {
    const { speakerId } = useParams();
    const location = useLocation();
    const [speaker, setSpeaker] = useState(null);
    const [, setPageData] = useState(null);

    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 300,
        maxDuration: 1200,
        autoStart: true
    });

    const fetchPageData = useCallback(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setPageData({ loaded: true });
        } catch (e) {
            console.error(message.error, e)
        } finally {
            stopLoading()
        }
    }, [stopLoading])

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
        fetchPageData();
    }, [location.state, speakerId, fetchPageData]);

    // Handle case where speaker is not found
    if (!speaker) {
        return <div className="w-full h-screen flex items-center justify-center">
            <div className={`${dark ? 'text-white' : 'text-primary'} text-xl`}>Speaker not found</div>
        </div>;
    }

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
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
        </Fragment>
    )
};

SpeakerDetail.propTypes = {
    dark: PropTypes.bool
};

export default SpeakerDetail;