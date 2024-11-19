import React, { useState, useEffect } from 'react';
import './MoonPhase.css';

function MoonPhase() {
    const [date, setDate] = useState({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [phase, setPhase] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    const calculateMoonPhase = (yy, mm, dd) => {
        let c, e, jd, b;
        if (mm < 3) {
            yy--;
            mm += 12;
        }
        ++mm;
        c = 365.25 * yy;
        e = 30.6 * mm;
        jd = c + e + dd - 694039.09;
        jd /= 29.5305882;
        b = parseInt(jd);
        jd -= b;
        b = Math.round(jd * 8);

        if (b >= 8) b = 0;

        const phases = [
            { src: 'newmoon.png', name: 'New-Moon' },
            { src: 'waxingcrescent.png', name: 'Waxing-Crescent-Moon' },
            { src: 'firstquarter.png', name: 'Quarter-Moon' },
            { src: 'waxinggibbous.png', name: 'Waxing-Gibbous-Moon' },
            { src: 'fullmoon.png', name: 'Full-Moon' },
            { src: 'waninggibbous.png', name: 'Waning-Gibbous-Moon' },
            { src: 'lastquarter.png', name: 'Last-Quarter-Moon' },
            { src: 'waningcrescent.png', name: 'Waning-Crescent-Moon' },
        ];

        setImageSrc(`https://raw.githubusercontent.com/tallulahh/moon-phase/main/${phases[b].src}`);
        setPhase(phases[b].name);
    };

    useEffect(() => {
        calculateMoonPhase(date.year, date.month, date.day);
    }, []);

    const toggleSearch = () => {
        setShowInputs(!showInputs); // 입력창 표시/숨김
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setDate({ ...date, [name]: parseInt(value) });
    };

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            calculateMoonPhase(date.year, date.month, date.day);
            setShowInputs(false); // 검색 완료 후 입력창 닫기
        }
    };

    return (
        <div className="moonPhaseContainer">
            <h1 className="moonPhaseTitle">Moon Phase</h1>
            <button className="searchBtn" onClick={toggleSearch}>Search a date</button>
            {showInputs && (
                <div className="inputGroup">
                    <input
                        className="moonPhaseInput"
                        name="day"
                        placeholder="DD"
                        onChange={handleInput}
                        onKeyDown={handleSubmit}
                    />
                    <input
                        className="moonPhaseInput"
                        name="month"
                        placeholder="MM"
                        onChange={handleInput}
                        onKeyDown={handleSubmit}
                    />
                    <input
                        className="moonPhaseInput"
                        name="year"
                        placeholder="YYYY"
                        onChange={handleInput}
                        onKeyDown={handleSubmit}
                    />
                </div>
            )}
            <div className="imageHolder">
                <img src={imageSrc} alt="Moon Phase" />
            </div>
            <div className="phaseInfo">

                <span id="phase">{phase}</span>
            </div>
        </div>
    );
}

export default MoonPhase;
