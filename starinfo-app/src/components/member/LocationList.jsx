// LocationList.jsx

import React from 'react';

const LocationList = ({
                          locations,
                          descriptions,
                          favoriteLocationId, // 즐겨찾기 ID를 받아옴
                          onUpdateFavorite,
                          onDescriptionChange,
                          onSaveDescription,
                          onDelete,
                          onEdit
                      }) => {
    if (!locations || locations.length === 0) {
        return <p>저장된 위치가 없습니다.</p>;
    }

    return (
        <>
            {locations.map((location) => {
                const isFavorite = location.id === favoriteLocationId; // 즐겨찾기 판별
                return (
                    <div key={location.id} className="location-item">
                        <p>위도: {location.latitude}, 경도: {location.longitude}</p>
                        <p>설명: {location.description || '위치 설명이 없습니다.'}</p>
                        {/* 즐겨찾기 여부 표시 */}
                        {isFavorite && (
                            <span style={{color: 'gold', fontWeight: 'bold'}}>
                                ★ 즐겨찾기 위치
                            </span>
                        )}
                        <button onClick={() => onUpdateFavorite(location.id)}>
                            이 위치를 즐겨찾기로 설정
                        </button>
                        <div className="description-input">
                            <input
                                type="text"
                                placeholder="위치 설명을 입력하세요"
                                value={descriptions[location.id] || ''}
                                onChange={(e) =>
                                    onDescriptionChange(location.id, e.target.value)
                                }
                            />
                            <button onClick={() => onSaveDescription(location.id)}>
                                설명 저장
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                console.log("Edit button clicked:", {
                                    id: location.id,
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    description: location.description,
                                });
                                onEdit(location.id, location.latitude, location.longitude, location.description);
                            }}
                        >
                            수정
                        </button>
                        <button
                            onClick={() => onDelete(location.id, isFavorite)} // 즐겨찾기 여부 전달
                            style={{
                                color: "red",
                                marginTop: "10px",
                                fontWeight: isFavorite ? "bold" : "normal", // 즐겨찾기 위치는 강조
                            }}
                        >
                            위치 삭제
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default LocationList;
