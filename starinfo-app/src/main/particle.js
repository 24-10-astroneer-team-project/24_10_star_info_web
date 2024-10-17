export class Text {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const fontWidth = 700;
        const fontSize = 800;
        const fontName = 'Hind';

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.textBaseline = 'middle';

        const fontPos = this.ctx.measureText(str);
        this.ctx.fillText(
            str,
            (stageWidth - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxDescent +
            (stageHeight - fontSize) / 2
        );

        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

        const particles = [];
        for (let height = 0; height < stageHeight; height += density) {
            for (let width = 0; width < stageWidth; width += density) {
                const pixel = imageData[(width + height * stageWidth) * 4 - 1];
                if (pixel !== 0) {
                    particles.push({ x: width, y: height });
                }
            }
        }

        return particles;
    }
}