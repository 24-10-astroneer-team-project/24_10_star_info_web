import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import MapComponent from './components/MapComponents';
import StarMap from "./components/StarMap/StarMap";
import Gps from "./components/Gps"
import Head from "./components/layout/Head";
import Foot from "./components/layout/Foot";
import PlanetPage from "./components/PlanetPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/react/main" element={<MainPage/>}/> {/* 메인 페이지로 라우팅 */}
                <Route path="/react/login" element={<LoginPage/>}/> {/* 로그인 페이지로 라우팅 */}
                <Route path="/react/map" element={<MapComponent/>}/> {/* 지도 컴포넌트 라우트 추가 */}
                <Route path="/react/gps" element={<Gps/>}/> {/* 헤더 페이지로 라우팅 */}
                <Route path="/react/starmap" element={<StarMap/>}/>
                <Route path="/react/planet" element={<PlanetPage/>}/>
                <Route path="/react/head" element={<Head/>}/> {/* 헤더 페이지로 라우팅 */}
                <Route path="/react/foot" element={<Foot/>}/> {/* 헤더 페이지로 라우팅 */}
                <Route path="*" element={<NotFoundPage/>}/> {/* 404 처리 */}
            </Routes>
        </Router>
    );
}



export default App;
