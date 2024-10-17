import React, { useEffect, useRef } from 'react';
import WebFont from 'webfontloader';  // WebFontLoader import
import { Visual } from '../main/visual';  // main 폴더에서 visual.js 가져오기
import { Text } from '../main/text';      // main 폴더에서 text.js 가져오기

function MainPage() {
    const canvasRef = useRef(null);
    const textRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        // 웹폰트 로드 및 텍스트 렌더링
        WebFont.load({
            google: {
                families: ['Hind:700'],
            },
            fontactive: () => {
                textRef.current = new Text(); // 텍스트 객체 생성

                window.addEventListener('resize', resize);
                resize();
                window.requestAnimationFrame(animate); // 애니메이션 프레임 요청
            },
        });

        function resize() {
            const stageWidth = document.body.clientWidth;
            const stageHeight = document.body.clientHeight;

            canvas.width = stageWidth * pixelRatio;
            canvas.height = stageHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);

            // 'Hello earthling' 텍스트를 지정된 위치와 크기로 설정
            const pos = textRef.current.setText('Hello earthling', 6, stageWidth, stageHeight);
            visualRef.current = new Visual(pos, stageWidth, stageHeight); // Visual 객체 생성 및 초기화
        }

        function animate() {
            requestAnimationFrame(animate); // 애니메이션 루프
            if (visualRef.current) {
                visualRef.current.animate(ctx); // Visual 애니메이션 실행
            }
        }

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100vh', backgroundColor: 'black' }}></canvas>
        </div>
    );
}

export default MainPage;