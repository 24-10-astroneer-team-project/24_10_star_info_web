// services/LocationService.js

import api from './api';

const baseUrl = 'http://localhost:7777/api';

export const sendLocationToServer = async (locationData, isEditing = false) => {
    const accessToken = localStorage.getItem("accessToken"); // Access Token 가져오기

    if (!accessToken) {
        console.error('Access token is missing. User must be logged in.');
        throw new Error('로그인이 필요합니다.');
    }

    try {
        const endpoint = isEditing ? `${baseUrl}/location/edit` : `${baseUrl}/location/save`; // 엔드포인트 선택
        console.log(`${isEditing ? 'Editing' : 'Saving'} location data to server:`, locationData);

        const payload = isEditing
            ? { locationId: locationData.id, ...locationData } // 수정 시 locationId 포함
            : locationData; // 저장 시 그대로 전송

        // 요청 메서드 선택
        const response = isEditing
            ? await api.put(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
                },
            })
            : await api.post(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
                },
            });

        console.log('Server response:', response.data); // 응답 데이터 로그 출력
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('Error sending location to server:', error);
        throw error; // 에러를 상위로 전달
    }
};
