import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "./services/AuthProvider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './components/NotFoundPage';
import StarMap from "./components/StarMap/StarMap";
import Head from "./components/layout/Head";
import Foot from "./components/layout/Foot";
import LoginPage from "./components/member/LoginPage";
import PlanetPage from "./components/planet/PlanetPage";
import MainPage from "./components/main/MainPage";
import MapComponent from "./components/API/MapComponents";
import Gps from "./components/StarMap/Gps";


function App() {
    return (
        <AuthProvider>
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
            <ToastContainer />
        </AuthProvider>
    );
}


export default App;
