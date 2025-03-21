import axios from 'axios';
import { data } from 'react-router-dom';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const url =
  'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNjMmJiZmU5NzZiOGMzZTliMzVmNTM1MjE2N2U1NSIsIm5iZiI6MTc0MjI0MDc1My43Mjg5OTk5LCJzdWIiOiI2N2Q4N2JmMTEyYzk2N2UyMmNmMTU4ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1JoMVAQzOUrK6aB-gLERA7zb3A3ESpGkExVMAvkEhbk',
  },
};

export const fetchTranding = async page => {
  try {
    const resp = await axios.get('trending/movie/day', {
      params: { page },
      ...options,
    });
    console.log('Trending Movies:', resp.data);
    return resp.data;
  } catch (error) {
    console.error('Ошибка при загрузке популярных фильмов:', error);
    throw error;
  }
};
export const fetchMovieDetails = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNjMmJiZmU5NzZiOGMzZTliMzVmNTM1MjE2N2U1NSIsIm5iZiI6MTc0MjI0MDc1My43Mjg5OTk5LCJzdWIiOiI2N2Q4N2JmMTEyYzk2N2UyMmNmMTU4ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1JoMVAQzOUrK6aB-gLERA7zb3A3ESpGkExVMAvkEhbk',
      },
      params: {
        language: 'en-US',
      },
    });
    console.log('Movie Details:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Ошибка при загрузке данных о фильме:',
      error.response?.data || error.message
    );
    throw error;
  }
};
