// useSaveLocation.js

import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {sendLocationToServer} from "../services/LocationService";

function useSaveLocation() {
    const [locationSaved, setLocationSaved] = useState(false); // 위치 저장 상태
    const navigate = useNavigate();

    const saveLocation = async (userId, location) => {
        if (!userId || !location) return;

        console.log("Saving location to server...");
        try {
            const response = await sendLocationToServer({
                userId,
                latitude: location.latitude,
                longitude: location.longitude,
            });
            console.log("Location saved successfully:", response);
            setLocationSaved(true);
        } catch (error) {
            console.error("Error saving location:", error);

            // Toast 메시지 출력
            toast.error("위치 데이터를 저장하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.", {
                position: "top-center",
                autoClose: 3000,
            });

            // 에러 코드에 따라 리다이렉트 처리
            if (error.response && error.response.status === 404) {
                setTimeout(() => {
                    navigate('/react/404');
                }, 3000); // 3초 후 리다이렉트
            } else {
                toast.error("알 수 없는 오류가 발생했습니다.", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        }
    };

    return { saveLocation, locationSaved };
}

export default useSaveLocation;
