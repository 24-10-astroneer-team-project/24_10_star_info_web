// userLocationService.js

import axiosInstance from '../api/axiosInstance';

export const getUserLocationFromProfile = async (userId) => {

    try {
        // 백엔드에서 사용자 프로필 데이터 가져오기
        const response = await axiosInstance.get(`/api/member/${userId}`);

        // API 응답 확인
        console.log('API Response:', response.data);

        if (response.data && response.data.locations && response.data.locations.length > 0) {
            // 즐겨찾기 위치 ID 확인
            console.log('Favorite Location ID:', response.data.favoriteLocationId);

            const favoriteLocation = response.data.locations.find(loc => loc.id === response.data.favoriteLocationId);

            // 찾은 즐겨찾기 위치 확인
            console.log('Favorite Location:', favoriteLocation);

            if (favoriteLocation) {
                return {
                    latitude: favoriteLocation.latitude,
                    longitude: favoriteLocation.longitude,
                    description: favoriteLocation.description,
                };
            }
        }

        // 즐겨찾기 위치가 없거나 설정되지 않았을 경우 null 반환
        return null;
    } catch (err) {
        console.error('Error fetching user location from profile:', err);
        return null; // 오류가 발생하면 null을 반환
    }
};