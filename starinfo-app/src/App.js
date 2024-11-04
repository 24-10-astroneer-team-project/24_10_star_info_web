import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage'; // 예시로 MainPage 추가
import NotFoundPage from './components/NotFoundPage';
//import AstroInfo from "./components/AstroInfo";
import Head from "./components/layout/Head";
import Foot from "./components/layout/Foot";
import StarMap from "./components/StarMap/StarMap";
import Gps from "./components/Gps"

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/react/main" element={<MainPage />} />   {/* 메인 페이지로 라우팅 */}
              <Route path="/react/logins" element={<LoginPage />} />  {/* 로그인 페이지로 라우팅 */}
              <Route path="/react/starmap" element={<StarMap />} />  {/* 스타맵 페이지로 라우팅 */}
              <Route path="/react/head" element={<Head />} />  {/* 로그인 페이지로 라우팅 */}
              <Route path="/react/footer" element={<Foot />} />  {/* 헤더 페이지로 라우팅 */}
              <Route path="/react/gps" element={<Gps />} />  {/* 헤더 페이지로 라우팅 */}
              <Route path="*" element={<NotFoundPage />} />  {/* 404 처리 */}
          </Routes>
      </Router>
  );
}

export default App;
