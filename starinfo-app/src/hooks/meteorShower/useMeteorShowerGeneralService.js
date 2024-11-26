// hooks/useMeteorShowerGeneralService.js

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useMeteorShowerGeneralService() {
    const [generalMeteorData, setGeneralMeteorData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const comets = ["Swift-Tuttle", "Halley", "Tuttle"]; // 조회할 혜성 목록

    useEffect(() => {
        // 현재 연도의 1월 1일로 시작 날짜 설정
        const startDate = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-CA');  // 'YYYY-MM-DD' 형식으로 변환

        const fetchGeneralMeteorData = async () => {
            setDataLoading(true);
            try {
                const responses = await Promise.all(
                    comets.map((cometName) =>
                        axios
                            .get(`/meteorShower/general`, {
                                params: {
                                    cometName,
                                    startDate: startDate,
                                },
                            })
                            .then((response) => ({ cometName, data: response.data }))
                            .catch((error) => {
                                console.error(`Error fetching data for ${cometName}:`, error);
                                throw error; // 에러 전파
                            })
                    )
                );

                const allData = responses.map(({ cometName, data }) => ({
                    cometName,
                    data,
                }));

                console.log("Parsed General Meteor Shower Data:", allData);

                setGeneralMeteorData(allData);
            } catch (error) {
                console.error("Error fetching general meteor shower data:", error);
                toast.error("대중적인 유성우 데이터를 가져오는 중 오류가 발생했습니다.", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setFetchError(error);
            } finally {
                setDataLoading(false);
            }
        };

        fetchGeneralMeteorData();
    }, []); // 페이지 접근 시 한 번만 실행되도록 빈 배열 의존성 추가

    return { generalMeteorData, dataLoading, fetchError };
}

export default useMeteorShowerGeneralService;
