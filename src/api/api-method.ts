import axios from 'axios';

export const getAPI = (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'GET',
        url: url,
      });
      resolve(response.data);
    } catch (error) {
      reject(
        error && error.response && error.response.data
          ? error.response.data
          : { message: 'Error happens sometimes, its not your mistake.' },
      );
    }
  });
};
