import React, { useState, useEffect } from 'react';
import Head from "./layout/Head";
import Foot from "./layout/Foot";
import { saveCoordinates, loadCoordinates } from './storage';
import Main_Button from '../components/layout/Main_Button'; // 임시추가'

function Gps() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [savedCoordinates, setSavedCoordinates] = useState(null);

    useEffect(() => {
        // Load coordinates from localStorage when the component mounts
        const loadedCoordinates = loadCoordinates();
        if (loadedCoordinates.latitude && loadedCoordinates.longitude) {
            setSavedCoordinates(loadedCoordinates);
            setLatitude(loadedCoordinates.latitude);
            setLongitude(loadedCoordinates.longitude);
        }
    }, []);

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save coordinates to localStorage and state
        saveCoordinates(latitude, longitude);
        setSavedCoordinates({ latitude, longitude });

        // Optionally, reset the form if you don’t want to keep the inputs filled
        setLatitude('');
        setLongitude('');
    };

    return (
        <>
            <Head />
            <div style={{ padding: '20px' }}>
                <h1>위도 경도 입력</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            위도:
                            <input
                                type="text"
                                value={latitude}
                                onChange={handleLatitudeChange}
                                placeholder="위도를 입력하세요"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            경도:
                            <input
                                type="text"
                                value={longitude}
                                onChange={handleLongitudeChange}
                                placeholder="경도를 입력하세요"
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">저장</button>
                </form>

                {savedCoordinates && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>현재 저장된 좌표:</h3>
                        <p>위도: {savedCoordinates.latitude}</p>
                        <p>경도: {savedCoordinates.longitude}</p>
                    </div>
                )}
            </div>
            <Foot />
        </>
    );
}

export default Gps;
