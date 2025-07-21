import { useContext } from "react";
import { SessionsContext } from "../context/sessionsContext";

function useSessions() {
    const { selectedSessions, addSession, removeSession, clearSessions } = useContext(SessionsContext);

    return {
        selectedSessions,
        addSession,
        removeSession,
        clearSessions
    }
}

export { useSessions };