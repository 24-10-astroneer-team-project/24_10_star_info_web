import React from 'react';
import './css/FavoriteLocationPopup.css';

function FavoriteLocationPopup({ locationDescription, constellations, onClose }) {
    return (
        <div className="favorite-location-popup">
            <div className="popup-content">
                <h2>즐겨찾기한 위치 정보</h2>
                <p>설명: {locationDescription}</p>
                <p>해당 위치에서 가장 잘 보이는 별자리 데이터:</p>
                {constellations.length > 0 ? (
                    constellations.map((constellation, index) => (
                        <div key={index} className="constellation-entry">
                            <strong>날짜:</strong> {constellation.date} <br />
                            <strong>별자리:</strong> {constellation.constellation} <br />
                            <strong>최고 고도:</strong> {constellation.max_altitude} <br />
                            <strong>최고 가시 시간:</strong> {constellation.best_visibility_time} <br />
                            <strong>방향:</strong> {constellation.azimuth}
                            <hr /> {/* 구분선 */}
                        </div>
                    ))
                ) : (
                    <p>별자리 데이터가 없습니다.</p>
                )}
                <button className="close-button" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}

export default FavoriteLocationPopup;
