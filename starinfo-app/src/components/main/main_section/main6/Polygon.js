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
    require('../../../layout/con_icon/Gemini.png')
];

export class Polygon {
    constructor(x, y, radius, sides, spacing = 5) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;
        this.spacing = spacing;
        this.images = [];
        this.descriptions = [
            'Auriga - The Charioteer',
            'Bootes - The Herdsman',
            'Cancer - The Crab',
            'Cassiopeia - The Queen',
            'Cepheus - The King',
            'Corona Borealis - The Crown',
            'Cygnus - The Swan',
            'Delphinus - The Dolphin',
            'Draco - The Dragon',
            'Gemini - The Twins'
        ];

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
        const angle = PI2 / this.images.length;
        const adjustedRadius = this.radius + this.spacing;
        ctx.translate(this.x, this.y);
        this.rotate += moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.images.length; i++) {
            const x = adjustedRadius * Math.cos(angle * i);
            const y = adjustedRadius * Math.sin(angle * i);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle * i - this.rotate);

            if (this.images[i]) {
                const imgSize = 250;
                ctx.drawImage(this.images[i], -imgSize / 2, -imgSize / 2, imgSize, imgSize);

                // 별자리 이름과 설명 표시
                ctx.font = '16px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText(this.descriptions[i], 0, imgSize / 2 + 20);
            }

            ctx.restore();
        }

        ctx.restore();
    }
}
