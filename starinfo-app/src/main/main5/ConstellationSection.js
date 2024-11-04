// src/main/main5/ConstellationSection.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ConstellationSection.css';

function ConstellationSection() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, Renderer 초기화
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // 별 모양의 Sprite와 Glow 효과 추가
        const starTexture = new THREE.TextureLoader().load('path/to/star_texture.png'); // 별 텍스처 이미지 추가
        const starMaterial = new THREE.SpriteMaterial({ map: starTexture, color: 0xffffff });

        const stars = new THREE.Group();
        for (let i = 0; i < 100; i++) {
            const star = new THREE.Sprite(starMaterial);
            star.position.set(
                THREE.MathUtils.randFloatSpread(20),
                THREE.MathUtils.randFloatSpread(20),
                THREE.MathUtils.randFloatSpread(20)
            );
            star.scale.set(0.5, 0.5, 0.5); // 별 크기 설정
            stars.add(star);
        }
        scene.add(stars);

        // 12궁 별자리 회전 효과 추가
        const constellationGroup = new THREE.Group();
        const zodiacPositions = [
            [5, 0, 0], [-5, 0, 0], [0, 5, 0], [0, -5, 0],
            [3.5, 3.5, 0], [-3.5, -3.5, 0], [-3.5, 3.5, 0], [3.5, -3.5, 0],
            [0, 0, 5], [0, 0, -5], [2.5, 0, 2.5], [-2.5, 0, -2.5]
        ];

        zodiacPositions.forEach((position, index) => {
            const star = new THREE.Sprite(starMaterial.clone());
            star.position.set(...position);
            constellationGroup.add(star);
        });
        scene.add(constellationGroup);

        // 애니메이션 루프
        function animate() {
            requestAnimationFrame(animate);
            stars.rotation.y += 0.001; // 별들이 천천히 회전
            constellationGroup.rotation.y += 0.002; // 별자리 회전
            renderer.render(scene, camera);
        }
        animate();

        // 클린업
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="constellation-section"></div>;
}

export default ConstellationSection;
