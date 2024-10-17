export class Text {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    setText(text, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const fontSize = stageHeight / 5;  // 글자 크기를 더 작게 조정
        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `bold ${fontSize}px Hind`; // Hind 폰트 사용
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // 흰색 텍스트
        this.ctx.textBaseline = 'middle';
        const textWidth = this.ctx.measureText(text).width;
        this.ctx.fillText(text, (stageWidth - textWidth) / 2, stageHeight / 2);

        return this.getDotPositions(density, stageWidth, stageHeight);
    }

    getDotPositions(density, stageWidth, stageHeight) {
        const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;
        const particles = [];

        for (let y = 0; y < stageHeight; y += density) {
            for (let x = 0; x < stageWidth; x += density) {
                const alpha = imageData[(x + y * stageWidth) * 4 + 3];
                if (alpha > 0) {
                    particles.push({ x, y });
                }
            }
        }

        return particles;
    }
}