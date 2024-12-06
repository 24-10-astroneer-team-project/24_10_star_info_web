// memberService.js

import axiosInstance from '../../../api/axiosInstance';

export const fetchMemberDetail = async (userId) => {
    return axiosInstance.get(`/api/member/${userId}`);
};

export const updateFavoriteLocation = async (userId, locationId) => {
    return axiosInstance.post(`/api/member/${userId}/favorite-location/${locationId}`);
};

export const updateLocationDescription = async (locationId, description) => {
    return axiosInstance.patch(`/api/member/location/${locationId}/description`, { description });
};

export const deleteLocation = async (locationId) => {
    return axiosInstance.delete(`/api/location/${locationId}`);
};
