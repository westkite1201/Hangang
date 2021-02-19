export interface IGetCoronaParams {
  pageNo: number;
  numOfRows: number;
  startCreateDt: string;
  endCreateDt: string;
}

export interface ICoronaInfo {
  accDefRate: number;
  accExamCnt: number;
  accExamCompCnt: number;
  careCnt: number;
  clearCnt: number;
  createDt: Date;
  deathCnt: number;
  decideCnt: number;
  examCnt: number;
  resutlNegCnt: number;
  seq: number;
  stateDt: number;
  stateTime: string;
  updateDt: Date | null;
  dailyDecideStatus: number;
}

export interface IGetCoronaRes {
  message: string;
  status: number;
  data: Data;
}

export interface Data {
  response: Response;
}

export interface Header {
  resultCode: number;
  resultMsg: string;
}

export interface Response {
  header: Header;
  body: Body;
}

export interface Body {
  items: Items;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface Items {
  item: ICoronaInfo[];
}
