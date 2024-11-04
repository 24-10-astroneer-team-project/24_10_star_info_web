// storage.js
export const saveCoordinates = (latitude, longitude) => {
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
};

export const loadCoordinates = () => {
    const latitude = localStorage.getItem('latitude');  //위도
    const longitude = localStorage.getItem('longitude');    //경도
    return { latitude, longitude };
};
