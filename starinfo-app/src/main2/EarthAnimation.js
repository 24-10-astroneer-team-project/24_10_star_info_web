import React, { useEffect } from 'react';
import * as THREE from 'three';

function EarthAnimation() {
    useEffect(() => {
        let scene, camera, renderer, earthMesh, starMesh;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.set(0, 0, 100);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('earth-container').appendChild(renderer.domElement);

            // 지구 메쉬
            const geometry = new THREE.SphereGeometry(15, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
            earthMesh = new THREE.Mesh(geometry, material);
            scene.add(earthMesh);

            // 스타 필드 추가 (BufferGeometry로 변경)
            const starsGeometry = new THREE.BufferGeometry();
            const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
            const starVertices = [];

            for (let i = 0; i < 10000; i++) {
                starVertices.push(
                    Math.random() * 2000 - 1000,
                    Math.random() * 2000 - 1000,
                    Math.random() * 2000 - 1000
                );
            }

            starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
            starMesh = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(starMesh);

            animate();
        };

        const animate = () => {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        init();

        // 리소스 정리
        return () => {
            renderer.dispose();
        };
    }, []);

    return <div id="earth-container" style={{ width: '100%', height: '100vh' }}></div>;
}

export default EarthAnimation;