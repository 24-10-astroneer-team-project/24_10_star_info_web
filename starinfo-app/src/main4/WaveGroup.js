import { Wave } from "./Wave.js"; // 파일명 대소문자 일치

export class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;

        this.color = [
            "rgba(10, 10, 44, 0.6)",   // 깊은 네이비 블루
            "rgba(19, 24, 98, 0.5)",   // 어두운 밤하늘 블루
            "rgba(3, 6, 56, 0.4)"      // 다크 인디고
        ];

        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, this.totalPoints, this.color[i]);
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }
}