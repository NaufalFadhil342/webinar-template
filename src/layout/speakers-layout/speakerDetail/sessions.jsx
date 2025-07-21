import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpeakerProfile from './speakerProfile';
import SpeakerBios from './speakerBios';
import SessionDate from './sessionDate';
import SessionList from './sessionList';

const Sessions = ({ speaker, allSpeakers, dark }) => {
    const dates = ['May 5, 2025', 'May 6, 2025', 'May 7, 2025'];
    const [selectedDate, setSelectedDate] = useState(() => {
        const saveDateIndex = localStorage.getItem('selectedSessionDate');
        return saveDateIndex !== null ? parseInt(saveDateIndex, 10) : 0;
    });
    const selectedDateStr = dates[selectedDate];
    // const sessions = dummyScheduleData;

    useEffect(() => {
        if (!speaker) {
            console.error('No speaker data provided to Sessions component');
        };

        // Use a more specific key to avoid conflicts
        localStorage.setItem('selectedSessionDate', selectedDate.toString());
    }, [speaker, selectedDate]);

    // Filter sessions by selected date
    const filteredSessions = useMemo(() => {
        if (!allSpeakers || !allSpeakers.length) {
            console.warn('No session data available');
            return [];
        }

        const dateFilteredSessions = allSpeakers.filter(speaker => {
            return speaker.date === selectedDateStr;
        });

        return dateFilteredSessions.sort((a, b) => {
            const timeA = a.times;
            const timeB = b.times;

            const isAM_A = timeA.includes('AM');
            const isAM_B = timeB.includes('AM');

            if (isAM_A && !isAM_B) return -1;
            if (!isAM_A && isAM_B) return 1;

            const hourA = parseInt(timeA.split(':')[0]);
            const hourB = parseInt(timeB.split(':')[0]);

            const hour24A = isAM_A ?
                (hourA === 12 ? 0 : hourA) :
                (hourA === 12 ? 12 : hourA + 12);

            const hour24B = isAM_B ?
                (hourB === 12 ? 0 : hourB) :
                (hourB === 12 ? 12 : hourB + 12);

            if (hour24A !== hour24B) return hour24A - hour24B;

            const minuteA = parseInt(timeA.split(':')[1].split(' ')[0]);
            const minuteB = parseInt(timeB.split(':')[1].split(' ')[0]);

            return minuteA - minuteB
        });
    }, [selectedDateStr, allSpeakers]);

    return (
        <main className='w-full h-auto px-[8%] flex flex-col gap-10'>
            <section className={`w-full h-auto flex flex-col md:flex-row p-6 rounded-xl ${dark ? 'bg-zinc-800' : 'bg-white'}`}>
                {speaker ? (
                    <>
                        <SpeakerProfile speaker={speaker} dark={dark} />
                        <SpeakerBios speaker={speaker} dark={dark} />
                    </>
                ) : (
                    <div className={`w-full text-center py-6 ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Speaker information not available
                    </div>
                )}
            </section>
            <section className='w-full h-auto flex flex-col gap-10'>
                <SessionDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} dates={dates} dark={dark} />
                <SessionList sessions={filteredSessions} dark={dark} />
            </section>
        </main>
    )
};

Sessions.propTypes = {
    speaker: PropTypes.any,
    allSpeakers: PropTypes.array,
    dark: PropTypes.bool
};

export default Sessions;