// useFetchCalendarEvents.js

import { useState, useEffect } from "react";

const useFetchCalendarEvents = (year, month) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/public/calendar/events/monthly?year=${year}&month=${month}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [year, month]);

    return { events, loading, error };
};

export default useFetchCalendarEvents;
