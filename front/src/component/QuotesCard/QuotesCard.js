import React from 'react';
import styled from 'styled-components';
import NavLink from 'react-router-dom';

const QuotesCard = () => {
  return (
    <QuotesWrapper>
      <BackGround />
      <QuotesContent>도망친 곳엔 낙원이 없다 </QuotesContent>
      <QuotesAuthor>베르세르크</QuotesAuthor>
    </QuotesWrapper>
  );
};
const BackGround = styled.div`
  overflow-y: hidden;
  z-index: -1;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  background-image: url('/images/temp.jpeg');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* filter: blur(2px);
  -webkit-filter: blur(2px); */
`;
const QuotesWrapper = styled.div`
  font-family: 'NanumSquareR';
  position: relative;
  height: 450px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const QuotesContent = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 20%;
  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
  }
`;
const QuotesContainer = styled.div``;

const QuotesAuthorThumbnail = styled.div``; //저자사진있으면
const QuotesAuthor = styled.h4``;

export default QuotesCard;
