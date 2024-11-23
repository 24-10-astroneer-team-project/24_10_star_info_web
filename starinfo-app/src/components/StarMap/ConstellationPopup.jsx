import React, { useState, useEffect, useRef } from 'react';
import './css/ConstellationPopup.css';
import deimg from '../layout/con_icon/detail.png';
import ApiLLPopup from './ApiLLPopup';
import { loadCoordinates } from '../storage';

const icons = require.context('../layout/con_icon', false, /\.png$/);
const constellationImages = require.context('../layout/con_img', false, /\.png$/);
const constellationImages2 = require.context('../layout/con_img2', false, /\.png$/);

const constellationDescriptions = {
    pegasus: {
        name: 'Pegasus',
        name_k: '페가수스자리',
        text_constellation: '페가수스는 페르세우스가 안드로메다를 구하기 위해 괴물고래 케투스(Cetus)와 싸우고 있을 때 그가 들고 있던 메두사의 머리에서 나온 피로 만들어졌다. 메두사는 괴물로 변하기 전 아름다운 처녀였고, 그녀를 매우 좋아했던 바다의 신 포세이돈이 그 피를 안타깝게 여겨 피와 바다의 물거품으로 하늘을 나는 천마 페가수스를 만들었다. 페가수스는 아름다운 처녀였던 메두사의 피로 만들어져서 인지 하얀 눈처럼 아름다운 모습이었다. 지상의 벨레로폰이라는 청년이 지혜의 여신 아테네의 도움으로 페가수스를 얻어 여러 가지 모험들에서 성공할 수 있었다. 마침내 그는 공주와 결혼하게 되었고, 얼마 후 왕의 후계자가 된 벨레로폰은 연이은 승리로 자만심에 빠져버려 자신을 신이라고 생각하기에 이르렀다. 결국 오만에 빠진 그는 신들이 사는 세계로 가기 위해 페가수스를 타고 하늘로 날아올랐다. 이 모습을 지켜보던 제우스는 불쾌한 마음에 페가수스를 놀라게 하여 벨레로폰을 땅에 떨어뜨렸다. 이 별자리는 놀란 페가수스가 은하수 속으로 뛰어들고 있는 모습이다.',
        ra: '22h 37m',
        starCount: '9, 17',
        brightestStar: 'Enif (ε Peg , 2.38 등급)',
        nearestStar: 'ι Peg (38 광년)',
        season: '가을철',
        viewable: 'O(항상 관측 가능)'
    },

    cassiopeia: {
        name: 'Cassiopeia',
        name_k: '카시오페이아자리',
        text_constellation: '에티오피아의 왕비 카시오페이아는 허영심이 강하고 오만했다. 그녀는 자신의 딸 안드로메다(혹은 카시오페이아 본인)가 바다의 정령인 네레이데스보다 더 아름답다고 떠들고 다녔고, 그 이야기를 듣고 분노한 네레이데스들은 포세이돈을 쪼아댔다. 포세이돈은 자신의 아내 암피트리테가 네레이데스인 것도 있고, 포세이돈 자신도 거만한 카시오페이아가 영 못마땅해 네레이데스들의 청을 들어주어 에티오피아 해안에 바다괴물을 보냈다. 이에 에티오피아는 괴물이 일으키는 해일에 시달리게 되었고, 결국 "나라가 망하는 것을 원하지 않는다면 공주를 제물로 내놔라"라는 신탁 때문에 안드로메다를 제물로 바치는 상황에 놓인다. 그 후 카시오페이아와 그의 남편 케페우스는 함께 별자리가 되었으나, 결국 네레이데스들이 원한을 풀지 않아 하루의 반(밤)을 의자에 거꾸로 매달리는 벌을 받게 되었다고 한다. 즉 카시오페이아 자리의 특징적인 W자는 의자에 앉은 카시오페이아가 거꾸로 매달려 있는 모습이다.',
        ra: '0h 52m',
        starCount: '5',
        brightestStar: 'Schedar (α Cas, 2.24 등급)',
        nearestStar: 'η Cas (19 광년)',
        season: '사계절 내내 보이며, 주로 가을철에 잘 보임',
        viewable: 'O(남쪽 부분 제외 항상 관측 가능)'
    },
    cepheus: {
        name: 'Cepheus',
        name_k: '세페우스자리',
        text_constellation: '에티오피아 왕 세페우스의 별자리. 케페우스라고도 불린다. 안드로메다의 아버지이며, 페르세우스의 장인이다. 그리고 서기 3000년경부터 8000년경까지 천구북극은 이 별자리를 통과하게 되며 이 과정에서 이 별자리의 감마별(3번째로 밝은 별) 알라이, 요타별(9번째로 밝은 별), 그리고 알파별(가장 밝은 별) 알데라민이 차례로 북극성이 된다. 남쪽으로 은하수가 지나가 코끼리 몸통 성운등의 성운과 성단들이 많이 존재하며 항성또한 2~3등급의 항성이 많이 분포하고 있어 주변의 카시오페이아자리나 백조자리, 작은곰자리에 비해선 덜하지만 인지도가 있는 편이다.',
        ra: '22h 25m',
        starCount: '7',
        brightestStar: 'Alderamin(α Cep, 2.45 등급)',
        nearestStar: 'Kruger 60 / DO Cep (각각 13.1 광년)',
        season: '사계절 내내 보이며, 주로 가을에 잘 보임',
        viewable: 'O'
    },
    perseus: {
        name: 'Perseus',
        name_k: '페르세우스자리',
        text_constellation: '페르세우스는 그리스 남부 아르고스 왕국에 사는 아크리시우스의 아름다운 딸 다나에와 제우스 사이에서 태어난 아들이다. 아크리시우스는 훗날 자신의 손자가 자신을 죽일 것이라는 신의 계시 때문에 모자(母子)를 모두 상자에 넣어 바다에 버렸다. 세리푸스 섬에 무사히 닿은 페르세우스와 다나에는 그곳에서 살게 되었고 15년 동안 페르세우스는 장성하였다. 어느 날 세리푸스 섬을 다스리는 폴리덱테스 왕이 페르세우스의 어머니인 다나에에 반해 그녀를 차지하려했는데, 페르세우스 때문에 실패하고 말았다. 이 사건으로 폴리덱테스 왕의 미움을 받게 된 페르세우스는 메두사를 없애야 하는 벌을 받게 되었다. 메두사를 원래 아름다운 여인이었으나 자신의 아름다움을 자랑하다가 아테네의 미움을 사 머리카락이 모두 뱀으로 변해 버렸고, 그녀의 눈을 쳐다본 사람은 모두 돌로 변해 버리는 마력을 갖게 된 괴물이다. 페르세우스는 아테네 여신이 준 거울처럼 빛나는 방패와 전령의 신 헤르메스가 준 날개 달린 신발로 무장을 하고 메두사를 무찔렀다. 메두사의 머리를 잘라 돌아가던 길에 바다 괴물의 제물이 될 뻔한 안드로메다 공주를 구하고 세페우스와 카시오페이아의 사위가 되었다. 훗날 페르세우스와 안드로메다가 죽게 되었을 때 아테네 여신은 이들을 세페우스, 카시오페이아, 고래가 있는 곳에 두 개의 별자리로 만들어 주었다.',
        ra: '3h 31m',
        starCount: '19',
        brightestStar: 'Mirfak (α Per, 1.79 등급)',
        nearestStar: 'ι Per (34 광년)',
        season: '가을철~겨울철',
        viewable: 'O(항상 관측 가능)'
    },
    auriga: {
        name: 'Auriga',
        name_k: '마차부자리',
        text_constellation: '헤파이토스와 지혜의 여신 아테네 사이에서 태어나고, 나중에 어머니인 아테네의 뒤를 이어 아테네도시의 왕이 된 에릭토니도스는 다리가 불편했다. 그리하여 자신의 불편한 다리를 보충하기 위해 4두마차를 발명하고 이것을 자주 이용했다고 한다. 이에 제우스가 그의 발명을 크게 여겨 하늘에 올려 별자리로 만든 것이 마차부자리 라고 한다.',
        ra: '5h 57m',
        starCount: '5, 8',
        brightestStar: 'α Aur Capella (α Aur, 0.08 등급)',
        nearestStar: 'Gliese 268(19.741광년)',
        season: '겨울철',
        viewable: 'O(항상 관측 가능)'
    },
    taurus: {
        name: 'Taurus',
        name_k: '황소자리',
        text_constellation: '황소자리의 황소는 바람기 많은 제우스가 페니키아의 공주 에우로페를 유혹하기 위해 변한 모습이다. 제우스는 바닷가에서 놀고 있는 에우로페의 아름답고 우아한 모습에 반해버려 곧 사랑에 빠졌고, 에우로페를 유혹하기 위해 눈부신 하얀 소로 변신하여 왕의 소떼 속으로 들어갔다. 제우스의 의도대로 에우로페 공주는 많은 소들 중에서 멋진 흰 소를 발견하였고, 눈부신 소의 아름다움에 사로잡혀 흰 소 곁으로 다가갔다. 에우로페가 다가가 장난치듯 황소 등에 올라타자 흰 소는 기다렸다는 듯이 바다로 뛰어들어 크레테섬까지 헤엄쳐 갔다. 크레테에 도착한 제우스는 본래의 모습을 드러내고 에우로페를 설득시켜 아내로 맞이하였다. 그녀는 죽은 뒤 신으로서 숭배되었고, 황소는 하늘로 올라가 황소자리가 되었다고 한다.',
        ra: '4h 6m',
        starCount: '19',
        brightestStar: 'Aldebaran (α Tau, 0.85 등급)',
        nearestStar: 'Gliese 176 (31 광년)',
        season: '겨울철',
        viewable: 'O'
    },
    orion: {
        name: 'Orion',
        name_k: '오리온자리',
        text_constellation: '그리스의 오리온은 바다의 신 포세이돈의 아들로 뛰어난 사냥꾼이었다. 달과 사냥의 여신인 아르테미스는 오리온과 사랑하는 사이였으나, 아르테미스의 오빠인 아폴론은 이들의 사랑을 탐탁하지 않게 생각하였다. 오리온을 싫어하게 된 아폴론은 어느 날 바다 멀리서 사냥을 하고 있는 오리온을 발견하고 오리온을 과녁 삼아 동생과 내기를 청한다. 오리온인 줄 모르는 아르테미스는 사냥의 여신답게 오리온의 머리를 정확히 명중 시켰다. 나중에 자신이 쏘아 죽인 것이 오리온이라는 것을 알게 된 아르테미스는 비탄에 빠졌고, 아르테미스의 슬픔을 달래주기 위해 제우스는 오리온을 밤하늘의 별자리로 만들었다고 한다.',
        ra: '5h 34m',
        starCount: '7',
        brightestStar: 'Rigel (β Ori, 0.12 등급)',
        nearestStar: 'GJ 3379 (17 광년)',
        season: '겨울철',
        viewable: 'O'
    },
    gemini: {
        name: 'Gemini',
        name_k: '쌍둥이자리',
        text_constellation: '카스토르와 폴룩스는 스파르타의 왕비 레다와 고니로 변신한 제우스 사이에서 태어났다. 카스토르는 말 타기에 능했고, 폴룩스는 권투와 무기를 다루는 것에 뛰어난 재능이 있었다. 또한 폴룩스는 불사신의 몸을 가지고 있는 것으로 알려져 있다. 카스토르가 죽게 되자 폴룩스 역시 슬픔을 이기지 못하고 죽음을 선택하게 된다. 하지만 불사의 몸을 가진 폴룩스는 마음대로 죽을 수도 없는 운명이었다. 결국 폴룩스는 제우스에게 자신의 죽음을 부탁했고, 이들 형제의 우애에 감동한 제우스는 카스토르와 폴룩스를 두 개의 밝은 별로 만들어 형제의 우애를 영원히 기리도록 하였다. 쌍둥이자리는 쌍둥이 형제인 카스토르와 폴룩스의 우애에 감동한 제우스가 이를 기리기 위해 만든 별자리이다. ',
        ra: '6h 51m',
        starCount: '8,17',
        brightestStar: 'Pollux(β Gem, 1.15 등급)',
        nearestStar: 'GJ 251 (18.21 광년)',
        season: '겨울철',
        viewable: 'O'
    },
    cancer: {
        name: 'Cancer',
        name_k: '게자리',
        text_constellation: '헤라클레스는 에우리테우스 왕의 속박으로부터 풀려나기 위해 12가지 시련을 겪었다. 그 중 두 번째가 괴물 물뱀 히드라를 물리치는 것이었다. 헤라클레스가 히드라를 잡기 위해 네메아 계곡에서 물뱀과 30일 간의 대 혈전을 벌이고 있을 때 평소 헤라클레스를 미워하던 헤라는 물뱀을 돕기 위해 게 한 마리를 보냈다. 게는 여신의 명령대로 헤라클레스의 발가락을 무는데 성공했지만, 결국은 그의 발에 밟혀 한 쪽 발이 부러진 채 죽고 말았다. 헤라가 자신을 위해 싸우다 죽은 게에 대한 보답으로 그 시체를 올려 하늘의 별자리로 만든 것이 게자리라고 전해진다.',
        ra: '8h 30m',
        starCount: '5',
        brightestStar: 'Al Tarf (β Cnc, 3.53 등급)',
        nearestStar: 'DX Cnc (11.82 광년)',
        season: '겨울철',
        viewable: 'O'
    },
    ursa_major: {
        name: 'Ursa_Major',
        name_k: '큰곰자리',
        text_constellation: '칼리스토는 빼어난 외모에 사냥 솜씨가 뛰어났던 아르카디아의 공주였다. 칼리스토의 미모에 반한 제우스는 그녀를 유혹했고, 신의 사랑을 뿌리칠 수 없었던 칼리스토는 제우스와의 사랑을 통해 아르카스를 낳았다. 이것을 알게 된 제우스의 아내 헤라는 칼리스토를 흰곰으로 만들었다. 모친을 잃은 칼리스토의 아들 아르카스는 착한 농부의 손에서 키워졌고 엄마의 사냥 솜씨를 이어받아 훌륭한 사냥꾼으로 자랐다. 그러던 어 날 숲 속에서 곰으로 변한 칼리스토는 사냥 나온 아들 아르카스와 마주치게 되고, 반가운 나머지 자신이 곰이라는 것을 인식하지 못하고 아르카스를 껴안기 위해 달려들었다. 이 사실을 알 리 없는 아르카스는 사나운 곰이 자신을 공격하는 것으로 생각하고 활시위를 당겼다. 이 광경을 보다 못한 제우스는 둘을 하늘에 올려 별자리로 만들었다. 큰곰자리는 칼리스토가 별자리가 된 모습이라고 전해진다. 하늘로 올라간 칼리스토가 곰이 되기 전보다 더 아름답게 빛나자, 질투의 여신 헤라는 이것을 질투하였고, 대양의 신 포세이돈에게 부탁하여 이들이 물을 마시지 못하게 해달라고 부탁했다. 결국 이들 모자(母子)는 북극의 하늘만 맴돌게 되었다.',
        ra: '10h 16m',
        starCount: '7, 20',
        brightestStar: 'Alioth (ε UMa, 1.76 등급)',
        nearestStar: 'Lalande 21185 (8.29 광년)',
        season: '사계절 내내 보이며, 주로 봄에 잘 보임',
        viewable: 'O(북쪽 부분 일부만 항상 관측 가능)'
    },
    ursa_minor: {
        name: 'Ursa_Minor',
        name_k: '작은곰자리',
        text_constellation: '칼리스토는 빼어난 외모에 사냥 솜씨가 뛰어났던 아르카디아의 공주였다. 칼리스토의 미모에 반한 제우스는 그녀를 유혹했고, 신의 사랑을 뿌리칠 수 없었던 칼리스토는 제우스와의 사랑을 통해 아르카스를 낳았다. 이것을 알게 된 제우스의 아내 헤라는 칼리스토를 흰곰으로 만들었다. 모친을 잃은 칼리스토의 아들 아르카스는 착한 농부의 손에서 키워졌고 엄마의 사냥 솜씨를 이어받아 훌륭한 사냥꾼으로 자랐다. 그러던 어 날 숲 속에서 곰으로 변한 칼리스토는 사냥 나온 아들 아르카스와 마주치게 되고, 반가운 나머지 자신이 곰이라는 것을 인식하지 못하고 아르카스를 껴안기 위해 달려들었다. 이 사실을 알 리 없는 아르카스는 사나운 곰이 자신을 공격하는 것으로 생각하고 활시위를 당겼다. 이 광경을 보다 못한 제우스는 둘을 하늘에 올려 별자리로 만들었다. 작은곰자리는 아르카스가 별자리가 된 모습이라고 전해진다. 또한 제우스가 이들의 꼬리를 잡아 들어올렸기 때문에 꼬리가 무척 길어졌다고 한다. 하늘로 올라간 칼리스토가 곰이 되기 전보다 더 아름답게 빛나자, 질투의 여신 헤라는 이것을 질투하였고, 대양의 신 포세이돈에게 부탁하여 이들이 물을 마시지 못하게 해달라고 부탁했다. 결국 이들 모자(母子)는 북극의 하늘만 맴돌게 되었다.',
        ra: '14h 58m',
        starCount: '7',
        brightestStar: 'Polaris (α UMi, 1.97 등급)',
        nearestStar: 'WISE 1506+7027 (11.1 광년)',
        season: '사계절 내내 보이며, 주로 봄에 잘 보임',
        viewable: 'O(항상 관측 가능)'
    },
    leo: {
        name: 'Leo',
        name_k: '사자자리',
        text_constellation: '하늘이 혼란스러워 별들이 자리를 떠나고 혜성이 자주 나타나던 때 달에서 유성 하나가 황금사자의 모습으로 네메아 골짜기에 떨어졌다. 유성이 변하여 된 이 사자는 지구의 사자보다 훨씬 컸고, 성질도 포악하여 당시 네메아 사람들에게 많은 고통을 주었다. 그 당시 제우스와 알크메나 사이에서 태어난 헤라클레스는 제우스의 아내 헤라의 미움을 받아 12가지의 모험을 해야 했는데 그 중 첫 번째가 네메아 골짜기의 사자를 죽이는 일이었다. 헤라클레스는 활과 창, 방망이 등을 사용하여 사자와 싸워보았지만 어떤 무기로도 결코 사자를 이길 수 없었다. 헤라클레스는 무기를 버리고 사자와 뒤엉켜 생사를 가르는 격투를 벌인 끝에 사자를 물리칠 수 있었다. 그 후로 네메아 지방 사람들은 사자의 공포에서 벗어나 평온을 되찾을 수 있었고, 헤라클레스는 어떠한 무기로도 뚫을 수 없는 사자 가죽을 얻게 되었다. 제우스는 아들 헤라클레스의 용맹을 기리기 위하여 사자를 하늘의 별자리로 만들었다고 한다.',
        ra: '10h 0m',
        starCount: '9, 15',
        brightestStar: 'Regulus (α Leo, 1.36 등급)',
        nearestStar: 'Wolf 359 (7.78 광년)',
        season: '봄철',
        viewable: 'O'
    },
    virgo: {
        name: 'Virgo',
        name_k: '처녀자리',
        text_constellation: '제우스 신과 거인 타이탄족의 여신 테미스 사이에서 태어난 아스트라이아는 정의의 여신이었다. 먼 옛날 \'금의 시대\'에는 신과 사람들이 어울려 지상에서 살고 있었다. 그러나 얼마 후 지상에 계절이 생기고 농업이 시작되면서 사람들 사이에서 분쟁과 싸움이 일어나자 신들은 지상을 버리고 하늘로 돌아가 버렸다. 그러나 아스트라이아만은 인간을 믿고 지상 살면서 열심히 정의의 길을 설명하였다. 이 시대를 \'은의 시대\'라 한다. 이윽고 \'동의 시대\'가 되자 인간은 거짓과 폭력을 일삼게 되어 친구와 부모 형제들까지도 피를 흘리며 서로 죽이게 되자, 아스트라이아도 끝내 참지 못하고 하늘로 돌아가 버렸다. 처녀자리는 이 아스트라이아의 모습이라고 한다. 그런데 실은 아스트라이아는 \'별\'이라는 뜻이다. 보통 서양에서는 정의의 여신이 칼과 천칭을 들고 있으나, 옛 별자리 그림의 처녀자리는 보리 이삭을 든 여신의 모습이 그려져 있다. 여기서 이 여신은 식물의 싹틈과 곡물의 수확을 맡아보는 대지의 여신 데메테르라고도 하고, 또는 그의 딸 페르세포네라기도 한다.\n' +
            '\n' +
            '대지의 여신 데메테르의 딸 페르세포네에 관한 이야기는 다음과 같다.\n' +
            '\n' +
            '페르세포네는 지하세계의 왕인 하데스의 마음을 사로잡을 정도로 아름다운 여인이었다. 페르세포네의 아름다움에 반한 하데스는 그녀를 납치하여 자신의 아내로 삼았다. 페르세포네는 지하세계에서 부족할 것 없는 생활을 하였지만 가끔씩 땅위의 풍경들을 생각할 때면 깊은 슬픔에 잠기곤 하였다. 한편 페르세포네가 지하세계로 납치된 후 딸을 잃은 데메테르는 비탄에 빠졌고 토지의 여신이 슬퍼하자 대지는 황폐해졌고 사람과 동물들이 살 수 없는 지경에 이르게 되었다. 신들의 왕인 제우스는 이를 방관할 수 없어 지하세계의 왕이자 자신의 형인 하데스를 설득하였다. 결국 제우스의 도움으로 페르세포네는 일 년의 반 동안만 지하세계에 있고 나머지 반은 지상에서 어머니와 함께 지낼 수 있게 되었다. 딸을 만나게 되어 데메테르의 슬픔이 가시게 되면 땅은 다시 활기를 찾게 된다. 봄이 되면 동쪽하늘로 떠오르는 처녀자리는 지하세계에서 올라오는 페르세포네의 모습인 것이다.',
        ra: '13h 21m',
        starCount: '9, 15',
        brightestStar: 'Spica (α Vir, 0.98 등급)',
        nearestStar: 'Ross 128 (10.89 광년)',
        season: '봄철',
        viewable: 'O'
    },
    draco: {
        name: 'Draco',
        name_k: '용자리',
        text_constellation: '그리스 신화에 따르면 용자리의 주인공은 아틀라스의 딸 헤스페리데스의 황금 사과를 지키는 용으로 나타나 있다. 자유를 얻기 위한 헤라클레스의 12가지 시련 중 열한 번째의 고역이 이 황금 사과를 가져오는 것이었는데, 헤라클레스는 무사히 용을 물리치고 황금 사과를 얻어내어 열한 번째 모험을 끝마쳤다. 헤라클레스의 아버지 제우스는 이 승리를 기념하기 위해 용을 하늘에 올려 용자리를 만들었다고 한다.',
        ra: '17h 57m',
        starCount: '14',
        brightestStar: 'Eltanin (γ Dra, 2.24 등급)',
        nearestStar: 'HD 173739 & HD 173740 (11.5 광년)',
        season: '사계절 내내 보이며, 주로 여름에 잘 보임',
        viewable: 'O'
    },
    bootes: {
        name: 'Bootes',
        name_k: '목동자리',
        text_constellation: '아틀라스는 우주에 처음 나타난 하늘의 신 우라노스의 아들인데, 크로노스(제우스의 아버지)의 형제라고도 하고, 또는 우라노스의 손자로서 크로노스의 조카라고도 한다. 어쨌든지 우라노스의 자손인 거인, 즉 타이탄족 가운데서 가장 유명한 사람의 하나였다. 나중에 제우스가 올림포스의 신들을 거느리고 거인족과 싸웠을 때 아틀라스는 거인족을 지휘하여 제우스를 크게 괴롭혔다. 그래서 그 형벌로 별자리로 만들어 영원히 하늘을 짊어질 운명이 되었다고 한다.',
        ra: '14h 41m',
        starCount: '7, 15',
        brightestStar: 'Arcturus (α Boo, −0.04 등급)',
        nearestStar: 'ξ Boo (22.01 광년)',
        season: '봄철~초여름',
        viewable: 'O'
    },
    corona_borealis: {
        name: 'Corona_Borealis',
        name_k: '북쪽왕관자리',
        text_constellation: '여름 하늘의 별자리 중 가장 아름다운 별자리인 왕관자리의 주인공은 크레타 섬의 공주 아리아드네이다. 이 왕관은 그녀가 테세우스에게 버림받고 슬픔에 빠져 있을 때 그녀를 위로해준 술의 신 디오니수스로부터 결혼 선물로 받은 7개의 보석이 박힌 금관이다. 아리아드네가 늙어서 죽게 되었을 때 디오니수스는 그녀에 대한 사랑을 영원히 간직하기 위해 이 금관을 하늘에 올려 별자리로 만들었다고 한다.',
        ra: '15h 53m',
        starCount: '8',
        brightestStar: 'Alphecca (α CrB, 2.24 등급)',
        nearestStar: 'ρ CrB (57 광년)',
        season: '봄철~여름철',
        viewable: 'O'
    },
    hercules: {
        name: 'Hercules',
        name_k: '헤라클레스자리',
        text_constellation: '헤라클레스는 제우스와 알크메나 사이에서 태어난 아들로, 어려서부터 제우스의 정실인 헤라의 미움을 피할 수 없었다. 청년으로 자란 후에는 헤라의 꾐으로 노예가 되었는데 자유를 얻기 위해 12가지의 위험한 모험을 강제로 하게 되었다. 이것이 \'헤라클레스의 12가지 시련\'이다. 12가지 시련을 통해 헤라클레스는 에우리테우스 왕의 지배에서 벗어날 수 있었다. 그 후 데자니라와 결혼했는데 이것이 간접적으로 헤라클레스의 죽음을 불러왔다. 어느 날 헤라클레스가 강을 건널 때 네수스라는 반인 반마의 켄타우로스에게 아내를 건너게 해줄 것을 부탁하였는데 처음에 네수스는 이를 허락하는 듯 하였으나 강의 중심에 이르자 데자니라를 데리고 강물 밑으로 도망치려했다. 이것을 본 헤라클레스는 단 한 번의 화살로 네수스를 죽였다. 죽기 직전 네수스는 자신의 피를 데자니라에게 주며 그것이 헤라클레스의 사랑을 영원히 지켜줄 것이라고 했다. 언젠가 헤라클레스의 사랑이 의심스러울 때 그의 의복에 그 피를 묻히면 영원히 그가 그녀에게 충실할 것이라고 말했다. 얼마 후, 데자니라는 헤라클레스와 노예 소녀가 사랑에 빠졌다는 의심이 들어 네수스의 피를 발랐고, 그것은 죽음의 옷이 되어 헤라클레스를 죽이고 말았다. 이것을 본 제우스가 하늘에서 내려와 아들의 몸을 하늘에 올려 별 사이에 놓은 것이 헤라클레스자리라고 전해진다.',
        ra: '17h 26m',
        starCount: '14, 22',
        brightestStar: 'Kornephoros (β Her, 2.78 등급)',
        nearestStar: 'Gliese 623 (26 광년)',
        season: '여름철',
        viewable: 'O'
    },
    lyra: {
        name: 'Lyra',
        name_k: '거문고자리',
        text_constellation: '그리스 신화에서 거문고는 헤르메스가 거북 껍질과 소의 창자로 만들어서 아폴론에게 선물한 하프이다. 아폴론은 그 하프를 음악의 천재인 아들 오르페우스에게 주었다. 오르페우스에게는 에우리디케라는 아름다운 아내가 있었는데 불행히도 그녀가 뱀에 물려 죽고 말았다. 아내를 너무나도 사랑한 오르페우스는 슬픔을 참지 못하고 지하세계로 에우리디케를 찾아 나섰다. 오르페우스는 지하세계의 왕 하데스와 그의 아내 페르세포네 앞에서 거문고를 연주하며 에우리디케를 돌려줄 것을 간청했다. 오르페우스의 연주와 사랑에 감동한 페르세포네는 에우리디케를 데려가도 좋다고 허락하고 단, 땅위에 이를 때까지 뒤를 돌아보지 말라는 조건을 붙인다. 거의 땅 위에 다다를 무렵 아내가 뒤따라오는지 걱정이 되어 뒤를 돌아보는 순간 에우리디케는 다시는 돌아올 수 없는 어둠 속으로 사라지고 말았다. 그 후 오르페우스도 실의에 빠져 결국 죽고 말았다. 한편, 주인을 잃은 거문고에서는 슬프고 아름다운 음악이 계속 흘러나왔고, 오르페우스의 음악에 매료되었던 제우스는 그의 거문고를 하늘에 올려 모든 사람들이 영원히 그의 음악을 기억하게 하였다고 한다.',
        ra: '18h 54m',
        starCount: '5',
        brightestStar: 'Vega (α Lyr, 0.03 등급)',
        nearestStar: '2MASS 1835+3259 (18.5 광년)',
        season: '여름철',
        viewable: 'O'
    },
    delphinus: {
        name: 'Delphinus',
        name_k: '돌고래자리',
        text_constellation: '코린트의 페리안데르 궁궐에 그리스 제일의 하프 연주자인 아리온이 살고 있었다. 아리온은 우연히 시실리에서 열린 음악회에 참가하여 많은 명성을 얻었고 아리온의 음악에 감동한 시실리의 사람들은 그 음악에 대한 보답으로 그가 돌아갈 때 많은 보물을 주었다. 이 보물들은 싣고 돌아오던 중 보물을 탐낸 뱃사람이 폭동을 일으키고 그를 바다에 빠뜨리려했다. 아리온은 마지막으로 하프 연주를 할 수 있게 해달라고 애원했고, 선원들은 유명한 음악가의 연주를 들을 수 있다는 생각에 그의 청을 허락했다. 아리온의 애절하고 아름다운 하프연주는 하늘에 있는 새와 바다의 물고기들을 모여들게 만들었다. 연주를 마치고 아리온이 바다에 뛰어들었을 때 마침 뒤를 따르던 돌고래 한 마리가 그를 싣고 무사히 해변까지 데려다 주었다. 아리온은 돌고래에 의해 기적적으로 구출된 추억을 기리기 위해 청동으로 \'사람을 태운 돌고래 상\'을 타에하룬 사원에 세웠고, 신들은 아리온을 구해준 돌고래를 하늘의 별자리로 만들어 영원히 빛나게 하였다고 한다.',
        ra: '20h 40m',
        starCount: '5',
        brightestStar: 'Rotanev (β Del, 3.62 등급)',
        nearestStar: 'WISE 2056+1459 (22.6 광년)',
        season: '여름철',
        viewable: 'O'
    },
    cygnus: {
        name: 'Cygnus',
        name_k: '백조자리',
        text_constellation: '백조자리는 독수리자리와 마찬가지로 제우스가 변신한 모습이다. 제우스는 스파르타의 왕비 레다의 아름다움에 빠져 그녀를 유혹하게 되었다. 하지만 질투가 심한 아내 헤라에게 들킬 것을 염려한 제우스는 그녀를 만나러 갈 때면 백조로 탈바꿈하여 올림푸스 산을 빠져 나오곤 했다. 제우스의 사랑을 받아들인 레다는 두 개의 알을 낳게 되는데 그중 하나에서는 카스트로란 남자아이와 크리타이메스타라는 여자아이가 나왔고, 다른 하나에서는 폴룩스라는 남자아이와 헬렌이라는 여자아이가 태어났다. 이들이 자라서 카스트로와 폴룩스는 로마를 지켜주는 위대한 영웅이 되었고, 헬렌은 절세의 미인으로 트로이전쟁의 원인이 되었다.',
        ra: '20h 36m',
        starCount: '9',
        brightestStar: 'Deneb (α Cyg, 1.21~1.29 등급)',
        nearestStar: '61 Cyg(11.404 광년)',
        season: '여름철',
        viewable: 'O'
    },
};


