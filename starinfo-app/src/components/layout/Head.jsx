import React, { useState } from 'react';
import { useAuth } from "../../services/AuthProvider"; // 로그인 상태 확인용
import './Head.css';
import ProfileButton from "../member/MemberProfileButton";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"; // 토스트 알람

function Head() {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { isAuthenticated, logout } = useAuth(); // 로그인 상태와 로그아웃 메서드 가져오기
    const navigate = useNavigate();

    const handleMouseEnter = () => setMenuVisible(true);
    const handleMouseLeave = () => setMenuVisible(false);

    const handleLogout = () => {
        logout(); // 상태를 업데이트하여 로그아웃 처리
        toast.success("로그아웃 되었습니다.", {
            position: "top-center",
            autoClose: 2000, // 2초 후 자동 닫힘
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        setTimeout(() => {
            navigate('/react/main'); // 로그아웃 후 메인 페이지로 이동
        }, 2000); // 알림 표시 후 2초 대기
    };

    return (
        <nav className="nav_header">
            <div
                className="astro-logo"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a href="./main">ASTRO</a>
            </div>
            <div
                className={`menu-container ${isMenuVisible ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ul className="navbar">
                    <li><a href="./main">일정관리</a></li>
                    <li><a href="./starmap">별보기</a></li>
                    <li><a href="./planet">행성</a></li>
                    <li><a href="./meteor">유성우</a></li>
                    <li><a href="./map">위치 입력(임시)</a></li>
                    {/* 로그인 상태에 따라 다른 링크 또는 메뉴 표시 */}
                    {isAuthenticated ? (
                        <>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault(); // 링크 기본 동작 방지
                                        handleLogout();
                                    }}
                                    className="menu-item logout"
                                >
                                    로그아웃
                                </a>
                            </li>
                            <li className="menu-item">
                                {/* 프로필 버튼: 로그인 상태에서만 표시 */}
                                <ProfileButton />
                            </li>
                        </>
                    ) : (
                        <li>
                            <a href="./login">로그인</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Head;