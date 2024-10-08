// Astronomy.js
function fetchAstronomyData(latitude, longitude, date) {
    // Application ID와 Secret을 Base64로 인코딩
    const applicationId = process.env.REACT_APP_ASTRONOMY_API_ID;
    const applicationSecret = process.env.REACT_APP_ASTRONOMY_API_SECRET_KEY;

    if (!applicationId || !applicationSecret) {
        throw new Error('API Key or Secret is missing');
    }

    // Base64로 인코딩된 인증 문자열 생성
    const authString = btoa(`${applicationId}:${applicationSecret}`);

    // 동적으로 URL에 파라미터 값 추가
    const apiUrl = `https://api.astronomyapi.com/v2/astronomy?lat=${latitude}&long=${longitude}&date=${date}`;

    // Astronomy API 요청 보내기
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
}

export { fetchAstronomyData };
