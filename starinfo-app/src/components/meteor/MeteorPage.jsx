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
        const entities = [];

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
            this.x = width;
            this.y = Math.random() * height;
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

        // 유성우를 생성하는 ShootingStar 클래스
        function ShootingStar() {
            this.reset();
        }

        // 유성우 초기화 메서드
        ShootingStar.prototype.reset = function () {
            this.x = Math.random() * width; // 시작 위치
            this.y = 0;
            this.len = Math.random() * 80 + 10; // 유성 길이
            this.speed = Math.random() * 10 + 6; // 유성 속도
            this.size = Math.random() * 1 + 0.1; // 유성 크기
            this.waitTime = new Date().getTime() + Math.random() * 3000 + 500; // 대기 시간
            this.active = false;
        };

        // 유성우 업데이트 메서드
        ShootingStar.prototype.update = function () {
            if (this.active) {
                this.x -= this.speed;
                this.y += this.speed;
                if (this.x < 0 || this.y >= height) {
                    this.reset(); // 캔버스를 벗어나면 초기화
                } else {
                    bgCtx.lineWidth = this.size;
                    bgCtx.beginPath();
                    bgCtx.moveTo(this.x, this.y);
                    bgCtx.lineTo(this.x + this.len, this.y - this.len);
                    bgCtx.stroke();
                }
            } else {
                if (this.waitTime < new Date().getTime()) {
                    this.active = true; // 대기 후 활성화
                }
            }
        };

        // 별과 유성우, 지형 생성 및 배열에 추가
        for (let i = 0; i < height; i++) {
            entities.push(new Star({ x: Math.random() * width, y: Math.random() * height }));
        }

        entities.push(new ShootingStar());
        entities.push(new ShootingStar());

        entities.push(new Terrain({ mHeight: height / 2 - 120 }));
        entities.push(new Terrain({ displacement: 120, scrollDelay: 50, fillStyle: "rgb(17,20,40)", mHeight: height / 2 - 60 }));
        entities.push(new Terrain({ displacement: 100, scrollDelay: 20, fillStyle: "rgb(10,10,5)", mHeight: height / 2 }));

        // 애니메이션 프레임 처리
        const animate = () => {
            bgCtx.fillStyle = "#110E19"; // 배경 색상
            bgCtx.fillRect(0, 0, width, height); // 캔버스 초기화
            bgCtx.fillStyle = "#ffffff";
            bgCtx.strokeStyle = "#ffffff";

            // 각 엔티티 업데이트
            entities.forEach((entity) => entity.update());
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
