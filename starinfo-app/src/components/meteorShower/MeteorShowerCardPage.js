import React from 'react';
import './MeteorShowerCardPage.css';

const MeteorShowerCardPage = ({ generalMeteorData, onShowDetails }) => {
    const flattenedMeteorData = generalMeteorData.flatMap((data) => {
        if (Array.isArray(data.data)) {
            return data.data.map((meteorData) => ({
                cometName: data.cometName,
                ...meteorData,
            }));
        } else if (data.data.error) {
            return [
                {
                    cometName: data.cometName,
                    error: data.data.error,
                },
            ];
        } else {
            return [];
        }
    });

    function ShootingStar(ctx, width, height, color) {
        this.x = Math.random() * width;
        this.y = 0;
        this.len = Math.random() * 40 + 10;
        this.speed = Math.random() * 3 + 1; // 속도를 1에서 3 사이로 설정
        this.size = Math.random() * 2 + 1; // 굵기를 더 두껍게 설정 (1에서 3 사이)

        this.color = color;

        this.reset = function () {
            this.x = Math.random() * width;
            this.y = 0;
            this.len = Math.random() * 40 + 10;
            this.speed = Math.random() * 3 + 1;
            this.size = Math.random() * 2 + 1; // 재설정 시에도 굵기를 동일하게 조정
        };

        this.update = function () {
            this.x -= this.speed * 0.9; // x축 이동량 (각도 조절)
            this.y += this.speed;
            if (this.x < 0 || this.y >= height) {
                this.reset();
            } else {
                ctx.lineWidth = this.size; // 굵기를 적용
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.len, this.y - this.len);
                ctx.stroke();
            }
        };
    }

    function initCanvas(canvas, color) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const stars = Array.from({ length: 10 }, () => new ShootingStar(ctx, width, height, color));

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            stars.forEach((star) => star.update());
            requestAnimationFrame(animate);
        };

        animate();
    }

    const getMeteorColor = (name) => {
        switch (name) {
            case '페르세이드': // Perseid Meteor Shower
                return 'rgba(255, 140, 0, 0.5)'; // 부드러운 주황색
            case '에타아쿠아리드': // Eta Aquariid Meteor Shower
                return 'rgba(135, 206, 250, 0.5)'; // 하늘색
            case '오리오니드': // Orionid Meteor Shower
                return 'rgba(50, 205, 50, 0.5)'; // 라임 그린
            case '우르시드': // Ursid Meteor Shower
                return 'rgba(220, 20, 60, 0.5)'; // 크림슨 레드
            default:
                return 'rgba(200, 200, 200, 0.4)'; // 옅은 흰색 (기본값)
        }
    };

    const translateMessage = (message) => {
        if (message === "Meteor shower peak period is near the comet approach date, increasing observation potential.") {
            return "유성우 최대 활동 기간이 혜성이 접근하는 날짜와 가깝습니다. 관측 가능성이 높습니다.";
        } else if (message === "Meteor shower is not at its peak period.") {
            return "유성우가 최대 활동 기간에 있지 않습니다.";
        } else {
            return message; // 기본값 (번역되지 않은 메시지)
        }
    };

    const translateConditions = (conditions) => {
        if (conditions === "Lenient conditions applied") {
            return "구름이 약간 있거나, 완전히 어두운 밤이 아니더라도 관측이 가능할 수 있습니다.";
        } else if (conditions === "Standard conditions applied") {
            return "맑고 완전히 어두운 하늘에서만 관측이 가능할 것입니다.";
        } else {
            return conditions; // 기본값 (번역되지 않은 조건)
        }
    };

    const translateCometName = (cometName) => {
        if (cometName === "Swift-Tuttle") {
            return "스위프트-터틀";
        } else if (cometName === "Halley") {
            return "핼리";
        } else if (cometName === "Tuttle") {
            return "터틀";
        } else {
            return cometName; // 기본값 (번역되지 않은 이름)
        }
    };

    const translateMeteorShowerName = (meteorShowerName) => {
        if (meteorShowerName === "Perseid") {
            return "페르세이드";
        } else if (meteorShowerName === "Eta Aquariid") {
            return "에타아쿠아리드";
        } else if (meteorShowerName === "Orionid") {
            return "오리오니드";
        } else if (meteorShowerName === "Ursid") {
            return "우르시드";
        } else {
            return meteorShowerName; // 기본값 (번역되지 않은 이름)
        }
    };

    return (
        <div className="meteor-shower-cards">
            {flattenedMeteorData.map((meteorData, index) => {
                const translatedName = translateMeteorShowerName(meteorData.name); // 유성우 이름 번역
                const meteorColor = getMeteorColor(translatedName); // 유성우 색상 가져오기

                return (
                    <div className="meteor-shower-card" key={index}>
                        {/* 캔버스 추가 */}
                        <canvas
                            className="meteor-canvas"
                            ref={(canvas) => {
                                if (canvas && canvas.getContext) {
                                    canvas.width = 300; // 캔버스 너비
                                    canvas.height = 200; // 캔버스 높이
                                    initCanvas(canvas, meteorColor); // 캔버스 초기화 및 유성우 생성
                                }
                            }}
                        ></canvas>

                        {/* 카드 콘텐츠 */}
                        <h3 className="comet-name">{translatedName}</h3>
                        <div className="meteor-shower-details">
                            {meteorData.error ? (
                                <p>{meteorData.error}</p>
                            ) : (
                                <>
                                    <p>혜성 이름: {translateCometName(meteorData.cometName)}</p>
                                    <p>최대 활동 기간: {meteorData.peak_start_date} ~ {meteorData.peak_end_date}</p>
                                    <p>메시지: {translateMessage(meteorData.message)}</p>
                                    <p>적위: {meteorData.declination}</p>
                                    <p>적경: {meteorData.ra}</p>
                                    <p>거리: {meteorData.distance} AU</p>
                                    <p>상태: {meteorData.status === "closing" ? "접근 중" : "멀어짐"}</p>
                                    <p>관측 조건: {translateConditions(meteorData.conditions_used)}</p>
                                    <button onClick={() => onShowDetails(meteorData.name)}>상세보기</button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MeteorShowerCardPage;
