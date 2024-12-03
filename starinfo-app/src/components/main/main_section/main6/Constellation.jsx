import React, { useEffect, useRef } from 'react';
import { Polygon } from './Polygon';
import Main_Button from '../../../../components/layout/Main_Button'; // Main_Button 컴포넌트 임포트
import './Constellation.css';

const Constellation = () => {
    const canvasRef = useRef(null);
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    let polygon, moveX = 0, isDown = false, offsetX = 0;
    let stars = []; // 별 데이터를 저장할 배열

    const handleButtonClick = () => {
        window.location.href = '/react/meteor'; // 버튼 클릭 시 이동할 경로
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            const parent = canvas.parentElement;
            const stageWidth = parent.offsetWidth;
            const stageHeight = parent.offsetHeight;

            canvas.width = stageWidth * pixelRatio;
            canvas.height = stageHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);

            // 중심을 올려서 설정 (stageHeight / 3)
            polygon = new Polygon(
                stageWidth / 2,
                stageHeight / 1.1, // 카드들이 중앙에 가까운 위치에서 회전하도록 조정
                stageHeight / 1.7, // 회전 반지름을 조정
                15
            );

            initStars(stageWidth, stageHeight);
        };

        const initStars = (width, height) => {
            stars = [];
            for (let i = 0; i < 300; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.6 + 0.4
                });
            }
        };

        const drawStars = () => {
            ctx.save();
            ctx.fillStyle = 'white';
            stars.forEach((star) => {
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();
        };

        const animate = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawStars();
            moveX *= 0.92;
            polygon.animate(ctx, moveX);

            window.requestAnimationFrame(animate);
        };

        const onDown = (e) => {
            if (!canvas.contains(e.target)) return;
            isDown = true;
            moveX = 0;
            offsetX = e.clientX;
        };

        const onMove = (e) => {
            if (!isDown) return;
            moveX = e.clientX - offsetX;
            offsetX = e.clientX;
        };

        const onUp = () => {
            isDown = false;
        };

        resize();
        window.addEventListener('resize', resize);
        document.addEventListener('pointerdown', onDown);
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('pointerdown', onDown);
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
        };
    }, [pixelRatio]);

    return (
        <div className="rotating-polygon-section" style={{ position: 'relative' }}>
            <canvas ref={canvasRef} className="rotating-polygon-canvas"></canvas>
            {/* 버튼 추가 */}
            <div>
                <Main_Button
                    onClick={handleButtonClick}
                    label="별자리 정보 보러가기"
                />
            </div>
        </div>
    );
};

export default Constellation;
