// services/LocationService.js

import axiosInstance from '../api/axiosInstance'; // axiosInstance 임포트

const baseUrl = '/api';

export const sendLocationToServer = async (locationData, isEditing = false) => {
    try {
        const endpoint = isEditing ? `${baseUrl}/location/edit` : `${baseUrl}/location/save`; // 엔드포인트 선택
        console.log(`${isEditing ? 'Editing' : 'Saving'} location data to server:`, locationData);

        const payload = isEditing
            ? { locationId: locationData.id, ...locationData } // 수정 시 locationId 포함
            : locationData; // 저장 시 그대로 전송

        // 요청 메서드 선택
        const response = isEditing
            ? await axiosInstance.put(endpoint, payload)
            : await axiosInstance.post(endpoint, payload);

        console.log('Server response:', response.data); // 응답 데이터 로그 출력
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('Error sending location to server:', error);
        throw error; // 에러를 상위로 전달
    }
};
