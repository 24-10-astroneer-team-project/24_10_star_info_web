import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import Visual from "./visual";

const AstroAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Pixi 애플리케이션 초기화
        const app = new PIXI.Application({
            resizeTo: window,
            backgroundColor: 0x0d1b2a, // 어두운 우주 배경
            antialias: true,
        });

        // canvas를 HTML에 추가
        if (canvasRef.current) {
            canvasRef.current.appendChild(app.view);
        }

        // 별 생성 함수 호출
        createStars(app, 200); // 200개의 별을 생성

        const visual = new Visual();

        const onResize = () => {
            visual.show(app.screen.width, app.screen.height, app.stage);
        };

        window.addEventListener("resize", onResize);
        onResize();

        app.ticker.add(() => {
            visual.animate();
        });

        return () => {
            window.removeEventListener("resize", onResize);
            app.destroy(true, true);
        };
    }, []);

    // 별을 추가하는 함수
    const createStars = (app, count) => {
        for (let i = 0; i < count; i++) {
            const star = new PIXI.Graphics();
            star.beginFill(0xffffff); // 흰색 별
            star.drawCircle(0, 0, Math.random() * 1.5); // 작은 별 생성
            star.endFill();

            star.x = Math.random() * app.screen.width;
            star.y = Math.random() * app.screen.height;

            app.stage.addChild(star);
        }
    };

    return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default AstroAnimation;
