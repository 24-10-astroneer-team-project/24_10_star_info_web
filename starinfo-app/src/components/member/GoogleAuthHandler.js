// GoogleAuthHandler.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // JWT 디코딩을 위한 라이브러리
import { toast } from "react-toastify";

const GoogleAuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get("accessToken");
        const refreshToken = queryParams.get("refreshToken");

        if (accessToken && refreshToken) {
            try {
                // JWT 디코딩
                const decodedToken = jwtDecode(accessToken);
                const isNewUser = decodedToken.isNewUser || false; // JWT에서 isNewUser 값 추출
                console.log("Decoded JWT:", decodedToken);

                // 로컬스토리지에 저장
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                console.log("Tokens saved successfully");

                // 첫 로그인 여부 확인 후 리디렉션
                if (isNewUser) {
                    toast.success("🎉 첫 로그인! 환영합니다! 사이트의 원활한 이용을 위해서 위치 설정, 위치정보 즐겨찾기 설정을 해주세요! (위치 저장 페이지로 이동합니다.) 🎉", {
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
                console.error("Failed to decode JWT or handle authentication:", error);
                navigate("/login"); // JWT 디코딩 실패 시 로그인 페이지로 리디렉션
            }
        } else {
            console.error("Required tokens are missing in query params");
            navigate("/login"); // 인증 실패 시 로그인 페이지로 리디렉션
        }
    }, [navigate]);

    return <div>Authenticating...</div>; // 로딩 화면 또는 처리 중 메시지
};

export default GoogleAuthHandler;
