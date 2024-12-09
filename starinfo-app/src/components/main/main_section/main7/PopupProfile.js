import React, { useEffect, useRef, useState } from 'react';
import styles from './PopupProfile.module.css';

function PopupProfile() {
    const canvasRef = useRef(null);
    const numStars = 1900;
    const stars = useRef([]);
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');
    const intervalRef = useRef(null); // 타이머 관리

    const profiles = [
        {
            id: 1,
            name: '한영신',
            intro: '팀장 한영신입니다.',
            blog: 'https://velog.io/@tablo2525/posts',
            github: 'https://github.com/qBlackBirdp',
            photo: './photos/한영신.jpg',
        },
        {
            id: 2,
            name: '최은서',
            intro: '최은서입니다',
            blog: 'https://velog.io/@lkh001030/posts',
            github: 'https://github.com/eunseo1030',
            photo: './photos/최은서.jpg',
        },
        {
            id: 3,
            name: '조혜령',
            intro: '프론트엔드 개발에 관심이 많은 조혜령입니다!',
            blog: 'https://velog.io/@hrjo0120/posts',
            github: 'https://github.com/hrjo0120',
            photo: './photos/조혜령.JPG',
        },
        {
            id: 4,
            name: '박태은',
            intro: '웹개발자를 목표로 성장해나가고 있는 박태은입니다.',
            blog: 'https://velog.io/@pive0528/posts',
            github: 'https://github.com/Pive0528',
            photo: './photos/박태은.jpg',
        },
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext('2d');
        const focalLength = canvas.width * 2;
        let animate = true;
        let centerX, centerY;

        function initializeStars() {
            centerX = canvas.width / 2;
            centerY = canvas.height / 2;

            stars.current = Array.from({ length: numStars }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width,
                o: `0.${Math.floor(Math.random() * 99) + 1}`,
            }));
        }

        function moveStars() {
            stars.current.forEach((star) => {
                star.z -= 1;
                if (star.z <= 0) {
                    star.z = canvas.width;
                }
            });
        }

        function drawStars() {
            if (
                canvas.width !== window.innerWidth ||
                canvas.height !== window.innerHeight
            ) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initializeStars();
            }

            c.fillStyle = 'rgba(0, 0, 0, 1)';
            c.fillRect(0, 0, canvas.width, canvas.height);

            stars.current.forEach((star) => {
                const pixelX = (star.x - centerX) * (focalLength / star.z) + centerX;
                const pixelY = (star.y - centerY) * (focalLength / star.z) + centerY;
                const pixelRadius = 1.5 * (focalLength / star.z);

                c.fillStyle = `rgba(209, 255, 255, ${star.o})`;
                c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
            });
        }

        function executeFrame() {
            if (animate) {
                requestAnimationFrame(executeFrame);
            }
            moveStars();
            drawStars();
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
        executeFrame();

        return () => {
            animate = false;
        };
    }, []);

    useEffect(() => {
        // 자동 프로필 전환 타이머 설정
        intervalRef.current = setInterval(() => {
            handleNextProfile();
        }, 6000);

        // 컴포넌트 언마운트 시 타이머 제거
        return () => clearInterval(intervalRef.current);
    }, [currentProfileIndex]);

    const handleNextProfile = () => {
        setAnimationClass(styles.slideOutLeft);
        setTimeout(() => {
            setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
            setAnimationClass(styles.slideInRight);
        }, 500);
    };

    const handlePreviousProfile = () => {
        setAnimationClass(styles.slideOutRight);
        setTimeout(() => {
            setCurrentProfileIndex((prevIndex) =>
                prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
            );
            setAnimationClass(styles.slideInLeft);
        }, 500);
    };

    const currentProfile = profiles[currentProfileIndex];

    return (
        <div className={styles.popupContainer}>
            <canvas ref={canvasRef} className={styles.spaceCanvas}></canvas>
            <div className={`${styles.popup} ${animationClass}`}>
                <div className={styles.profileImageContainer}>
                    <img
                        src={require(`${currentProfile.photo}`)}
                        alt={currentProfile.name}
                        className={styles.profileImage}
                    />
                </div>
                <div className={styles.profileInfo}>
                    <h2>{currentProfile.name}</h2>
                    <p>{currentProfile.intro}</p>
                    <p>
                        벨로그: <a href={currentProfile.blog} target="_blank" rel="noopener noreferrer">{currentProfile.blog}</a>
                    </p>
                    <p>
                        GitHub: <a href={currentProfile.github} target="_blank" rel="noopener noreferrer">{currentProfile.github}</a>
                    </p>
                </div>
                <div className={styles.navigationArrows}>
                    <span className={styles.navigationArrowLeft} onClick={handlePreviousProfile}>&lt;</span>
                    <span className={styles.navigationArrowRight} onClick={handleNextProfile}>&gt;</span>
                </div>
            </div>
        </div>
    );
}

export default PopupProfile;
