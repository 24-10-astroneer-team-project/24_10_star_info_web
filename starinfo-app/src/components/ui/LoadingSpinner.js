// LoadingSpinner.js

import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>데이터를 가져오는 중입니다. 잠시만 기다려 주세요...</p>
        </div>
    );
}

export default LoadingSpinner;