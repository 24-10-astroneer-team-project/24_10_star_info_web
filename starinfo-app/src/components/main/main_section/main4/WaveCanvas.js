import React, { useRef, useEffect } from 'react';
import { WaveGroup } from './WaveGroup';

function WaveCanvas() {
    const canvasRef = useRef(null);       // 물결 애니메이션 캔버스
    const starsCanvasRef = useRef(null);  // 별 배경 캔버스
    const waveGroupRef = useRef(null);

    useEffect(() => {
        const starsCanvas = starsCanvasRef.current;
        const starsCtx = starsCanvas.getContext('2d');

        const width = window.innerWidth;
        const height = window.innerHeight;
        starsCanvas.width = width;
        starsCanvas.height = height;

        // 별과 유성 애니메이션 설정
        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.size = Math.random() * 2;
                this.speed = Math.random() * 0.1;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }

            update() {
                starsCtx.fillStyle = '#ffffff';
                starsCtx.fillRect(this.x, this.y, this.size, this.size);
                this.x -= this.speed;
                if (this.x < 0) this.reset();
            }
        }

        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = 0;
                this.len = (Math.random() * 80) + 10;
                this.speed = (Math.random() * 10) + 6;
                this.size = (Math.random() * 1) + 0.1;
                this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
                this.active = false;
            }

            update() {
                if (this.active) {
                    starsCtx.lineWidth = this.size;
                    starsCtx.strokeStyle = '#ffffff';
                    starsCtx.beginPath();
                    starsCtx.moveTo(this.x, this.y);
                    starsCtx.lineTo(this.x + this.len, this.y - this.len);
                    starsCtx.stroke();

                    this.x -= this.speed;
                    this.y += this.speed;
                    if (this.x < 0 || this.y >= height) this.reset();
                } else {
                    if (this.waitTime < new Date().getTime()) {
                        this.active = true;
                    }
                }
            }
        }

        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push(new Star());
        }
        const shootingStars = [new ShootingStar(), new ShootingStar()];

        function animateBackground() {
            starsCtx.fillStyle = '#000000'; // 배경을 검은색으로 설정
            starsCtx.fillRect(0, 0, width, height);

            stars.forEach(star => star.update());
            shootingStars.forEach(shootingStar => shootingStar.update());

            requestAnimationFrame(animateBackground);
        }

        animateBackground();

        // 물결 애니메이션
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        waveGroupRef.current = new WaveGroup();

        const resizeCanvas = () => {
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            ctx.scale(2, 2);
            waveGroupRef.current.resize(window.innerWidth, window.innerHeight);
        };

        const animateWaves = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            waveGroupRef.current.draw(ctx);
            requestAnimationFrame(animateWaves);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        requestAnimationFrame(animateWaves);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={starsCanvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        </div>
    );
}

export default WaveCanvas;
