import React, { useRef, useEffect } from "react";
import Head from "../layout/Head";
import Foot from "../layout/Foot";
import "./MeteorPage.css";

const MeteorPage = () => {
    // Canvas 요소의 참조를 저장하기 위한 useRef 훅
    const bgCanvasRef = useRef(null); // 배경 캔버스
    const terrainCanvasRef = useRef(null); // 지형 캔버스

    useEffect(() => {
        // Canvas 요소와 2D 컨텍스트 가져오기
        const background = bgCanvasRef.current;
        const bgCtx = background.getContext("2d");
        const terrain = terrainCanvasRef.current;
        const terCtx = terrain.getContext("2d");

        // 초기 캔버스 크기 설정
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (height < 400) height = 400; // 최소 높이 설정

        background.width = terrain.width = width;
        background.height = terrain.height = height;

        // 엔티티(별, 유성우, 지형 등)를 저장할 배열
        let entities = [];
        let terrainEntities = []; // 지형 엔티티를 별도로 저장

        // 지형을 생성하는 Terrain 클래스
        function Terrain(options) {
            options = options || {};
            this.scrollDelay = options.scrollDelay || 90; // 스크롤 속도
            this.lastScroll = new Date().getTime(); // 마지막 스크롤 시간
            this.fillStyle = options.fillStyle || "#191D4C"; // 지형 색상
            this.mHeight = options.mHeight || height / 2; // 지형 높이
            this.points = []; // 지형의 점 좌표 배열

            // 분할 기반의 지형 생성 알고리즘
            let displacement = options.displacement || 140; // 초기 변위
            const power = Math.pow(2, Math.ceil(Math.log(width) / Math.log(2))); // 점 개수 계산

            // 초기화
            this.points[0] = this.mHeight;
            this.points[power] = this.mHeight;

            // 점 사이 값을 랜덤으로 생성하여 부드러운 곡선 생성
            for (let i = 1; i < power; i *= 2) {
                for (let j = (power / i) / 2; j < power; j += power / i) {
                    this.points[j] =
                        (this.points[j - (power / i) / 2] +
                            this.points[j + (power / i) / 2]) / 2 +
                        Math.random() * -displacement +
                        displacement;
                }
                displacement *= 0.6; // 변위 감소
            }
        }

        // 지형 업데이트 메서드
        Terrain.prototype.update = function () {
            terCtx.clearRect(0, 0, width, height); // 기존 내용 지우기
            terCtx.fillStyle = this.fillStyle;

            // 스크롤 효과
            if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
                this.lastScroll = new Date().getTime();
                this.points.push(this.points.shift());
            }

            // 지형을 캔버스에 그리기
            terCtx.beginPath();
            for (let i = 0; i <= width; i++) {
                const pointIndex = Math.floor((i / width) * this.points.length);
                if (i === 0) {
                    terCtx.moveTo(0, this.points[0]);
                } else {
                    terCtx.lineTo(i, this.points[pointIndex]);
                }
            }

            terCtx.lineTo(width, height);
            terCtx.lineTo(0, height);
            terCtx.closePath();
            terCtx.fill();
        };

        // 별을 생성하는 Star 클래스
        function Star(options) {
            this.size = Math.random() * 2; // 별 크기
            this.speed = Math.random() * 0.05; // 이동 속도
            this.x = options.x;
            this.y = options.y;
        }

        // 별 초기화 메서드
        Star.prototype.reset = function () {
            this.size = Math.random() * 2;
            this.speed = Math.random() * 0.05;
            this.x = Math.random() * width; // 너비 변경에 따라 새로 계산
            this.y = Math.random() * height; // 높이 변경에 따라 새로 계산
        };

        // 별 업데이트 메서드
        Star.prototype.update = function () {
            this.x -= this.speed;
            if (this.x < 0) {
                this.reset(); // 캔버스를 벗어나면 초기화
            } else {
                bgCtx.fillRect(this.x, this.y, this.size, this.size);
            }
        };

        // 별과 유성우 생성
        const createEntities = () => {
            entities = [];
            for (let i = 0; i < height; i++) {
                entities.push(new Star({ x: Math.random() * width, y: Math.random() * height }));
            }
        };

        // 지형 생성
        const createTerrain = () => {
            terrainEntities = [];
            terrainEntities.push(new Terrain({ mHeight: height / 2 - 120 }));
            terrainEntities.push(new Terrain({ displacement: 120, scrollDelay: 50, fillStyle: "rgb(17,20,40)", mHeight: height / 2 - 60 }));
            terrainEntities.push(new Terrain({ displacement: 100, scrollDelay: 20, fillStyle: "rgb(10,10,5)", mHeight: height / 2 }));
        };

        createEntities(); // 초기 별 생성
        createTerrain(); // 초기 지형 생성

        // 애니메이션 프레임 처리
        const animate = () => {
            bgCtx.fillStyle = "#110E19"; // 배경 색상
            bgCtx.fillRect(0, 0, width, height); // 캔버스 초기화
            bgCtx.fillStyle = "#ffffff";
            bgCtx.strokeStyle = "#ffffff";

            // 별 업데이트
            entities.forEach((entity) => entity.update());

            // 지형 업데이트
            terrainEntities.forEach((terrain) => terrain.update());

            requestAnimationFrame(animate); // 다음 프레임 요청
        };

        animate();

        // 화면 크기 변경 처리
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            if (height < 400) height = 400;

            background.width = terrain.width = width;
            background.height = terrain.height = height;

            createEntities(); // 별 위치와 엔티티 재생성
            createTerrain(); // 지형 재생성
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="meteor-page">
            {/* 헤더 영역 */}
            <div className="content">
                <Head />
                <canvas ref={bgCanvasRef}></canvas> {/* 배경 캔버스 */}
                <canvas ref={terrainCanvasRef}></canvas> {/* 지형 캔버스 */}
                <div className="popup">
                    <h1>유성우</h1>
                    <p>유성우 관련 내용들</p>
                </div>
            </div>
            {/* 푸터 영역 */}
            <Foot />
        </div>
    );
};

export default MeteorPage;
