// services/LocationService.js

import api from './api';

const baseUrl = 'http://localhost:7777/api';

export const sendLocationToServer = async (locationData) => {
    try {
        // 전송할 locationData 로그로 출력
        console.log('Sending location data to server:', locationData);

        const response = await api.post(`${baseUrl}/location/save`, locationData);

        // 응답 데이터를 로그로 출력
        console.log('Server response:', response.data);

        return response.data; // 성공한 경우 응답 데이터 반환
    } catch (error) {
        // 에러 로그 출력
        console.error('Error sending location to server:', error);

        throw error; // 에러를 캐치하고 다시 던져주어 상위에서 핸들링 할 수 있게 함
    }
};