const ConstellationPopup = ({ constellationId, isVisible, closePopup }) => {
    const [activeTab, setActiveTab] = useState('legend');
    const [fade, setFade] = useState(false);
    const [showApiLLPopup, setShowApiLLPopup] = useState(false);
    const popupRef = useRef(null);
    const [popupStyle, setPopupStyle] = useState({}); // 위치 조정을 위한 스타일 상태

    const {
        name = '',
        name_k = '',
        text_constellation = '',
    } = constellationDescriptions[constellationId] || {};

    const rightIconPath = name ? icons(`./${name}.png`) : null;
    const constellationImagePath = name ? constellationImages(`./${name}.png`) : null;
    const constellationInfoImagePath = name ? constellationImages2(`./${name}.png`) : null;

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setFade(true);
            setTimeout(() => {
                setActiveTab(tab);
                setFade(false);
            }, 300);
        }
    };

    const handleIconClick = () => {
        setShowApiLLPopup(!showApiLLPopup);
    };

    const closeApiLLPopup = () => {
        setShowApiLLPopup(false);
    };

    const coordinates = loadCoordinates();

    useEffect(() => {
        if (popupRef.current && showApiLLPopup) {
            const rect = popupRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setPopupStyle({
                top: `${centerY}px`,
                left: `${centerX}px`,
                transform: 'translate(-50%, -50%)',
            });
        }
    }, [showApiLLPopup]);

    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    // Add event listener for Esc key to close the popup
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isVisible) {
                closePopup();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, closePopup]);

    return isVisible ? (
        <>
            <div className="popup-container" ref={popupRef}>
                <div className="name">{name}</div>
                <div className="header-popup">
                    <div className="icon-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img src={deimg} alt="detail icon" className="detail_icon" onClick={handleIconClick} />
                        {showTooltip && (
                            <div className="tooltip">
                                입력한 선호 위치에 따른 별자리 관측 정보를 볼 수 있습니다.
                            </div>
                        )}
                    </div>
                    <div className="name_k">{name_k}</div>
                    {rightIconPath && <img src={rightIconPath} alt={`${name} icon`} className="con_icon" />}
                </div>
                <hr />
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'legend' ? 'active' : ''}
                        onClick={() => handleTabChange('legend')}
                    >
                        별자리 전설
                    </button>
                    <button
                        className={activeTab === 'info' ? 'active' : ''}
                        onClick={() => handleTabChange('info')}
                    >
                        별자리 정보
                    </button>
                </div>
                <div className={`content-container ${fade ? 'fade-out' : 'fade-in'}`}>
                    {activeTab === 'legend' ? (
                        <>
                            <div className="image-container">
                                {constellationImagePath && (
                                    <img src={constellationImagePath} alt={`${name} constellation`} className="con_image" />
                                )}
                            </div>
                            <div className="text_constellation">{text_constellation}</div>
                        </>
                    ) : (
                        <>
                            <div className="image-container">
                                {constellationInfoImagePath && (
                                    <img src={constellationInfoImagePath} alt={`${name} constellation map`} className="con_image" />
                                )}
                            </div>
                            <div className="constellation-info">
                                <p>적경: {constellationDescriptions[constellationId]?.ra}</p>
                                <p>주요 별 수: {constellationDescriptions[constellationId]?.starCount}</p>
                                <p>가장 밝은 별: {constellationDescriptions[constellationId]?.brightestStar}</p>
                                <p>가장 가까운 별: {constellationDescriptions[constellationId]?.nearestStar}</p>
                                <p>관측 시기: {constellationDescriptions[constellationId]?.season}</p>
                                <p>관측 가능 여부: {constellationDescriptions[constellationId]?.viewable}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ApiLL Popup */}
            {showApiLLPopup && (
                <ApiLLPopup
                    isVisible={showApiLLPopup}
                    coordinates={coordinates}
                    constellationName={name_k}
                    closePopup={closeApiLLPopup}
                    parentRef={popupRef}
                    style={popupStyle} // 전달된 스타일 적용
                />
            )}
        </>
    ) : null;
};

export default ConstellationPopup;
