import React, { useMemo } from 'react';
import useData from './../hooks/useData';
import moment from 'moment';

const Quotes = () => {
  const params = {
    pageNo: 1,
    numOfRows: 200,
    startCreateDt: moment().subtract(1).format('YYYYMMDD'),
    endCreateDt: moment().format('YYYYMMDD')
  };
  const { data, error } = useData(JSON.stringify(params));
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Quotes;
