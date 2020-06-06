import axios from 'axios';

export const getAPI = (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'GET',
        url: url
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
