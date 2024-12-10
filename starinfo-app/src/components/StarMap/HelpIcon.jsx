import React, { useState, useEffect } from 'react';
import './css/HelpIcon.css';
import questionMarkIcon from '../layout/asset/question_mark_icon.png';
import introImage1 from '../layout/asset/StarMap_Intro_1.png';
import introImage2 from '../layout/asset/StarMap_Intro_2.png';

const HelpIcon = () => {
    const [showIntro, setShowIntro] = useState(false); // Intro 이미지 표시 상태
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 표시 중인 이미지의 인덱스

    const images = [introImage1, introImage2]; // 이미지 배열

    const handleHelpClick = () => {
        setShowIntro(true); // 도움말 아이콘 클릭 시 Intro 이미지 표시
    };

    const handleCloseIntro = () => {
        setShowIntro(false); // Intro 이미지 닫기
    };

    const handleNextImage = (event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // 다음 이미지로 전환
    };

    const handlePrevImage = (event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length // 이전 이미지로 전환
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (showIntro) {
                if (event.key === 'ArrowRight') {
                    handleNextImage();
                } else if (event.key === 'ArrowLeft') {
                    handlePrevImage();
                }
            }
        };

        // 키보드 이벤트 리스너 추가
        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showIntro]); // `showIntro` 상태 변경 시 이벤트 리스너 등록/제거

    return (
        <>
            {/* 도움말 아이콘 */}
            <div
                className="help-icon-container"
                onClick={handleHelpClick}
                title="페이지 도움말"
            >
                <img
                    src={questionMarkIcon}
                    alt="Help Icon"
                    className="help-icon-image"
                />
            </div>

            {/* 도움말 이미지 오버레이 */}
            {showIntro && (
                <div className="intro-overlay" onClick={handleCloseIntro}>
                    <div className="intro-container">
                        <button className="arrow prev" onClick={handlePrevImage}>
                            {"<"}
                        </button>
                        <img
                            src={images[currentImageIndex]}
                            alt={`Intro Image ${currentImageIndex + 1}`}
                            className="intro-image"
                        />
                        <button className="arrow next" onClick={handleNextImage}>
                            {">"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HelpIcon;
