import React, { useEffect, useState } from 'react';
import './ApiLLPopup.css';

const ApiLLPopup = ({ isVisible, coordinates, constellationName, closePopup, parentRef }) => {
    const [positionStyle, setPositionStyle] = useState({});

    const calculatePopupPosition = () => {
        if (parentRef?.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            const parentCenterX = parentRect.x + parentRect.width / 2;
            const parentCenterY = parentRect.y + parentRect.height / 2;

            setPositionStyle({
                position: 'absolute',
                top: `${parentCenterY}px`, // 부모 팝업창의 세로 중앙
                left: `${parentCenterX}px`, // 부모 팝업창의 가로 중앙
                transform: 'translate(-50%, -50%)',
                width: `${parentRect.width * 0.5}px`, // 팝업창 크기: 부모 팝업창의 크기에 비례
                maxWidth: '300px', // 최대 크기 제한
                minWidth: '150px', // 최소 크기 제한
            });
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closePopup();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
            calculatePopupPosition(); // 팝업 열릴 때 위치 계산
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, closePopup]);

    useEffect(() => {
        const handleResize = () => {
            if (isVisible) {
                calculatePopupPosition(); // 화면 크기 변경 시 위치 업데이트
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isVisible, parentRef]); // 팝업 가시성 및 부모 참조 변경 시 효과 적용

    if (!isVisible) return null;

    return (
        <div className="api-ll-popup-container" style={positionStyle}>
            <h3>{constellationName}</h3>
            <div className="l_w">위도: </div>
            <div className="l_g">경도: </div>
            <hr />
        </div>
    );
};

export default ApiLLPopup;
