/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import { getImageFileFullPath } from '../../lib/helper';

const PosterQuotesCard = ({ quotes }) => {
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  let cardHoverStyle = {
    transition: 'all 0.5s ease',
    transform: 'translate3d(0, -10px, 0) scale3d(1.00, 1.00, 1.00)',
    boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.8)',
  };
  const makePosterText = (str) => {
    return str.split('\n').map((item) => {
      return <div>{item}</div>;
    });
  };

  return (
    <QuotesWrapper
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={mouseOver ? cardHoverStyle : {}}
    >
      <BackGround backgroundImagePath={getImageFileFullPath(quotes)} />
      <QuotesContent>{makePosterText(quotes.word)}</QuotesContent>
      <QuotesAuthor>{quotes.name}</QuotesAuthor>
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
  background-image: url(${(props) => props.backgroundImagePath});
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
  font-family: 'NanumMyeongjo';
  position: relative;
  height: 450px;
  width: 100%;
  max-width: 300px;
  color: white;
  border-radius: 4px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  box-shadow: 0px 15px 50px -5px rgba(0, 0, 0, 0.4);
  margin: auto;
`;

const QuotesContent = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
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
const QuotesAuthor = styled.h4`
  color: white;
  font-size: 1rem;
  text-align: center;
`;

export default PosterQuotesCard;
