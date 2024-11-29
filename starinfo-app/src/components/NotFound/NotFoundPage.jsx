import React, { useEffect, useRef } from 'react';
import './style.css';
import { Ball } from './Ball';
import { Block } from './Block';

const NotFoundPage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 캔버스 크기 설정
        const resize = () => {
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            ctx.scale(2, 2);
        };

        window.addEventListener('resize', resize);
        resize();

        // 달(공)과 블록 생성
        const ball = new Ball(window.innerWidth, window.innerHeight, 60, 15);
        const block = new Block(700, 30, 300, 450);

        // 별 데이터 생성
        const stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 2,
        }));

        // 유성 데이터 생성
        const meteors = [];

        // 유성 생성 함수
        const createMeteor = () => {
            meteors.push({
                x: Math.random() * window.innerWidth,
                y: -10,
                size: Math.random() * 5 + 2,
                speedX: Math.random() * 3 + 1,
                speedY: Math.random() * 5 + 2,
            });
        };

        // 유성 갱신 함수
        const updateMeteors = () => {
            meteors.forEach((meteor, index) => {
                meteor.x += meteor.speedX;
                meteor.y += meteor.speedY;
                if (meteor.y > window.innerHeight) {
                    meteors.splice(index, 1);
                }
            });
        };

        // 애니메이션 함수
        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // 별 그리기
            ctx.fillStyle = 'white';
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // 유성 그리기
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            meteors.forEach(meteor => {
                ctx.beginPath();
                ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 달(공)과 블록 그리기
            block.draw(ctx);
            ball.draw(ctx, window.innerWidth, window.innerHeight, block);

            updateMeteors();
            requestAnimationFrame(animate);
        };

        // 1초 간격으로 유성 생성
        const meteorInterval = setInterval(createMeteor, 1000);

        animate();

        return () => {
            clearInterval(meteorInterval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="not-found-page">
            <canvas ref={canvasRef} className="animation-canvas"/>
            <div className="not-found-content">
                <h1>404 - Page Not Found</h1>
                <p>We couldn't find the page you're looking for</p>
                <a href="./react/main" className="back-home-button">Go Back Home</a>
            </div>
        </div>

    );
};

export default NotFoundPage;
