import React from 'react';
import styled from 'styled-components';
import NavLink from 'react-router-dom';

const QuotesCard = ({ quotes }) => {
  return (
    <QuotesWrapper>
      {<BackGround />}
      <QuotesContent>
        <div>선악의 정의가 </div>
        <div>흐릿해지면 이후에는</div>
        <div>많은 것들이 흔들린다</div>
      </QuotesContent>
      <QuotesAuthor>공병호</QuotesAuthor>
    </QuotesWrapper>
  );
};
const BackGround = styled.div`
  overflow-y: hidden;
  z-index: -1;
  height: 100%;
  width: 100%;
  border-radius: 4px;
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
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
`;
const QuotesWrapper = styled.div`
  margin: 4px;
  //font-family: 'NanumSquareR';
  font-family: 'NanumMyeongjo';
  position: relative;
  height: 450px;
  width: 100%;
  max-width: 300px;
  //background: black;
  color: white;
  border-radius: 4px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
`;

const QuotesContent = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 20%;
  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
  div {
    margin: 1px;
    //  background: black;
  }
`;
const QuotesContainer = styled.div``;

const QuotesAuthorThumbnail = styled.div``; //저자사진있으면
const QuotesAuthor = styled.h4`
  //font-weight: bold;
  font-size: 1rem;
  text-align: center;
`;

export default QuotesCard;
