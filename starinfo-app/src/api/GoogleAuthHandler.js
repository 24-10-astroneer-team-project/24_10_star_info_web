// GoogleAuthHandler.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios를 사용하여 백엔드와 통신
import { toast } from "react-toastify";

const GoogleAuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // 서버에서 사용자 인증 상태 확인
                const response = await axios.get("/api/auth/check", {
                    withCredentials: true, // 쿠키 전송 허용
                });

                const { isNewUser } = response.data.userInfo; // `userInfo`에서 가져오기
                console.log("Authentication response:", response.data);

                // 첫 로그인 여부에 따라 리디렉션
                if (isNewUser) {
                    toast.success("🎉 첫 로그인! 환영합니다! 사이트의 원활한 이용을 위해서 위치 설정, 위치정보 즐겨찾기 설정을 해주세요! 🎉", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    navigate("/react/map"); // 첫 사용자 설정 페이지로 리디렉션
                } else {
                    toast.info("👋 다시 만나서 반갑습니다! 👋", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    navigate("/react/main");
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                navigate("/login"); // 인증 실패 시 로그인 페이지로 리디렉션
            }
        };

        checkAuthentication();
    }, [navigate]);

    return <div>Authenticating...</div>; // 로딩 화면 또는 처리 중 메시지
};

export default GoogleAuthHandler;
