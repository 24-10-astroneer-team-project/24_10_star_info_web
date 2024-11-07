// services/LocationService.js

import api from './api';

const baseUrl = 'http://localhost:7777/api';

export const sendLocationToServer = async (locationData) => {
    try {
        const response = await api.post(`${baseUrl}/location`, locationData);
        return response.data; // 성공한 경우 응답 데이터 반환
    } catch (error) {
        console.error('Error sending location to server:', error);
        throw error; // 에러를 캐치하고 다시 던져주어 상위에서 핸들링 할 수 있게 함
    }
};