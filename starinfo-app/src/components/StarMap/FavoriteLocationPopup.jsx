import React from 'react';
import './css/FavoriteLocationPopup.css';
import gpsIcon from '../layout/asset/gps_icon.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/AuthProvider";

function FavoriteLocationPopup({ locationDescription, constellations, onClose }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleOverlayClick = () => {
        onClose();
    };

    const handleEditAddress = () => {
        if (user && user.userId) {
            navigate(`/react/member/${user.userId}`);
        } else {
            console.error("User is not logged in or user ID is missing.");
        }
    };

    // 별자리, 방향 데이터를 한글화 하는 함수
    const getKoreanConstellation = (constellation) => {
        if (constellation === "Tau") return "황소자리";
        if (constellation === "Ori") return "오리온자리";
        if (constellation === "Leo") return "사자자리";
        if (constellation === "Cnc") return "게자리";
        if (constellation === "Gem") return "쌍둥이자리";
        if (constellation === "Vir") return "처녀자리";
        if (constellation === "Lib") return "천칭자리";
        if (constellation === "Sco") return "전갈자리";
        if (constellation === "Oph") return "뱀주인자리";
        if (constellation === "Sgr") return "궁수자리";
        if (constellation === "Cap") return "염소자리";
        if (constellation === "Aqr") return "물병자리";
        if (constellation === "Psc") return "물고기자리";
        if (constellation === "Ari") return "양자리";

        return constellation; // 매칭되지 않으면 원래 값을 반환
    }; //별자리
    const getKoreanDirection = (azimuth) => {
        if (azimuth === "West") return "서쪽";
        if (azimuth === "East") return "동쪽";
        if (azimuth === "North") return "북쪽";
        if (azimuth === "South") return "남쪽";
        if (azimuth === "Southwest") return "남서쪽";
        if (azimuth === "Southeast") return "남동쪽";
        if (azimuth === "Northwest") return "북서쪽";
        if (azimuth === "Northeast") return "북동쪽";

        return azimuth; // 매칭되지 않으면 원래 값을 반환
    }; // 방향

    return (
        <div className="favorite-location-popup" onClick={handleOverlayClick}>
            <div className="popup-content" onClick={handlePopupClick}>
                <h2>현재 즐겨찾기된 위치 정보</h2>
                <div className="location-header">
                    <p className="location-description">위치 설명: {locationDescription}</p>
                    <a href="#" onClick={handleEditAddress} className="edit-button">
                        <img src={gpsIcon} alt="GPS Icon" className="gps-icon" />
                        주소 수정
                    </a>
                </div>
                <div className="table-wrapper">
                    <table className="constellation-table">
                        <thead>
                        <tr>
                            <th>날짜</th>
                            <th>별자리</th>
                            <th>최고 고도</th>
                            <th>방향</th>
                            <th>최적 관측 시간</th>
                        </tr>
                        </thead>
                        <tbody>
                        {constellations.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date}</td>
                                <td>{getKoreanConstellation(data.constellation)}</td> {/* 별자리 한글 변환 */}
                                <td>{data.max_altitude}</td>
                                <td>{getKoreanDirection(data.azimuth)}</td> {/* 방향 한글 변환 */}
                                <td>{data.best_visibility_time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FavoriteLocationPopup;
