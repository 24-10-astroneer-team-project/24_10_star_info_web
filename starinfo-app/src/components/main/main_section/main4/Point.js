// src/main4/point.js
export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.003; // 속도를 원하시는 대로 설정하세요
        this.cur = index;
        this.max = (Math.random() * 50) + 75; // 기존 값의 절반 정도로 설정
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * this.max;
    }
}