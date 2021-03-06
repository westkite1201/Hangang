export interface IHangangTemp {
  MSR_DATE: string;
  MSR_TIME: string;
  SITE_ID: string;
  W_TEMP: string;
  W_PH: string;
  W_DO: string;
  W_TN: string;
  W_TP: string;
  W_TOC: string;
  W_PHEN: string;
  W_CN: string;
}

export interface IHangangTempRes {
  result: string;
  data: IHangangTemp[];
}

export interface IHangangStation {
  index: number;
  name: string;
  lat: number;
  lng: number;
  distance: number;
}
export interface ICoordinates {
  latitude: number;
  longitude: number;
}
