
// function WeatherPage() {
//     const handleButtonClick = () => {
//         window.location.href = 'https://www.naver.com'; // Redirect to Naver
//     };
import React from 'react';
import './Main_Button.css';

function Main_Button({ onClick, label = "페이지 이동 >", variant = "button-glow" }) {
    return (
        <button className={`main_button ${variant}`} onClick={onClick}>
            {label}
        </button>
    );
}

export default Main_Button;
