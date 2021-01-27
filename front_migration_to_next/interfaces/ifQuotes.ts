export interface IQuote {
  font_color: string;
  thumbnail_user_image: string;
  thumbnail_background_image: string;
  accepted: string;
  insert_time: Date;
  update_time: Date;
  status: string;
  card_exps_typ_cd: string;
  _id: string;
  name: string;
  word: string;
  __v: number;
  backgroundImagePath?: string;
  isUnsplash: string;
  id?: string;
}

export interface IQuoteResData {
  quotes_array: IQuote[];
  total_count: number;
}

export interface IQuotseRes {
  result: string;
  message: string;
  data: IQuoteResData;
}

export interface IGetQuotesParam {
  accepted: string;
  pageNum: number;
  pageCount: number;
}
