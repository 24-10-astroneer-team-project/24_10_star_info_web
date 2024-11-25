// hooks/useMeteorShowerService.js

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useMeteorShowerService() {
    const [meteorData, setMeteorData] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();

    const fetchMeteorData = async (meteorName, location) => {
        if (!meteorName || !location) return;

        setDataLoading(true);
        try {
            const currentYear = new Date().getFullYear();

            // 위도와 경도를 1도 간격으로 반올림 처리
            const roundedLatitude = Math.round(location.latitude);
            const roundedLongitude = Math.round(location.longitude);

            const response = await axios.get(`/meteorShower/visibility`, {
                params: {
                    meteorShowerName: meteorName,
                    year: currentYear,
                    latitude: roundedLatitude,
                    longitude: roundedLongitude,
                },
            });

            setMeteorData(response.data);
        } catch (error) {
            console.error(`Error fetching data for ${meteorName}:`, error);
            toast.error("유성우 데이터를 가져오는 중 오류가 발생했습니다. 404 페이지로 이동합니다...", {
                position: "top-center",
                autoClose: 3000,
            });
            // setTimeout(() => {
            //     navigate('/react/404');
            // }, 3000);
            setFetchError(error);
        } finally {
            setDataLoading(false);
        }
    };

    return { meteorData, dataLoading, fetchError, fetchMeteorData };
}

export default useMeteorShowerService;
