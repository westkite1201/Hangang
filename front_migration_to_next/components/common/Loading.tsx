/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ size, color }) => {
  return <CircularProgress color="secondary" />;
};

export default Loading;
