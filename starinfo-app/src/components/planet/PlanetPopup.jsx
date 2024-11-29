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
        desc: '태양에서 가장 가까이 있는 행성인 수성은 언제나 태양 옆에 붙어 다니기 때문에 관측하기가 쉽지 않다. 수성을 볼 수 있는 때는 해가 진 직후 서쪽하늘과, 해가 뜨기 직전 동쪽 하늘에서만 볼 수가 있다. 그리고 망원경으로 수성을 보면 달과 같이 그 위상이 변하는 것을 알 수 있다. 그리고 표면의 모습도 달과 매우 비슷하다.',
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
        desc: '금성은 우리가 흔히 "샛별" 이라고 부르는 행성으로 해 뜨기 전 동쪽 하늘이나 해진 후 서쪽 하늘에서 보인다. 금성은 그냥 보면 하나의 점처럼 보이지만, 망원경으로 보면 달처럼 그 모습이 변하는 위상을 가지고 있다. 금성의 대기는 두꺼운 이산화탄소로 덮여 있기 때문에 망원경으로는 표면이 보이지 않는다. 그래서 관측을 파장이 긴 전파를 사용하고 있다.',
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
        desc: '우리가 살고 있는 푸른 행성이 바로 지구이다. 우주에서 봤을 때 푸른색의 바다와 녹색의 산과 갈색의 흙에 흰색의 구름이 조화를 이루고 있는 아름다운 행성이다. 현재 지구의 나이는 약 46억 년이라고 알려져 있으며, 원시 태양 주위에 있던 엄청난 수의 미행성이 충돌, 뭉쳐져서 원시 지구를 탄생시켰을 것이다. 탄생 직후의 지구는 고온의 마그마 바다였으나 미행성의 충돌이 잠잠해지면서 냉각하기 시작하고 얇은 지각이 형성되었다. 그리고 이산화탄소가 주성분이었던 원시 대기에 비가 내림으로써 바다가 형성되고, 이산화탄소가 바다에 녹아 하늘이 맑아졌을 것이다. 약 35억 년에서 25억 년 전쯤에 지표의 온도가 현재 지구 온도와 가까워졌고 지구 환경도 안정기에 접어들었다. 그리하여 35억 년 전에 비로소 지구에 원시 생명이 탄생한 것으로 추측하고 있다.',
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
    {
        id: '5',
        name: 'Jupiter',
        k_name:'목성',
        diameter: '86,881.4 mi',
        moons: '79',
        desc: '태양계의 5번째 궤도를 돌고 있는 목성은 태양계에서 가장 거대한 행성이다. 목성은 태양계 여덟 개 행성을 모두 합쳐 놓은 질량의 2/3이상을 차지하고 지름이 약 14만 3,000km로 지구의 약 11배에 이른다. 이 거대한 목성은 육안으로도 쉽게 발견할 수 있을 만큼 밝은데, 가장 밝을 때는 -2.5등급을 기록하기도 했다. 또한 목성은 엷은 고리를 가지고 있으며 유명한 네 개의 갈릴레이 위성을 포함해 많은 위성을 지니고 있다. 목성은 태양계의 모든 행성 중에 가장 거대한 구름의 소용돌이를 보여주기도 하는데 이를 대적점이라 한다. 그리고 목성의 표면에는 희거나 적갈색을 띤 띠가 있다.',
        url: planetImages['Jupiter'],
        color: '#c9b5a4',
        tilt: '3.1deg'
    },
    {
        id: '6',
        name: 'Saturn',
        k_name:'토성',
        diameter: '72,367.4 mi',
        moons: '62',
        desc: '토성은 아름다운 고리를 가진 행성으로 많은 사랑을 받는 행성이다. 토성의 고리는 1610년 갈릴레이에 의해 처음 관측되었다. 하지만 망원경의 해상도가 낮아 확실한 모양을 몰랐다. 훗날 그가 죽은 뒤 약 50년 후인 1656년 네덜란드의 천문학자인 호이겐스(Christiaan Huygens)에 의해 그것이 고리라는 것이 밝혀졌다. 토성의 신비는 태양계 탐사 우주선 보이저(voyager) 1,2호에 의해 많이 밝혀졌다. 지금까지 밝혀진 토성의 위성은 수십 개이며, 그 가운데 신비한 위성 타이탄(titan)이 있다. 이 위성은 태양계의 다른 위성 중에서는 보기 힘든 짙은 대기로 감싸여 있다. 그리고 토성은 목성에 이어 태양계에서 두 번째로 크며, 직경은 지구의 약 9.5배, 질량은 약 95배이다. 그리고 태양으로부터 14억km 정도 떨어진 거리에서 약 9.7km/s의 속도로 공전하는 데, 이는 지구 시간으로 대략 29.6년이나 걸린다.',
        url: planetImages['Saturn'],
        color: '#f0e2c4',
        tilt: '26.7deg'
    },
    {
        id: '7',
        name: 'Uranus',
        k_name:'천왕성',
        diameter: '31,518 mi',
        moons: '27',
        desc: '토성의 궤도를 넘어서면 청녹색의 행성 천왕성이 존재한다. 천왕성은 1781년 4월 천문학자이자 음악가인 허셜(William Herschel)에 의해 처음으로 발견되었다. 1781년 3월 그는 쌍둥이자리 근처에서 이상한 천체를 발견하였으나 이를 태양에서 멀리 떨어져 있어 꼬리가 아직 발달되지 않은 혜성일 것이라 생각했다. 이후 꾸준한 관측결과 이 천체가 태양을 중심으로 공전하는 행성인 것을 확인 하였다. 천왕성은 육안이 아닌 망원경으로 발견된 최초의 행성이며, 전 세계 아마추어 천문학자들에게 희망을 주었을 뿐 아니라 발견된 궤도위치가 독일의 천문학자 보데(Johann Elert Bode)가 주장한 보데의 법칙을 증명해주었다 점에서 더 유명해졌다.',
        url: planetImages['Uranus'],
        color: '#b8d8e1',
        tilt: '97.8deg'
    },
    {
        id: '8',
        name: 'Neptune',
        k_name:'해왕성',
        diameter: '30,599 mi',
        moons: '14',
        desc: '허셜이 1781년 토성 궤도 밖에서 천왕성을 발견한 뒤 그 궤도를 추적하던 많은 천문학자들은 원인을 알 수 없는 섭동이 천왕성 궤도에 영향을 주는 것을 알았고, 이에 천왕성 넘어 다른 행성이 존재할 수 있다는 생각을 갖기 시작했다. 1843년 영국의 캠브리지 대학의 아담스(John Adams)는 졸업을 앞두고 천왕성 너머에 미지의 행성이 존재할 것이라고 주장했다. 그러나 아직 어린 학생이라는 이유로 그의 의견은 영국의 왕립 천문학자들에 의해 무시되었고, 1845년 프랑스에서는 과학자인 르베리에(Urbain Leverrier)가 아담스와 같은 결론을 얻어 과학 잡지에 발표했다.',
        url: planetImages['Neptune'],
        color: '#5e73bb',
        tilt: '28.3deg'
    }
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
