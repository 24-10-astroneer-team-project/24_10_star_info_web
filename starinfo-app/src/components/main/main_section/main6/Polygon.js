const PI2 = Math.PI * 2;
const IMAGE_PATHS = [
    require('../../../layout/con_icon/Auriga.png'),
    require('../../../layout/con_icon/Bootes.png'),
    require('../../../layout/con_icon/Cancer.png'),
    require('../../../layout/con_icon/Cassiopeia.png'),
    require('../../../layout/con_icon/Cepheus.png'),
    require('../../../layout/con_icon/Corona_Borealis.png'),
    require('../../../layout/con_icon/Cygnus.png'),
    require('../../../layout/con_icon/Delphinus.png'),
    require('../../../layout/con_icon/Draco.png'),
    require('../../../layout/con_icon/Gemini.png'),
    require('../../../layout/con_icon/Hercules.png'),
    require('../../../layout/con_icon/Leo.png'),
    require('../../../layout/con_icon/Lyra.png'),
    require('../../../layout/con_icon/Orion.png'),
    require('../../../layout/con_icon/Pegasus.png')
];

export class Polygon {
    constructor(x, y, radius, sides, spacing = 5) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
        this.spacing = spacing; // 간격 조정을 위한 변수 추가
        this.images = [];

        this.loadImages();
    }

    loadImages() {
        IMAGE_PATHS.forEach((path, index) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                this.images[index] = img;
            };
            img.onerror = () => {
                console.error(`Image failed to load at path: ${path}`);
                this.images[index] = null;
            };
        });
    }

    animate(ctx, moveX) {
        ctx.save();
        const angle = PI2 / this.sides;
        const adjustedRadius = this.radius + this.spacing; // 간격을 반영한 반지름 계산
        ctx.translate(this.x, this.y);
        this.rotate += moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = adjustedRadius * Math.cos(angle * i); // 간격을 적용한 위치 계산
            const y = adjustedRadius * Math.sin(angle * i);

            ctx.save();
            ctx.translate(x, y);

            // 중심을 향해 카드가 기울어지도록 회전 조정
            ctx.rotate(angle * i - this.rotate);

            if (this.images[i]) {
                const imgSize = 170; // 카드 크기
                ctx.drawImage(
                    this.images[i],
                    -imgSize / 2,
                    -imgSize / 2,
                    imgSize,
                    imgSize
                ); // 카드의 중앙에 이미지 배치
            }

            ctx.restore();
        }

        ctx.restore();
    }
}
