// useUserLocation.js

import { useEffect, useRef, useState } from 'react';
import { useAuth } from "../services/AuthProvider";
import { getUserLocationFromProfile } from "../services/userLocationService";
import { useNavigate } from 'react-router-dom';

function useUserLocation() {
    const [location, setLocation] = useState(() => {
        // 컴포넌트 마운트 시 Local Storage에서 위치 데이터 로드
        const savedLocation = localStorage.getItem('userLocation');
        return savedLocation ? JSON.parse(savedLocation) : null; // 초기값을 Local Storage에서 가져옴
    });
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, user, isAuthLoading } = useAuth();
    const isMountedRef = useRef(true);
    const navigate = useNavigate();

    // 기본 위치를 사용할 때 도시 이름도 설정하도록 추가
    const [cityName, setCityName] = useState(() => {
        // 초기 값이 없는 경우 Unknown City로 설정
        const savedLocation = localStorage.getItem('userLocation');
        return savedLocation ? JSON.parse(savedLocation).cityName || 'Unknown City' : 'Unknown City';
    });

    useEffect(() => {
        const fetchUserLocation = async () => {
            if (isAuthLoading) {
                console.log("useUserLocation - 인증 로딩 중입니다. 로딩 대기...");
                return;
            }

            try {
                console.log('useUserLocation - 로그인 상태 확인:', isAuthenticated, '사용자 정보:', user);

                // 인증된 사용자인 경우
                if (isAuthenticated && user?.userId) {
                    console.log('useUserLocation - 로그인된 사용자입니다. 사용자 프로필에서 위치 정보 가져오기...');
                    console.log(`userId: ${user.userId}`);
                    const userLocation = await getUserLocationFromProfile(user.userId);

                    if (userLocation) {
                        // 현재 location과 가져온 userLocation이 다른 경우에만 업데이트
                        if (!location || location.latitude !== userLocation.latitude || location.longitude !== userLocation.longitude) {
                            setLocation(userLocation);
                            setCityName(userLocation.cityName || 'Unknown City'); // 사용자 위치의 도시 이름 설정
                            localStorage.setItem('userLocation', JSON.stringify(userLocation)); // 사용자 위치를 Local Storage에 저장
                            console.log('useUserLocation - 사용자 저장 위치로 요청 성공:', userLocation);
                        } else {
                            console.log('useUserLocation - 사용자 위치가 이미 설정되어 있습니다.');
                        }
                    } else {
                        console.log('useUserLocation - 사용자 위치 정보가 없습니다.');
                    }
                }

                // 인증되지 않은 경우, Local Storage에서 위치 데이터 제거
                if (!isAuthenticated) {
                    console.log('useUserLocation - 로그인하지 않음. 기본 위치(서울) 사용 및 저장된 위치 제거');
                    localStorage.removeItem('userLocation'); // Local Storage에서 사용자 위치 제거
                    const defaultLocation = { latitude: 37.5665, longitude: 126.9780, cityName: "Seoul" };
                    setLocation(defaultLocation);
                    setCityName("Seoul"); // 기본 위치로 설정할 때 도시 이름 설정
                }

            } catch (error) {
                console.error('useUserLocation - 사용자 위치 가져오기 오류:', error);
            } finally {
                if (isMountedRef.current) {
                    setIsLoading(false);
                    console.log('useUserLocation - 로딩 상태 완료');
                }
            }
        };

        fetchUserLocation();

        return () => {
            isMountedRef.current = false;
            console.log('useUserLocation - 컴포넌트가 언마운트되었습니다.');
        };
    }, [isAuthenticated, user?.userId, isAuthLoading]); // 의존성 배열 명확히 설정

    return { location, cityName, isLoading };
}

export default useUserLocation;
