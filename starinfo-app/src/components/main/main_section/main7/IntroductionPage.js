import React, { useEffect, useRef } from 'react';
import styles from './IntroductionPage.module.css';
import PopupProfile from './PopupProfile'; // 팝업 컴포넌트 임포트

function IntroductionPage() {
    const canvasRef = useRef(null);
    const numStars = 1900;
    const stars = useRef([]);

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
                const pixelRadius = 1 * (focalLength / star.z);

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

    return (
        <div className={styles.introductionPage}>
            <canvas ref={canvasRef} className={styles.spaceCanvas}></canvas>
            <PopupProfile /> {/* 팝업 컴포넌트 렌더링 */}
        </div>
    );
}

export default IntroductionPage;
