export class Visual {
    constructor(pos, width, height) {
        this.pos = pos;
        this.stageWidth = width;
        this.stageHeight = height;
        this.particles = this.createParticles();
    }

    createParticles() {
        return this.pos.map(p => ({
            x: Math.random() * this.stageWidth,  // 랜덤 시작 위치
            y: Math.random() * this.stageHeight,
            targetX: p.x,
            targetY: p.y,
            vx: 0,
            vy: 0,
        }));
    }

    animate(ctx) {
        ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        ctx.fillStyle = 'rgba(68, 114, 196, 0.7)'; // 얕은 푸른색 (RGBA)

        this.particles.forEach(p => {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const force = dist * 0.01;  // 이동 속도 조절
            const angle = Math.atan2(dy, dx);

            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;

            p.vx *= 0.92;  // 속도 감속
            p.vy *= 0.92;

            p.x += p.vx;
            p.y += p.vy;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}