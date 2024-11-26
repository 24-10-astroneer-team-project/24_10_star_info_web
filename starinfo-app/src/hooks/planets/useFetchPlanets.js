// useFetchPlanets.js

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useFetchPlanets(location, isLoading) {
    const [planetData, setPlanetData] = useState({});
    const [dataLoading, setDataLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading || !location) return;

        const today = new Date().toISOString().split("T")[0];
        const rangeDays = "7";
        const planetsApi = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

        const fetchAllPlanets = async () => {
            setDataLoading(true);
            try {
                const responses = await Promise.all(
                    planetsApi.map((planet) =>
                        axios
                            .get(`/planet/visibility`, {
                                params: {
                                    planetName: planet,
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    date: today,
                                    rangeDays,
                                },
                            })
                            .then((response) => ({ planet, data: response.data }))
                            .catch((error) => {
                                console.error(`Error fetching data for ${planet}:`, error);
                                throw error; // 에러 전파
                            })
                    )
                );

                const allData = responses.reduce((acc, { planet, data }) => {
                    acc[planet] = data;
                    return acc;
                }, {});

                setPlanetData(allData);
            } catch (error) {
                console.error("Error fetching all planet data:", error);
                toast.error("행성 데이터를 가져오는 중 오류가 발생했습니다. 404 페이지로 이동합니다...", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    navigate('/react/404');
                }, 3000);
                setFetchError(error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchAllPlanets();
    }, [location, isLoading, navigate]);

    return { planetData, dataLoading, fetchError };
}

export default useFetchPlanets;
