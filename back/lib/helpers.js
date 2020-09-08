const STATUS_CODE = {
  '200': 'success',
  '404': 'data not found',
  '999': 'etc'
};
export const generateStatus = () => {
  return {
    message: '',
    data: '',
    status: ''
  };
};
