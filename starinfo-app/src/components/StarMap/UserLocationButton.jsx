import React, { useState, useEffect } from 'react';
import './css/UserLocationButton.css';
import { useAuth } from '../../services/AuthProvider';
import useUserLocation from '../../hooks/useUserLocation';
import useWeather from '../../hooks/weather/useWeather';
import FavoriteLocationPopup from './FavoriteLocationPopup';

function UserLocationButton({ constellationData }) {
    const { isAuthenticated, user } = useAuth();
    const { location } = useUserLocation();
    const { cityName } = useWeather(location, isAuthenticated); // cityName 가져오기
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // 로그인 상태가 아닐 때
    if (!isAuthenticated) {
        return (
            <div className="user-location-container">
                <p className="login-message">로그인을 해주세요</p>
<button className="go-button" onClick={handleOpenPopup}>→</button>
            </div>
	
        );
    }

    // 로그인 상태일 경우 즐겨찾기 위치 정보 및 사용자 닉네임 표시
    return (
        <>
        <div className="user-location-container">
            <p className="user-info">
                <strong>{user.nickname}</strong>님의 현재 선호 위치:
            </p>
            <div className="location-info">
                <p>동네: {cityName || '정보 없음'}</p> {/* cityName 표시 */}
                <p>설명: {location?.description ? location.description : '설명 없음'}</p> {/* 설명 표시 */}
            <button className="go-button" onClick={handleOpenPopup}>→</button>
        </div>
        </div>
    {
        showPopup && (
            <FavoriteLocationPopup
                locationDescription={location.description || '정보 없음'}
                constellations={constellationData.constellations || []} // StarMap에서 전달받은 데이터 그대로 전달
                    onClose={handleClosePopup}
                />
            )}
        </>
    );
}
export default UserLocationButton;
