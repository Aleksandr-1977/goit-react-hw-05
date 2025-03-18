import axios from 'axios';

const API_KEY = 'fgIsut-yOcySJ4AQr0LqvBin1Il4Sp0cn95PcIbLVBA';
axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers = {
  Authorization: `Client-ID ${API_KEY}`,
  'Accept-Version': 'v1',
};
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const response = await axios.get('/search/photos', {
    params: {
      query,

      page,
    },
  });
  return response.data;
};
