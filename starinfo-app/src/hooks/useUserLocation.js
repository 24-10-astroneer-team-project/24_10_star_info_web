// useUserLocation.js

import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../services/AuthProvider";
import { getUserLocationFromProfile } from "../services/userLocationService";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function useUserLocation() {
    const [location, setLocation] = useState({ latitude: 37.5665, longitude: 126.9780 }); // 기본값: 서울
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, user, isAuthLoading } = useAuth(); // AuthProvider의 isAuthLoading 추가
    const isMountedRef = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        isMountedRef.current = true;

        const fetchUserLocation = async () => {
            if (isAuthLoading) {
                return;
            }

            try {
                if (isMountedRef.current) {
                    console.log('useUserLocation - 로그인 상태 확인:', isAuthenticated, '사용자 정보:', user);

                    if (isAuthenticated && user?.userId) {
                        console.log('useUserLocation - 로그인된 사용자입니다. 사용자 프로필에서 위치 정보 가져오기...');
                        const userLocation = await getUserLocationFromProfile(user.userId);

                        if (userLocation && isMountedRef.current) {
                            setLocation(userLocation);
                            console.log('useUserLocation - 사용자 저장 위치로 요청 성공:', userLocation);
                        } else if (isMountedRef.current) {
                            console.log('useUserLocation - 사용자 위치 정보가 없습니다. 기본 위치(서울) 사용합니다.');
                        }
                    } else if (isMountedRef.current) {
                        console.log('useUserLocation - 로그인하지 않음. 기본 위치(서울) 사용');
                    }
                }
            } catch (error) {
                if (isMountedRef.current) {
                    console.error('useUserLocation - 사용자 위치 가져오기 오류:', error);
                }
            } finally {
                if (isMountedRef.current) {
                    setIsLoading(false);
                    console.log('useUserLocation - 로딩 상태 완료');
                }
            }
        };

        fetchUserLocation().then(() => {
            console.log("fetchUserLocation 완료");
        }).catch(error => {
            console.error('fetchUserLocation 실패:', error);
        });

        return () => {
            isMountedRef.current = false;
            console.log('useUserLocation - 컴포넌트가 언마운트되었습니다.');
        };
    }, [isAuthenticated, user, isAuthLoading]); // isAuthLoading 추가

    return { location, isLoading };
}

export default useUserLocation;