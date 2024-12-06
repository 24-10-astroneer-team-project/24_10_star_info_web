// api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.astro.qyef.site'
});

api.interceptors.response.use(
    response => response,
    error => {
        // 인증 에러를 확인하여 필요한 정보만 반환
        if (error.response && error.response.status === 401) {
            // 커스텀 예외 또는 상태 코드를 통해 에러 식별
            throw new Error('Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default api;

