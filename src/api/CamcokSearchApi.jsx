import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/search`;

export const getOne = async (tno) => {
  const response = await axios.get(`${prefix}/${tno}`);
  return response.data;
};

// 리스트---
export const getList = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

// 디테일 리스트---
export const details = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/details`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const beach = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/beach`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const island = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/island`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const mountain = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/mountain`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const forest = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/forest`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const valley = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/valley`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const river = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/river`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const lake = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/lake`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const downtown = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/downtown`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const searchout = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/search`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};

export const region = async (page = 1, limit = 10) => {
  const response = await axios.get(`${prefix}/list/region`, {
    params: {
      page: page,
      size: limit,
    },
  });
  return response.data;
};
