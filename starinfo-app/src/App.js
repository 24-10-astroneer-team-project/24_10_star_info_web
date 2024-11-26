import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from "./services/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './components/NotFound/NotFoundPage';
import StarMap from "./components/StarMap/StarMap";
import Head from "./components/layout/Head";
import Foot from "./components/layout/Foot";
import LoginPage from "./components/member/LoginPage";
import PlanetPage from "./components/planet/PlanetPage";
import MainPage from "./components/main/MainPage";
import MapComponent from "./components/API/MapComponents";
import MemberDetail from "./components/member/MemberDetail";
import PrivateRoute from "./components/member/PrivateRoute";
import MeteorShowerPage from "./components/meteorShower/MeteorShowerPage";
// import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/react/main" element={<MainPage/>}/> {/* 메인 페이지로 라우팅 */}
                    <Route path="/react/login" element={<LoginPage/>}/> {/* 로그인 페이지로 라우팅 */}
                    <Route path="/react/map" element={<MapComponent/>}/> {/* 지도 컴포넌트 라우트 추가 */}
                    <Route path="/react/starmap" element={<StarMap/>}/>
                    <Route path="/react/planet" element={<PlanetPage/>}/>
                    <Route path="/react/meteor" element={<MeteorShowerPage />} /> {/* 유성우 페이지 */}
                    <Route
                        path="/react/member/:userId"
                        element={
                            <PrivateRoute>
                                <MemberDetail />
                            </PrivateRoute>
                        }
                    /> {/* 유저 상세 보기 페이지 라우팅 (보호된 경로) */}
                    <Route path="/react/head" element={<Head/>}/> {/* 헤더 페이지로 라우팅 */}
                    <Route path="/react/foot" element={<Foot/>}/> {/* 푸터 페이지로 라우팅 */}
                    <Route path="/react/404" element={<NotFoundPage/>}/> {/* 404 처리 */}
                    <Route path="*" element={<NotFoundPage/>}/> {/* 404 처리 */}
                    {/*<Route path="/Loding" element={<LoadingSpinner />}/> /!*임시 로딩 페이지*!/*/}
                </Routes>

            </Router>
            <ToastContainer />
        </AuthProvider>
    );
}

export default App;
