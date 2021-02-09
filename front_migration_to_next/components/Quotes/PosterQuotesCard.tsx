/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import { getImageFileFullPath } from '../../lib/helper';
import Hangul from '../common/Hangul';
import { IQuote } from '../../interfaces';
interface IPosterQuotesCard {
  quotes: IQuote;
}
const MAX = 200;
const MIN = 50;
const PosterQuotesCard = ({ quotes }: IPosterQuotesCard) => {
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
    boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.8)'
  };
  const makePosterText = (str: string, id: string) => {
    return str.split('\n').map((item) => {
      return (
        <div>
          <Hangul
            str={item}
            id={id}
            intervalTime={Math.floor(Math.random() * (MAX - MIN) + MIN)}
          />
        </div>
      );
    });
  };

  return (
    <QuotesWrapper
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={mouseOver ? cardHoverStyle : {}}
    >
      <BackGround backgroundImagePath={getImageFileFullPath(quotes)} />
      <QuotesContent fontColor={quotes.font_color}>
        {quotes.usePreview
          ? quotes.word
          : makePosterText(quotes.word, quotes._id)}
      </QuotesContent>
      <QuotesAuthor fontColor={quotes.font_color}>{quotes.name}</QuotesAuthor>
    </QuotesWrapper>
  );
};
// interface를 이용한 방법
interface IBackground {
  backgroundImagePath: string;
}
const BackGround = styled.div`
  overflow-y: hidden;
  z-index: -1;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
  background-image: url(${(props: IBackground) => props.backgroundImagePath});
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

interface IHexColor {
  fontColor: string;
}
const QuotesContent = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
  color: ${(props: IHexColor) => props.fontColor};
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
  color: ${(props: IHexColor) => props.fontColor};
`;

export default PosterQuotesCard;
