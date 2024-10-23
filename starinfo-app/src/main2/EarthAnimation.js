import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect } from 'react';

function EarthAnimation() {
    useEffect(() => {
        const container = document.getElementById('container');
        const scene = new THREE.Scene();

        // 카메라 생성
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 0, 500);

        // 렌더러 생성
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        // 주변광 및 포인트 조명 추가 (지구를 더 밝게)
        const ambientLight = new THREE.AmbientLight(0xaaaaaa); // 주변광을 더 밝게 설정
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 3, 1000); // 직사광 조명 추가
        pointLight.position.set(200, 200, 200);
        scene.add(pointLight);

        // 정면에서 지구를 더 밝게 비추는 조명 추가
        const frontLight = new THREE.DirectionalLight(0xffffff, 2); // 지구 앞쪽을 비추는 조명
        frontLight.position.set(0, 0, 500);
        scene.add(frontLight);

        // 지구 생성
        const earthRadius = 120;
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/ColorMap.jpg');
        const bumpMap = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/Bump.jpg');
        const specularMap = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/SpecMask.jpg');

        const earthMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: bumpMap,
            specularMap: specularMap,
            specular: new THREE.Color(0x444444),
            shininess: 50,
        });

        const earthGeometry = new THREE.SphereGeometry(earthRadius, 128, 128);
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        // 배경에 별 추가 (Skybox)
        const loader = new THREE.CubeTextureLoader();
        const textureCube = loader.load([
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/test.jpg',
        ]);
        scene.background = textureCube;

        // 카메라 제어 추가
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = true;
        controls.enableZoom = false;
        controls.target.copy(new THREE.Vector3(0, 0, 0));

        // 창 크기에 따른 반응형 조정
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);

        // 애니메이션 루프
        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += 0.001;
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div id="container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
}

export default EarthAnimation;