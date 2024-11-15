// MemberDetail.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/MemberDetail.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinkWithState from '../../components/LinkWithState';

function MemberDetail() {
    const { userId } = useParams();
    const location = useLocation(); // useLocation 훅 사용
    const [memberDetail, setMemberDetail] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [descriptions, setDescriptions] = useState({});

    useEffect(() => {
        // 사용자가 위치 저장 후 돌아왔을 때 상태 확인
        if (location.state?.fromSaveLocation) {
            toast.success('위치 정보가 성공적으로 저장되었습니다!');
        }

        const fetchMemberDetail = async () => {
            try {
                const response = await axios.get(`/api/member/${userId}`);
                setMemberDetail(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (userId) {
            fetchMemberDetail();
        }
    }, [userId, location.state]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러 발생: {error.message}</div>;
    }

    const handleUpdateFavoriteLocation = async (locationId) => {
        try {
            await axios.post(`/api/member/${userId}/favorite-location/${locationId}`);
            toast.success('즐겨찾기 위치가 업데이트되었습니다.'); // 토스트 알림 성공 메시지
        } catch (err) {
            console.error('Error updating favorite location:', err);
            toast.error('즐겨찾기 위치 업데이트에 실패했습니다.'); // 토스트 알림 에러 메시지
        }
    };

    const handleUpdateDescription = async (locationId) => {
        try {
            const description = descriptions[locationId]; // 해당 위치의 설명 가져오기
            await axios.patch(`/api/member/location/${locationId}/description`, {
                description: description,
            });
            toast.success('위치 설명이 업데이트되었습니다.'); // 토스트 알림 성공 메시지
            setDescriptions((prevDescriptions) => ({
                ...prevDescriptions,
                [locationId]: '', // 설명 입력 필드를 초기화
            }));
            // 최신 정보를 다시 불러오기 위해 호출
            const response = await axios.get(`/api/member/${userId}`);
            setMemberDetail(response.data);
        } catch (err) {
            console.error('Error updating location description:', err);
            toast.error('위치 설명 업데이트에 실패했습니다.'); // 토스트 알림 에러 메시지
        }
    };

    const handleDescriptionChange = (locationId, value) => {
        setDescriptions((prevDescriptions) => ({
            ...prevDescriptions,
            [locationId]: value, // 해당 위치 ID에 대한 설명 업데이트
        }));
    };

    return (
        <div className="member-detail">
            <h2>사용자 상세 정보</h2>
            <div>
                <Link
                    to="/react/map"
                    state={{ from: location.pathname }}
                    style={{ display: 'inline-block', marginBottom: '20px', fontWeight: 'bold', color: '#007bff' }}
                >
                    위치 정보 저장하러 가기
                </Link>
            </div>
            {memberDetail && (
                <>
                    <p>이름: {memberDetail.uname}</p>
                    <p>닉네임: {memberDetail.nickname}</p>
                    <p>이메일: {memberDetail.email}</p>
                    <p>선호 관측 시간: {memberDetail.preferredTime || '설정되지 않음'}</p>
                    <p>알림 활성화 여부: {memberDetail.alertEnabled ? '예' : '아니오'}</p>

                    <h3>저장된 위치 목록</h3>
                    {memberDetail.locations && memberDetail.locations.length > 0 ? (
                        memberDetail.locations.map((location) => (
                            <div key={location.id} className="location-item">
                                <p>위도: {location.latitude}, 경도: {location.longitude}</p>
                                <p>설명: {location.description || '위치 설명이 없습니다.'}</p>
                                <button onClick={() => handleUpdateFavoriteLocation(location.id)}>
                                    이 위치를 즐겨찾기로 설정
                                </button>
                                <div className="description-input">
                                    <input
                                        type="text"
                                        placeholder="위치 설명을 입력하세요"
                                        value={descriptions[location.id] || ''}
                                        onChange={(e) => handleDescriptionChange(location.id, e.target.value)}
                                    />
                                    <button onClick={() => handleUpdateDescription(location.id)}>
                                        설명 저장
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>저장된 위치가 없습니다.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default MemberDetail;
