import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage'; // 예시로 MainPage 추가
import NotFoundPage from './components/NotFoundPage';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/react/main" element={<MainPage />} />
              <Route path="/react/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />  {/* 404 처리 */}
          </Routes>
      </Router>
  );
}

export default App;
