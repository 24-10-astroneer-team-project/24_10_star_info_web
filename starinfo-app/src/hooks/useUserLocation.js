// useUserLocation.js

import { useState, useEffect } from 'react';
import { useAuth } from "../services/AuthProvider";
import {getUserLocationFromProfile} from "../services/userLocationService";

function useUserLocation() {
    const [location, setLocation] = useState({ latitude: 37.5665, longitude: 126.9780 }); // 기본값: 서울
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();  // 로그인 여부를 확인

    useEffect(() => {
        // 로그인 여부 확인 후 위치 설정
        if (isAuthenticated) {
            // 사용자가 설정한 위치 가져오기
            const userLocation = getUserLocationFromProfile(); // 사용자 테이블에서 위치를 가져오는 함수
            if (userLocation) {
                setLocation(userLocation);
            }
        } else {
            // 로그인하지 않았을 때는 서울로 위치 고정
            setLocation({ latitude: 37.5665, longitude: 126.9780 });
        }
        setIsLoading(false);
    }, [isAuthenticated]); // isAuthenticated가 변경될 때마다 실행

    return { location, isLoading };
}

export default useUserLocation;