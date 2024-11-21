export class Block {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;

        // x를 캔버스 왼쪽 끝에 고정
        this.x = 0; // 캔버스 왼쪽 끝에 위치

        // y 값을 위로 올림 (기본 y 값에서 원하는 만큼 빼기)
        this.y = y - 100; // 기존 y 값보다 100px 위로 이동

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
    }

    draw(ctx) {
        const xGap = 80;
        const yGap = 60;

        // 메인 블록 색상 (짙은 보라색)
        ctx.fillStyle = '#342e73';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        // 블록의 그림자 효과 (더 짙은 보라색)
        ctx.fillStyle = '#1f1a47';
        ctx.beginPath();
        ctx.moveTo(this.maxX, this.maxY);
        ctx.lineTo(this.maxX - xGap, this.maxY + yGap);
        ctx.lineTo(this.x - xGap, this.maxY + yGap);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();

        // 블록의 앞면 효과 (밝은 보라색)
        ctx.fillStyle = '#574b98';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.maxY);
        ctx.lineTo(this.x - xGap, this.maxY + yGap);
        ctx.lineTo(this.x - xGap, this.maxY + yGap - this.height);
        ctx.fill();
    }
}
