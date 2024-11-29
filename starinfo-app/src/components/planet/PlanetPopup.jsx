import React from 'react';
import './PlanetPopup.css';

// 이미지 파일을 동적으로 불러오는 함수
const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((key) => {
        const fileName = key.replace('./', '').replace('.jpg', ''); // 파일명에서 확장자 제거
        images[fileName] = requireContext(key);
    });
    return images;
};
// planet-img_new 폴더의 모든 이미지를 가져옴
const planetImages = importAll(
    require.context('./planet-img_new', false, /\.jpg$/)
);

// 행성 데이터 (Mercury, Neptune 등)
const planets = [
    {
        id: '1',
        name: 'Mercury',
        k_name:'수성',
        diameter: '3,031.67 mi',
        moons: 'none',
        desc: '수성 설명',
        url: planetImages['Mercury'],
        color: '#999999',
        tilt: '0.034deg'
    },
    {
        id: '2',
        name: 'Venus',
        k_name:'금성',
        diameter: '7,521 mi',
        moons: 'none',
        desc: '금성 설명',
        url: planetImages['Venus'],
        color: '#e8cda2',
        tilt: '177.3deg'
    },
    {
        id: '3',
        name: 'Earth',
        k_name:'지구',
        diameter: '7,917.5 mi',
        moons: '1',
        desc: '지구 설명',
        url: planetImages['Earth'],
        color: '#b3caff',
        tilt: '23.26deg'
    },
    {
        id: '4',
        name: 'Mars',
        k_name:'화성',
        diameter: '4,212 mi',
        moons: '2',
        desc: '화성은 영화와 소설의 소재로 많이 쓰이며, 태양계 행성 중 우리의 관심을 가장 많이 끈 행성이다. 지구에 가장 가까이 있고, 여러 가지 에피소드에 의해 생명의 존재 가능성이 제기되어 신비감과 공포감을 동시에 가져다 준 행성이 바로 화성이다. 이러한 관심은 마리너 6, 7, 8, 9호, 바이킹 1, 2 호 등 많은 우주선들이 화성을 탐사를 이끌어 냈고, 현재 화성에는 생명체가 없다는 것으로 알려지기는 했지만, 계속되는 생명체에 대한 관심과 제2의 지구라는 생각으로 여러 우주선들의 화성 탐사를 유도했다. 그리하여 화성에 대한 더 많은 자료를 확보함으로써 화성 연구에 많은 진척을 가져 왔고, 지금도 우주선들이 화성을 탐사하고 있다.',
        url: planetImages['Mars'],
        color: '#c07158',
        tilt: '25.2deg'
    },
];

// PlanetCard 컴포넌트 정의
const PlanetCard = ({ name, k_name, diameter, moons, desc, url }) => (
    <div>
        {/* 이름과 한글 이름 */}
        <div className="planet-title">
            {name}, {k_name}
        </div>

        {/* 행성 이미지 */}
        <img src={url} alt={name} className="planet-image" />

        {/* Planet Profile */}
        <div className="planet-profile">
            <h3>Planet Profile</h3>
            <p>diameter: {diameter}</p>
            <p>moons: {moons}</p>
        </div>

        {/* 설명 */}
        <div className="planet-description">{desc}</div>

        {/* 관측 정보 버튼 */}
        <div className="planet-button">
            <span>관측 정보 ▷</span>
        </div>
    </div>
);

const PlanetPopup = ({ selectedPlanet, isPlanetPopupOpen, closePlanetPopup }) => {
    if (!isPlanetPopupOpen || !selectedPlanet) return null;

    return (
        <div id="planetPopup" className="planet-popup-bc" onClick={closePlanetPopup}>
            <div
                className="planet-popup"
                onClick={(e) => e.stopPropagation()}
            >
                <PlanetCard
                    name={selectedPlanet.name}
                    k_name={selectedPlanet.k_name}
                    diameter={selectedPlanet.diameter}
                    moons={selectedPlanet.moons}
                    desc={selectedPlanet.desc}
                    url={selectedPlanet.url}
                    tilt={selectedPlanet.tilt}
                    color={selectedPlanet.color}
                />
            </div>
        </div>
    );
};

// 행성 데이터도 내보내기
export { planets, PlanetPopup };
