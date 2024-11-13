// useUserLocation.js

import { useState, useEffect } from 'react';
import { useAuth } from "../services/AuthProvider";
import { getUserLocationFromProfile } from "../services/userLocationService";

function useUserLocation() {
    const [location, setLocation] = useState({ latitude: 37.5665, longitude: 126.9780 }); // 기본값: 서울
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();  // 로그인 여부를 확인

    useEffect(() => {
        let isMounted = true; // 컴포넌트가 언마운트될 때 실행 방지

        // 로그인 여부 확인 후 위치 설정
        const fetchUserLocation = async () => {
            if (isAuthenticated) {
                const userLocation = getUserLocationFromProfile(); // 사용자 테이블에서 위치를 가져오는 함수
                if (userLocation && isMounted) {
                    setLocation(userLocation);
                }
            } else {
                // 로그인하지 않았을 때는 서울로 위치 고정
                setLocation({ latitude: 37.5665, longitude: 126.9780 });
            }
            setIsLoading(false);
        };

        if (isLoading) {
            fetchUserLocation().then(() => {
                console.log('사용자 저장 위치로 요청 성공');
            }).catch((error) => {
                console.error('Error fetching user location:', error);
            });
        }

        return () => {
            isMounted = false; // 컴포넌트가 언마운트되었을 때 업데이트 방지
        };
    }, [isAuthenticated, isLoading]);

    return { location, isLoading };
}

export default useUserLocation;