import * as PIXI from "pixi.js";

const FRICTION = 0.98;
const COLOR_SPEED = 0.05;  // 컬러 변화 속도 느리게
const MOVE_SPEED = 0.5;    // 움직임 속도 느리게

export class Particle {
    constructor(pos, texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.06);

        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 10;

        this.savedRgb = 0x4472c4;  // 파란색 (처음 색상)
        this.rgb = 0x4472c4;
    }

    collide() {
        this.rgb = 0xf4d03f;  // 충돌 시 금색으로 변화
    }

    draw() {
        this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

        this.x += (this.savedX - this.x) * MOVE_SPEED;
        this.y += (this.savedY - this.y) * MOVE_SPEED;

        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.tint = this.rgb;
    }
}