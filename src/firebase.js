import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 프로젝트 설정 정보
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // 템플릿 리터럴 제거
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // 템플릿 리터럴 제거
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

// Google 로그인 함수 (Spring Security OAuth2 엔드포인트로 리다이렉트)
function googleLogin() {
    console.log('%c[INFO] Google 로그인 시도 중...', 'color: blue');
    // Spring Security의 OAuth2 로그인 엔드포인트로 리다이렉트
    window.location.href = "/oauth2/authorization/google";
}

// googleLogin 함수를 전역 스코프에 노출시킴
window.googleLogin = googleLogin;