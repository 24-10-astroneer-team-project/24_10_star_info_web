import React from 'react';
import './Main_Button.css';
//import Main_Button from '../../components/layout/Main_Button'; // 임시추가'

// function WeatherPage() {
//     const handleButtonClick = () => {
//         window.location.href = 'https://www.naver.com'; // Redirect to Naver
//     };


function Main_Button({ onClick, label = "페이지 이동", variant = "button-glow" }) {
    return (
        <button className={`main_button ${variant}`} onClick={onClick}>
            {label}
        </button>
    );
}

export default Main_Button;
