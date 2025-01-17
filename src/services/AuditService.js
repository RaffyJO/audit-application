import { axiosInstance } from '../utils/axios';

export const fetchAudits = async (token) => {
  try {
    const response = await axiosInstance.get('/audits', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching audits:', error);
    throw error;
  }
};

export const fetchHistoryAudits = async (token, limit = 3) => {
  try {
    const response = await axiosInstance.get('/audits/all?limit=' + limit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching history audits:', error);
    throw error;
  }
};

export const createAudit = async (token, data) => {
  try {
    const response = await axiosInstance.post('/audits', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating audit:', error);
    throw error;
  }
};

export const updateAudit = async (token, id, data) => {
  try {
    const response = await axiosInstance.put(`/audits/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating audit:', error);
    throw error;
  }
};