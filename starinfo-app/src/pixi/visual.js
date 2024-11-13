import * as PIXI from "pixi.js";
import { Text } from "./text";
import { Particle } from "./particle";

export default class Visual {
    constructor() {
        this.text = new Text();

        // 텍스처 로드 (경로가 모든 사용자에게 접근 가능한지 확인 필요)
        try {
            this.texture = PIXI.Texture.from('/particle.png');
        } catch (error) {
            console.error('Error loading particle texture:', error);
        }

        this.particles = [];

        this.mouse = {
            x: 0,
            y: 0,
            radius: 100,
        };

        // 이벤트 리스너 등록
        this.onMove = this.onMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        document.addEventListener('pointermove', this.onMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
    }

    show(stageWidth, stageHeight, stage) {
        if (this.container) {
            stage.removeChild(this.container);
        }

        // 텍스트를 위치 배열로 설정
        this.pos = this.text.setText('ASTRO', 2, stageWidth, stageHeight);

        // 파티클 컨테이너 생성
        this.container = new PIXI.ParticleContainer(this.pos.length, {
            vertices: false,
            position: true,
            rotation: false,
            scale: false,
            uvs: false,
            tint: true,
        });

        stage.addChild(this.container);

        // 파티클 초기화
        this.particles = [];
        for (let i = 0; i < this.pos.length; i++) {
            const item = new Particle(this.pos[i], this.texture);
            this.container.addChild(item.sprite);
            this.particles.push(item);
        }
    }

    animate() {
        // 모든 파티클 애니메이션
        for (let i = 0; i < this.particles.length; i++) {
            const item = this.particles[i];
            const dx = this.mouse.x - item.x;
            const dy = this.mouse.y - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = item.radius + this.mouse.radius;

            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const tx = item.x + Math.cos(angle) * minDist;
                const ty = item.y + Math.sin(angle) * minDist;
                const ax = tx - this.mouse.x;
                const ay = ty - this.mouse.y;
                item.vx -= ax;
                item.vy -= ay;
                item.collide();
            }

            item.draw();
        }
    }

    onMove(e) {
        // 마우스 위치 저장
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    onTouchEnd() {
        // 터치가 끝나면 마우스 위치 초기화
        this.mouse.x = 0;
        this.mouse.y = 0;
    }

    // 이벤트 리스너 제거
    removeEventListeners() {
        document.removeEventListener('pointermove', this.onMove, false);
        document.removeEventListener('touchend', this.onTouchEnd, false);
    }
}
