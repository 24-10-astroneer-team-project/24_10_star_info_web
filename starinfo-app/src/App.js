import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage'; // 예시로 MainPage 추가
import NotFoundPage from './components/NotFoundPage';
import PlanetPage from './components/PlanetPage';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/react/main" element={<MainPage />} />   {/* 메인 페이지로 라우팅 */}
              <Route path="/react/login" element={<LoginPage />} />  {/* 로그인 페이지로 라우팅 */}
              <Route path="*" element={<NotFoundPage />} />  {/* 404 처리 */}
              <Route path="/react/planet" element={<PlanetPage />} />
          </Routes>
      </Router>
  );
}

export default App;
