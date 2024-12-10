import React, { useEffect, useRef } from 'react';
import { Polygon } from './Polygon';
import './Constellation.css';

const Constellation = () => {
    const canvasRef = useRef(null);
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    let polygon, moveX = 0, isDown = false, offsetX = 0;
    let stars = []; // 별 데이터를 저장할 배열

    const handleExperienceButtonClick = () => {
        window.location.href = '/react/constellation';
    };

    const handleMeteorButtonClick = () => {
        window.location.href = '/react/meteor';
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

            polygon = new Polygon(
                stageWidth / 2,
                stageHeight / 1,
                stageHeight / 1.7,
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

    const CustomButton = ({ onClick, label }) => (
        <button
            onClick={onClick}
            className="custom_button"
        >
            {label}
        </button>
    );

    return (
        <div className="rotating-polygon-section">
            <canvas ref={canvasRef} className="rotating-polygon-canvas"></canvas>
            <div className="button-container">
                <CustomButton
                    onClick={handleExperienceButtonClick}
                    label="별자리 체험 하러가기"
                />
                <CustomButton
                    onClick={handleMeteorButtonClick}
                    label="별자리 정보 보러가기"
                />
            </div>
        </div>
    );
};

export default Constellation;