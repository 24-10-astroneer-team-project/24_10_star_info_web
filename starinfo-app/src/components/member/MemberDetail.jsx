// MemberDetail.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import './css/MemberDetail.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMemberDetail, updateFavoriteLocation, updateLocationDescription, deleteLocation } from './service/memberService';
import LocationList from '../member/LocationList';

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
        <div className="member-detail">
            <h2>사용자 상세 정보</h2>
            <div>
                <Link
                    to="/react/map"
                    state={{ from: location.pathname, fromSaveLocation: true }}
                    style={{ display: 'inline-block', marginBottom: '20px', fontWeight: 'bold', color: '#007bff' }}
                >
                    위치 정보 저장하러 가기
                </Link>
            </div>
            {loading && <p>로딩 중...</p>}
            {error && <p>오류 발생: {error.message}</p>}
            {memberDetail && (
                <>
                    <p>이름: {memberDetail.uname}</p>
                    <p>닉네임: {memberDetail.nickname}</p>
                    <p>이메일: {memberDetail.email}</p>
                    <p>알림 활성화 여부: {memberDetail.alertEnabled ? '예' : '아니오'}</p>

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
    );
}

export default MemberDetail;