import styled from 'styled-components';
const St = {
  CustomHr: styled.hr`
    border: 0;
    border-bottom: 2px solid #91a7ff;
    width: 0;
    animation: separator-width 1s ease-out forwards;
    }
    @keyframes separator-width {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
  `
};

const Hr = () => {
  return <St.CustomHr />;
};

export default Hr;
