// LoadingSpinner.js

import React, { useEffect } from 'react';
import './LoadingSpinner.scss';
import './LoadingSpinner.css'

function LoadingSpinner() {
    // 별똥별과 별의 개수를 설정
    const meteorCount = 4;
    const starCount = 25;

    useEffect(() => {
        // 컴포넌트가 마운트될 때 body에 클래스 추가
        document.body.classList.add('loading-spinner-body');

        // 컴포넌트가 언마운트될 때 클래스 제거
        return () => {
            document.body.classList.remove('loading-spinner-body');
        };
    }, []);

    return (
        <div className="loading-spinner-body w-full h-full flex flex-col items-center justify-center bg-gray-700">
            {/* 로딩 스피너와 텍스트 */}
            <p className="loading-text_page">
                데이터를 가져오는 중입니다. 잠시만 기다려 주세요...
            </p>
            <div className="spinner"></div>
            {/* 추가된 애니메이션 배경 */}
            <div className="container">
                <div className="moon">
                    <div className="carter first"></div>
                    <div className="carter second"></div>
                    <div className="carter third"></div>
                    <div className="moon-halo"></div>
                </div>

                <div className="meteors">
                    {Array.from({length: meteorCount}).map((_, index) => (
                        <div key={index} className="meteor"></div>
                    ))}
                </div>

                <div className="stars">
                    {Array.from({length: starCount}).map((_, index) => (
                        <div key={index} className="star"></div>
                    ))}
                </div>

                <div className="planet"></div>
                <div className="mountains"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;