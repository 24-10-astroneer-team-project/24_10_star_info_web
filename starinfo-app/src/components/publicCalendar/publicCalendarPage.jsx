// publicCalendarPage.jsx

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./PublicCalendarPage.css";
import useFetchEvents from "../../hooks/publicCalendar/useFetchCalendarEvents";

const PublicCalendarPage = () => {
    const [date, setDate] = useState(new Date()); // 현재 선택한 날짜
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const { events, loading, error } = useFetchEvents(year, month); // Custom Hook 사용

    // 특정 날짜의 이벤트 필터링
    const getEventsForDate = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
        return events.filter((event) => event.startDateTime.startsWith(formattedDate));
    };

    // 타일에 표시할 내용
    const tileContent = ({ date }) => {
        const dayEvents = getEventsForDate(date);
        if (dayEvents.length > 0) {
            return (
                <div className="event-indicator">
                    {dayEvents.map((event, index) => (
                        <span key={index} className={`event-dot ${event.eventCategory.toLowerCase()}`}></span>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="calendar-container">
            <h1>Public Calendar</h1>
            <Calendar
                value={date}
                onChange={setDate}
                tileContent={tileContent}
                tileClassName={({ date }) =>
                    getEventsForDate(date).length > 0 ? "highlighted" : ""
                }
            />
            <div className="event-list">
                <h2>Events on {date.toDateString()}</h2>
                <ul>
                    {getEventsForDate(date).map((event, index) => (
                        <li key={index}>
                            <strong>{event.summary}</strong> ({event.eventCategory})
                            <p>{event.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PublicCalendarPage;
