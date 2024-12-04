// useUserLocation.js

import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthProvider";
import { getUserLocationFromProfile } from "../services/userLocationService";

function useUserLocation() {
    const defaultLocation = { latitude: 37.5665, longitude: 126.9780, description: "서울" };
    const [location, setLocation] = useState(null); // 초기값 제거
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, user, isAuthLoading } = useAuth();

    useEffect(() => {
        if (isAuthLoading) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUserLocation = async () => {
            try {
                if (isAuthenticated && user?.userId) {
                    const userLocation = await getUserLocationFromProfile(user.userId, { signal });

                    if (!signal.aborted && userLocation) {
                        // 즐겨찾기 위치가 없거나 즐겨찾기 ID가 0일 경우 기본값 설정
                        if (
                            !userLocation.latitude ||
                            !userLocation.longitude ||
                            userLocation.favoriteLocationId === 0
                        ) {
                            console.warn("No favorite location found or favoriteLocationId is 0. Setting default location.");
                            setLocation(defaultLocation);
                            localStorage.setItem("userLocation", JSON.stringify(defaultLocation));
                        } else {
                            setLocation(userLocation); // 정상 위치 설정
                            localStorage.setItem("userLocation", JSON.stringify(userLocation));
                        }
                    } else {
                        console.warn("No userLocation found. Setting default location.");
                        setLocation(defaultLocation);
                        localStorage.setItem("userLocation", JSON.stringify(defaultLocation));
                    }
                } else {
                    console.warn("User not authenticated or no userId. Setting default location.");
                    setLocation(defaultLocation);
                    localStorage.setItem("userLocation", JSON.stringify(defaultLocation));
                }
            } catch (error) {
                console.error("Location fetch error:", error);
                setLocation(defaultLocation);
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        };


        fetchUserLocation();
        return () => controller.abort();
    }, [isAuthenticated, user, isAuthLoading]);

    return { location, isLoading };
}

export default useUserLocation;
