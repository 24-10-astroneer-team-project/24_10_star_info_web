// MemberDetail.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import './css/MemberDetail.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMemberDetail, updateFavoriteLocation, updateLocationDescription, deleteLocation } from './service/memberService';
import LocationList from '../member/LocationList';
import './css/StarCanvas.css'; // Star Canvas 관련 CSS 추가
import Head from "../layout/Head"; // 헤더 추가
import Foot from "../layout/Foot"; // 푸터 추가

function MemberDetail() {
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [memberDetail, setMemberDetail] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [descriptions, setDescriptions] = useState({});
    const [favoriteLocationId, setFavoriteLocationId] = useState(null); // 즐겨찾기 상태

    const handleEditLocation = (locationId, latitude, longitude, description) => {
        console.log("Navigating to edit location with:", {
            locationId,
            latitude,
            longitude,
            description,
            isEditing: true,
        });
        navigate('/react/map', {
            state: {
                from: location.pathname,
                locationId,
                latitude,
                longitude,
                description,
                isEditing: true,
            },
        });
    };

    useEffect(() => {
        const canvas = document.getElementById("space");
        const context = canvas.getContext("2d");
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const stars = [];
        const fps = 50;
        const numStars = 2000;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars(); // 창 크기가 변경될 때 별 재생성
        };

        const createStars = () => {
            stars.length = 0; // 기존 별 초기화
            for (let i = 0; i < numStars; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const length = Math.random() * 2 + 1;
                const opacity = Math.random();
                stars.push(new Star(x, y, length, opacity));
            }
        };

        window.addEventListener("resize", () => {
            resizeCanvas();
            createStars(); // 창 크기 변경 시 별 재생성
        });

        canvas.width = screenW;
        canvas.height = screenH;

        // 별 생성
        for (let i = 0; i < numStars; i++) {
            const x = Math.random() * screenW;
            const y = Math.random() * screenH;
            const length = Math.random() * 2 + 1;
            const opacity = Math.random();
            stars.push(new Star(x, y, length, opacity));
        }

        function Star(x, y, length, opacity) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.opacity = opacity;
            this.factor = 1;
            this.increment = Math.random() * 0.03;
        }

        resizeCanvas(); // 초기 호출
        window.addEventListener("resize", resizeCanvas); // 이벤트 리스너 등록

        Star.prototype.draw = function () {
            context.save();
            context.translate(this.x, this.y);

            if (this.opacity > 1) this.factor = -1;
            else if (this.opacity <= 0) this.factor = 1;
            this.opacity += this.increment * this.factor;

            context.beginPath();
            for (let i = 0; i < 5; i++) {
                context.lineTo(0, this.length);
                context.translate(0, this.length);
                context.rotate((Math.PI * 2) / 5);
                context.lineTo(0, -this.length);
                context.translate(0, -this.length);
                context.rotate(-(Math.PI * 4) / 5);
            }
            context.closePath();
            context.fillStyle = `rgba(255, 255, 200, ${this.opacity})`;
            context.shadowBlur = 5;
            context.shadowColor = '#ffff33';
            context.fill();
            context.restore();
        };

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
            stars.forEach((star) => star.draw());
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    useEffect(() => {
        if (location.state?.fromSaveLocation) {
            toast.success("위치 정보가 성공적으로 저장되었습니다!");
        }

        const fetchDetail = async () => {
            try {
                const response = await fetchMemberDetail(userId);

                setMemberDetail(response.data); // 사용자 정보 설정
                setFavoriteLocationId(response.data.favoriteLocationId); // 즐겨찾기 ID 설정
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchDetail();
    }, [userId, location.state]);

    const handleUpdateFavoriteLocation = async (locationId) => {
        try {
            // 서버에 즐겨찾기 위치 업데이트 요청
            await updateFavoriteLocation(userId, locationId);

            // 성공 메시지 표시
            toast.success("즐겨찾기 위치가 업데이트되었습니다.");

            // favoriteLocationId 상태 업데이트
            setFavoriteLocationId(locationId); // 변경된 즐겨찾기 ID를 상태로 저장
        } catch (err) {
            console.error("Error updating favorite location:", err);
            toast.error("즐겨찾기 위치 업데이트에 실패했습니다.");
        }
    };

    const handleUpdateDescription = async (locationId) => {
        try {
            const description = descriptions[locationId];
            await updateLocationDescription(locationId, description);
            toast.success("위치 설명이 업데이트되었습니다.");

            // 상태에서 특정 locationId의 description만 업데이트
            setMemberDetail((prevDetail) => ({
                ...prevDetail,
                locations: prevDetail.locations.map((location) =>
                    location.id === locationId
                        ? { ...location, description } // 설명 업데이트
                        : location
                ),
            }));

            // 입력 필드 초기화
            setDescriptions((prevDescriptions) => ({
                ...prevDescriptions,
                [locationId]: "",
            }));
        } catch (err) {
            console.error("Error updating location description:", err);
            toast.error("위치 설명 업데이트에 실패했습니다.");
        }
    };

    const handleDescriptionChange = (locationId, value) => {
        setDescriptions((prevDescriptions) => ({
            ...prevDescriptions,
            [locationId]: value,
        }));
    };

    const handleDeleteLocation = async (locationId, isFavorite) => {
        const confirmDelete = async () => {
            try {
                await deleteLocation(locationId);
                toast.success("위치가 성공적으로 삭제되었습니다.");
                const response = await fetchMemberDetail(userId);
                setMemberDetail(response.data);
            } catch (err) {
                console.error("Error deleting location:", err);
                toast.error("위치 삭제에 실패했습니다.");
            }
        };

        confirmDelete();
    };


            return (
                <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                    {/* 헤더 */}
                    <Head />

                    {/* 별 배경 및 상세 정보 섹션 */}
                    <div style={{ position: "relative", height: "100vh" }}>
                        {/* 캔버스 배경 */}
                        <canvas
                            id="space"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: -1,
                            }}
                        ></canvas>

                        {/* 사용자 상세 정보 */}
                        <div className="member-detail" style={{ position: "relative", zIndex: 1 }}>
                            <h2>사용자 상세 정보</h2>
                            <div>
                                <Link
                                    to="/react/map"
                                    state={{ from: location.pathname, fromSaveLocation: true }}
                                >
                                    위치 정보 저장하러 가기
                                </Link>
                            </div>

                            {/* 로딩 상태 및 사용자 정보 렌더링 */}
                            {loading && <p>로딩 중...</p>}
                            {error && <p>오류 발생: {error.message}</p>}
                            {memberDetail && (
                                <>
                                    <p>이름: {memberDetail.uname}</p>
                                    <p>닉네임: {memberDetail.nickname}</p>
                                    <p>이메일: {memberDetail.email}</p>
                                    <p>알림 활성화 여부: {memberDetail.alertEnabled ? "예" : "아니오"}</p>

                                    <h3>저장된 위치 목록</h3>
                                    <LocationList
                                        locations={memberDetail.locations}
                                        descriptions={descriptions}
                                        onUpdateFavorite={handleUpdateFavoriteLocation}
                                        favoriteLocationId={favoriteLocationId}
                                        onDescriptionChange={handleDescriptionChange}
                                        onSaveDescription={handleUpdateDescription}
                                        onDelete={handleDeleteLocation}
                                        onEdit={handleEditLocation}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <Foot />
                </div>
            );
}
    export default MemberDetail;