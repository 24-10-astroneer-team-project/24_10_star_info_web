// Head.js
import React, { useState } from 'react';
import './Head.css';

function Head() {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMouseEnter = () => setMenuVisible(true);
    const handleMouseLeave = () => setMenuVisible(false);

    return (
        <nav className="nav_header">
            <div
                className="astro-logo"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a href="./main">ASTRO</a>

            </div>
            <div
                className={`menu-container ${isMenuVisible ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ul className="navbar">
                    <li><a href="./main">메인화면</a></li>
                    <li><a href="./starmap">별보기</a></li>
                    <li><a href="https://naver.com">천체탐구</a></li>
                    <li><a href="https://naver.com">궤도계산</a></li>
                    <li><a href="./gps">위치 입력(임시)</a></li>
                    <li><a href="./login">로그인</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Head;
