import React, {useState} from 'react';
import './css/UserLocationButton.css';
import {useAuth} from '../../services/AuthProvider';
import useUserLocation from '../../hooks/useUserLocation';
import useWeather from '../../hooks/weather/useWeather';
import FavoriteLocationPopup from './FavoriteLocationPopup';
import closeIcon from '../layout/asset/close_icon.png'; // 닫기 아이콘 경로
import starIcon from '../layout/asset/star_icon.png'; // 최소화 팝업창 아이콘 경로

function UserLocationButton({constellationData}) {
    const [isMinimized, setIsMinimized] = useState(false); // 최소화 상태 관리
    const {isAuthenticated, user} = useAuth();
    const {location} = useUserLocation();
    const { cityName, weatherLoading } = useWeather(location, null); // cityName 가져오기
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized); // 최소화 상태 변경
    };

    // 로그인 상태가 아닐 때
    if (!isAuthenticated) {
        return (
            <div className="user-location-container">
                <p className="login-message">로그인을 해주세요.</p>
                <button className="go-button" onClick={handleOpenPopup}>→</button>
            </div>

        );
    }

    if (isMinimized) {
        return (
            <div className="user-location-container minimized" onClick={toggleMinimize}
                 title="클릭하면 팝업창이 최소화가 해제됩니다.">
                {/* 최소화된 상태에서 아이콘 추가 */}
                <img
                    src={starIcon}
                    alt="스타 아이콘"
                    className="star-icon"
                />
            </div>
        );
    }

    // 로그인 상태일 경우 즐겨찾기 위치 정보 및 사용자 닉네임 표시
    return (
        <>
            <div className="user-location-container">
                {/* 닫기 아이콘 */}
                <img
                    src={closeIcon}
                    alt="닫기"
                    className="close-icon"
                    onClick={toggleMinimize}
                    title="클릭하면 팝업창이 최소화됩니다."
                />
                <p className="user-info">
                    <strong>{user?.nickname || '사용자'}</strong>님의 현재 선호 위치:
                </p>
                <div className="location-info">
                    <p>지역: {cityName || '정보 없음'}</p>
                    <p>설명: {location?.description || '정보 없음'}</p>
                    <button className="go-button" onClick={handleOpenPopup}
                            title="선호위치에서의 별자리 관측정보를
                            볼 수 있습니다.">→</button>
                </div>
            </div>
            {showPopup && (
                <FavoriteLocationPopup
                    locationDescription={location?.description || '정보 없음'}
                    constellations={constellationData.constellations || []} // StarMap에서 전달받은 데이터 그대로 전달
                    onClose={handleClosePopup}
                />
            )}
        </>
    );
}

export default UserLocationButton;
