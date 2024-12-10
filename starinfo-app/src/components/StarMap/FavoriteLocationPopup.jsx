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

    const getKoreanConstellation = (constellation) => {
        const constellations = {
            Tau: "황소자리",
            Ori: "오리온자리",
            Leo: "사자자리",
            Cnc: "게자리",
            Gem: "쌍둥이자리",
            Vir: "처녀자리",
            Lib: "천칭자리",
            Sco: "전갈자리",
            Oph: "뱀주인자리",
            Sgr: "궁수자리",
            Cap: "염소자리",
            Aqr: "물병자리",
            Psc: "물고기자리",
            Ari: "양자리",
        };
        return constellations[constellation] || constellation;
    };

    const getKoreanDirection = (azimuth) => {
        const directions = {
            West: "서쪽",
            East: "동쪽",
            North: "북쪽",
            South: "남쪽",
            Southwest: "남서쪽",
            Southeast: "남동쪽",
            Northwest: "북서쪽",
            Northeast: "북동쪽",
        };
        return directions[azimuth] || azimuth;
    };

    return (
        <div className="favorite-location-popup" onClick={handleOverlayClick}>
            <div className="popup-content" onClick={handlePopupClick}>
                {/* 닫기 버튼 추가 */}
                <button className="popup-close-button" onClick={onClose}>
                    ✕
                </button>
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
                                <td>{getKoreanConstellation(data.constellation)}</td>
                                <td>{data.max_altitude}</td>
                                <td>{getKoreanDirection(data.azimuth)}</td>
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
