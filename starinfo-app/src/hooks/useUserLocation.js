// useUserLocation.js

import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthProvider";
import { getUserLocationFromProfile } from "../services/userLocationService";

function useUserLocation() {
    const defaultLocation = { latitude: 37.5665, longitude: 126.9780 };
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
                        setLocation(userLocation);
                        localStorage.setItem("userLocation", JSON.stringify(userLocation));
                    }
                } else {
                    setLocation(defaultLocation);
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
