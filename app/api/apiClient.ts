import axios, {AxiosRequestConfig} from 'axios';
import {showToast} from '../constants/commonUtils';
import NetInfo from '@react-native-community/netinfo';

let BASE_URL = 'http://demo.chandran.prompttechsolutions.in/Service1.svc/';

export const SimpleApiClient = async (endPoint: string) => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  if (isConnected) {
    try {
      const response = await axios.get(BASE_URL + endPoint, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code outside of the 2xx range
          showToast(error.response.data.message);
          console.log(error.response.data, error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          showToast('No response received from the server.');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          showToast(`Error message: ${error.message}`);
          console.log('Error', error.message);
        }
      } else {
        // Handle errors that are not Axios errors
        showToast(`Unexpected error: ${error.message}`);
        console.log('Unexpected error', error);
      }
      throw error;
      // if (error.response) {
      //   // Update UI accordingly
      //   showToast(error.response.data.message);
      //   console.log(error.response.data, error.response.status);
      // } else if (error.request) {
      //   showToast(error.request);
      // } else {
      //   showToast(`Error message: ${error.message}`);
      // }
      // throw error; // Rethrow the error to propagate it to the calling code
    }
  } else {
    showToast('Need Internet connection');
  }
};

export const PostApiClient = async (endPoint: string) => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  if (isConnected) {
    try {
      const response = await axios.post(BASE_URL + endPoint, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) {
      if (error.response) {
        // Update UI accordingly
        showToast(error.response.data.message);
        console.log(error.response.data, error.response.status);
      } else if (error.request) {
        showToast(error.request);
      } else {
        showToast(`Error message: ${error.message}`);
      }
      throw error; // Rethrow the error to propagate it to the calling code
    }
  } else {
    showToast('Need Internet connection');
  }
};

// export const SimpleApiClient = async (endPoint: string) => {
//   const url = BASE_URL + endPoint;

//   // Await the construction of Axios instance
//   const axiosInstance = axios.create({
//     baseURL: url,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });

//   // Return the Axios instance directly
//   return axiosInstance;
// };
