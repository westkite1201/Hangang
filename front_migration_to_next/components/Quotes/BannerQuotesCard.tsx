/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { isNil } from 'lodash';
import { getImageFileFullPath } from '../../lib/helper';
import styled from 'styled-components';

const St = {
  card: styled.div`
    margin-top: 20px;
    display: flex;
    height: 300px;
    max-width: 1800px;
    position: relative;
    overflow: visible;
    fontfamily: Spoqa Han Sans;
    opacity: 1;
    transition: all 0.5s ease;
  `,

  cardWrapper: styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    padding: 100px 60px;
    border-radius: 4px;
    transition: 0.3s all;
    background-image: url(${(props) => props.backgroundImagePath});
  `,
  cardHeaderCenter: styled.div`
    font-family: 'NanumMyeongjo';
    color: #fff;
    text-align: center;
  `,
  cardName: styled.div`
    font-size: 12.1px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 0;
    background-color: black;
    width: 10%;
    margin: auto;
  `,
  cardWord: styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 42px;
    font-weight: 400;
    //font-style: normal;
    vertical-align: baseline;
    text-shadow: 2px 2px black;
    background-color: black;
    margin-bottom: 10px;
  `,
  cardMoreInfo: styled.div`
    cursor: pointer;
    background-color: black;
    width: 100px;
    margin: auto;
    padding: 10px;
  `,
};

const BannerQuotesCard = ({ quotes }) => {
  let cardHoverStyle = {
    transition: 'all 0.5s ease',
    transform: 'translate3d(0, -10px, 0) scale3d(1.00, 1.00, 1.00)',
    boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.8)',
  };

  console.log('BannerQuotesCard ', quotes);
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
  };
  return (
    <St.card
      style={mouseOver ? cardHoverStyle : {}}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <St.cardWrapper backgroundImagePath={getImageFileFullPath(quotes)}>
        <St.cardHeaderCenter>
          <St.cardWord>{quotes.word}</St.cardWord>
          <St.cardName>{quotes.name}</St.cardName>
        </St.cardHeaderCenter>
      </St.cardWrapper>
    </St.card>
  );
};

export default BannerQuotesCard;
