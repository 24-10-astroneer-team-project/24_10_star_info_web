import React, { useState, useEffect, useRef } from 'react';
import './css/ConstellationPopup.css';
import deimg from '../layout/con_icon/detail.png';
import ApiLLPopup from './ApiLLPopup';
import { loadCoordinates } from '../storage';

const icons = require.context('../layout/con_icon', false, /\.png$/);
const constellationImages = require.context('../layout/con_img', false, /\.png$/);
const constellationImages2 = require.context('../layout/con_img2', false, /\.png$/);

const constellationDescriptions = {
    pegasus: {
        name: 'Pegasus',
        name_k: '페가수스자리',
        text_constellation: '페가수스는 히히힝',
        ra: '22h 37m',
        starCount: '9, 17',
        brightestStar: 'Enif (ε Peg , 2.38 등급)',
        nearestStar: 'ι Peg (38 광년)',
        season: '가을철',
        viewable: 'O(항상 관측 가능)'
    },
    orion: {
        name: 'Orion',
        name_k: '오리온자리',
        text_constellation: '그리스의 오리온 멋져요오옷',
        ra: '5h 34m',
        starCount: '7',
        brightestStar: 'Rigel (β Ori, 0.12 등급)',
        nearestStar: 'GJ 3379 (17 광년)',
        season: '겨울철',
        viewable: 'O'
    }
};


const ConstellationPopup = ({ constellationId, isVisible, closePopup }) => {
    const [activeTab, setActiveTab] = useState('legend');
    const [fade, setFade] = useState(false);
    const [showApiLLPopup, setShowApiLLPopup] = useState(false);
    const popupRef = useRef(null);
    const [popupStyle, setPopupStyle] = useState({}); // 위치 조정을 위한 스타일 상태

    const {
        name = '',
        name_k = '',
        text_constellation = '',
    } = constellationDescriptions[constellationId] || {};

    const rightIconPath = name ? icons(`./${name}.png`) : null;
    const constellationImagePath = name ? constellationImages(`./${name}.png`) : null;
    const constellationInfoImagePath = name ? constellationImages2(`./${name}.png`) : null;

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setFade(true);
            setTimeout(() => {
                setActiveTab(tab);
                setFade(false);
            }, 300);
        }
    };

    const handleIconClick = () => {
        setShowApiLLPopup(!showApiLLPopup);
    };

    const closeApiLLPopup = () => {
        setShowApiLLPopup(false);
    };

    const coordinates = loadCoordinates();

    useEffect(() => {
        if (popupRef.current && showApiLLPopup) {
            const rect = popupRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setPopupStyle({
                top: `${centerY}px`,
                left: `${centerX}px`,
                transform: 'translate(-50%, -50%)',
            });
        }
    }, [showApiLLPopup]);

    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    // Add event listener for Esc key to close the popup
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isVisible) {
                closePopup();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, closePopup]);

    return isVisible ? (
        <>
            <div className="popup-container" ref={popupRef}>
                <div className="name">{name}</div>
                <div className="header-popup">
                    <div className="icon-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img src={deimg} alt="detail icon" className="detail_icon" onClick={handleIconClick} />
                        {showTooltip && (
                            <div className="tooltip">
                                입력한 선호 위치에 따른 별자리 관측 정보를 볼 수 있습니다.
                            </div>
                        )}
                    </div>
                    <div className="name_k">{name_k}</div>
                    {rightIconPath && <img src={rightIconPath} alt={`${name} icon`} className="con_icon" />}
                </div>
                <hr />
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'legend' ? 'active' : ''}
                        onClick={() => handleTabChange('legend')}
                    >
                        별자리 전설
                    </button>
                    <button
                        className={activeTab === 'info' ? 'active' : ''}
                        onClick={() => handleTabChange('info')}
                    >
                        별자리 정보
                    </button>
                </div>
                <div className={`content-container ${fade ? 'fade-out' : 'fade-in'}`}>
                    {activeTab === 'legend' ? (
                        <>
                            <div className="image-container">
                                {constellationImagePath && (
                                    <img src={constellationImagePath} alt={`${name} constellation`} className="con_image" />
                                )}
                            </div>
                            <div className="text_constellation">{text_constellation}</div>
                        </>
                    ) : (
                        <>
                            <div className="image-container">
                                {constellationInfoImagePath && (
                                    <img src={constellationInfoImagePath} alt={`${name} constellation map`} className="con_image" />
                                )}
                            </div>
                            <div className="constellation-info">
                                <p>적경: {constellationDescriptions[constellationId]?.ra}</p>
                                <p>주요 별 수: {constellationDescriptions[constellationId]?.starCount}</p>
                                <p>가장 밝은 별: {constellationDescriptions[constellationId]?.brightestStar}</p>
                                <p>가장 가까운 별: {constellationDescriptions[constellationId]?.nearestStar}</p>
                                <p>관측 시기: {constellationDescriptions[constellationId]?.season}</p>
                                <p>관측 가능 여부: {constellationDescriptions[constellationId]?.viewable}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ApiLL Popup */}
            {showApiLLPopup && (
                <ApiLLPopup
                    isVisible={showApiLLPopup}
                    coordinates={coordinates}
                    constellationName={name_k}
                    closePopup={closeApiLLPopup}
                    parentRef={popupRef}
                    style={popupStyle} // 전달된 스타일 적용
                />
            )}
        </>
    ) : null;
};

export default ConstellationPopup;
