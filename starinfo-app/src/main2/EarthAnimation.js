import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

function EarthAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, earthMesh, controls, fontLoader;

        // Scene 설정
        scene = new THREE.Scene();

        // Camera 설정
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 0, 300);

        // Renderer 설정
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        // OrbitControls 설정
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        // Ambient Light 설정
        const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // 빛 강도 증가
        scene.add(ambientLight);

        // Directional Light 설정 (햇빛)
        const light = new THREE.DirectionalLight(0xffffff, 2); // 빛 강도를 높임
        light.position.set(5, 3, 5);
        scene.add(light);

        // 텍스처 로딩 및 Earth 추가
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/ColorMap.jpg', (texture) => {
            texture.colorSpace = THREE.LinearSRGBColorSpace;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        });

        const bumpMap = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/Bump.jpg');
        const specularMap = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/SpecMask.jpg');

        const geometry = new THREE.SphereGeometry(80, 128, 128);
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: bumpMap,
            bumpScale: 1.0,
            specularMap: specularMap,
            specular: new THREE.Color('gray'),
            shininess: 20,
        });

        earthMesh = new THREE.Mesh(geometry, material);
        scene.add(earthMesh);

        // Skybox 추가
        addSkybox(scene);

        // FontLoader로 폰트 불러오기
        fontLoader = new FontLoader();
        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
            const textGeometry = new TextGeometry('Earth', {
                font: font,
                size: 15, // 텍스트 크기 증가
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 2,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            });
            const textMaterial = new THREE.MeshPhongMaterial({ color: 0x0099ff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // 화면 왼쪽 아래 끝 부분에 텍스트 위치 조정
            textMesh.position.set(-120, -80, 0); // 위치를 더 왼쪽 아래로 이동시킴
            scene.add(textMesh);
        });

        // 애니메이션 루프
        const animate = () => {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.001; // 지구 회전
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // 리소스 정리
        return () => {
            renderer.dispose();
        };
    }, []);

    // Skybox 추가 함수
    function addSkybox(scene) {
        const textureLoader = new THREE.CubeTextureLoader();
        const texture = textureLoader.load([
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
        ]);
        scene.background = texture;
    }

    return <div ref={canvasRef} style={{ width: '100%', height: '100vh' }}></div>;
}

export default EarthAnimation;