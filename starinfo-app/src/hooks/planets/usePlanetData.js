// usePlanetData.js

import { useState, useEffect } from "react";
import axios from "axios";

const usePlanetData = ({ planetName, latitude, longitude, startDate, rangeDays }) => {
    const [planetData, setPlanetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanetData = async () => {
            try {
                setLoading(true);
                const url = `/planet/visibility`; // 백엔드 Planet API 엔드포인트
                const response = await axios.get(url, {
                    params: {
                        planetName,
                        latitude,
                        longitude,
                        startDate,
                        rangeDays,
                    },
                });
                setPlanetData(response.data); // 데이터 상태 업데이트
                console.log(`행성 데이터 가져옴 : ${response.data}`);
            } catch (err) {
                setError(err); // 에러 상태 업데이트
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchPlanetData();
    }, [planetName, latitude, longitude, startDate, rangeDays]);

    return { planetData, loading, error };
};

export default usePlanetData;
