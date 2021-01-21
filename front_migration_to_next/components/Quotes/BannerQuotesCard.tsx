/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef } from 'react';
import './BannerQuotesCard.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { isNil } from 'lodash';
import { getImageFileFullPath } from '../../lib/helper';
import styled from 'styled-components';

// .quotes-card-wrapper:hover {
//   box-shadow: 0px 6px 15px -5px rgba(0, 0, 0, 0.2);
// }
// .quotes-card-wrapper {
//   //background-attachment: fixed;
//   background-position: center center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   width: 100%;
//   //height: 100%;
//   padding: 100px 60px;
//   border-radius: 4px;
//   transition: 0.3s all;
//   .card-header-center {
//     font-family: 'NanumMyeongjo';
//     color: #fff;
//     text-align: center;
//     .card-name {
//       font-size: 12.1px;
//       font-weight: 700;
//       letter-spacing: 1.4px;
//       text-transform: uppercase;
//       text-align: center;
//       margin-bottom: 0;
//       background-color: black;
//       width: 10%;
//       margin: auto;
//     }
//     .card-word {
//       margin: 0;
//       padding: 0;
//       border: 0;
//       font-size: 42px;
//       font-weight: 400;
//       //font-style: normal;
//       vertical-align: baseline;
//       text-shadow: 2px 2px black;
//       background-color: black;
//       margin-bottom: 10px;
//     }
//     .card-more-info {
//       cursor: pointer;
//       background-color: black;
//       width: 100px;
//       margin: auto;
//       padding: 10px;
//     }
//   }
// }

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '20px',
    display: 'flex',
    height: '300px',
    maxWidth: '1800px',
    position: 'relative',
    overflow: 'visible',
    fontFamily: 'Spoqa Han Sans',
    opacity: 0,
    transition: 'all 0.5s ease',
  },
  card_hover: {
    marginTop: '20px',
    display: 'flex',
    height: '300px',
    maxWidth: '1800px',
    position: 'relative',
    overflow: 'visible',
    fontFamily: 'Spoqa Han Sans',
    opacity: 0,
    transition: 'all 0.5s ease',
    transform: 'translate3d(0, 10px, 0) scale3d(1.00, 1.00, 1.00)',
    boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.8)',
  },
}));

const BannerQuotesCard = ({ quotes }) => {
  const cardReferenece = useRef();
  const classes = useStyles();
  const defaultImg = quotes.backgroundImagePath
    ? quotes.backgroundImagePath
    : '/images/river.jpeg';

  useEffect(() => {
    cardReferenece.current.style.opacity = 1;
  }, []);

  console.log('BannerQuotesCard ', quotes);
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
  };
  return (
    <Card
      className={
        'list-item ' +
        `${mouseOver ? classes.card_hover : classes.card}` +
        ' gradient-border all'
      }
      ref={cardReferenece}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="quotes-card-wrapper"
        style={{
          backgroundImage: `url(${getImageFileFullPath(quotes)})`,
        }}
      >
        <div className="card-header-center">
          <div className="card-word">{quotes.word}</div>
          <div className="card-name">{quotes.name}</div>
        </div>
      </div>
    </Card>
  );
};

export default BannerQuotesCard;
