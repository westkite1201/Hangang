import axios from 'axios';
import { clientConfig } from '../../configuration/clientConfig';
import objectToQueryString from '../objectToQueryString';
import { IUploadImageParams } from '../../interfaces';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
  }
});

export const getRandomPhotos = (params) => {
  return instance
    .get(`/photos/random?${objectToQueryString(params)}`)
    .then((res) => res.data);
};

export const searchPhotos = async (params) => {
  return instance
    .get(`/search/photos?${objectToQueryString(params)}`)
    .then((res) => res.data);
};

export const getImage = async (url: string, name: string) => {
  return axios
    .get(url, {
      responseType: 'blob'
    })
    .then((response) => {
      if (response) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const FileSaver = require('file-saver');
        FileSaver.saveAs(new Blob([response.data]), `${name}.png`);
      }
    });
};

export const getImageDownloadToUrl = async (params: IUploadImageParams) => {
  const imagePath = params.url ? params.url : params.backgroundImagePath;
  return axios
    .get(
      `${
        clientConfig.endpoint.api
      }/file/getImageDownloadToUrl/${encodeURIComponent(imagePath)}/${
        params.id
      }/testUser`
    )
    .then((res) => res.data);
};
