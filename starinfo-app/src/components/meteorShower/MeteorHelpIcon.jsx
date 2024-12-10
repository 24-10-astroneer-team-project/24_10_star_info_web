import React, { useState } from 'react';
import './MeteorHelpIcon.css';
import questionMarkIcon from '../layout/asset/question_mark_icon.png';
import introImage1 from '../layout/asset/meteorshowerpage.png';

const MeteorHelpIcon = () => {
    const [showIntro, setShowIntro] = useState(false); // Intro 이미지 표시 상태

    const handleHelpClick = () => {
        setShowIntro(true); // 도움말 아이콘 클릭 시 Intro 이미지 표시
    };

    const handleCloseIntro = () => {
        setShowIntro(false); // Intro 이미지 닫기
    };

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
                        {/* 화살표 버튼 제거 */}
                        <img
                            src={introImage1}
                            alt="Intro Image"
                            className="intro-image"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MeteorHelpIcon;
