// memberService.js

import axios from 'axios';

export const fetchMemberDetail = async (userId, accessToken) => {
    return axios.get(`/api/member/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const updateFavoriteLocation = async (userId, locationId, accessToken) => {
    return axios.post(
        `/api/member/${userId}/favorite-location/${locationId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const updateLocationDescription = async (locationId, description, accessToken) => {
    return axios.patch(
        `/api/member/location/${locationId}/description`,
        { description },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

// 위치 삭제 요청
export const deleteLocation = async (locationId, accessToken) => {
    return axios.delete(`/api/location/${locationId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};