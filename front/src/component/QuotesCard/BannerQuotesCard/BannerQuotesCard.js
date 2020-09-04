import React, { useEffect, useState, useRef } from 'react';
import './BannerQuotesCard.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { isNil } from 'lodash';
import styled from 'styled-components';
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
    transition: 'all 0.5s ease'
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
    boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.8)'
  }
}));

const BannerQuotesCard = ({ quotes }) => {
  const cardReferenece = useRef();
  const classes = useStyles();
  let defaultImg = quotes.backgroundImagePath
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
          backgroundImage: `url(${
            isNil(quotes.thumbnail) || quotes.thumbnail === ''
              ? defaultImg
              : quotes.thumbnail
          })`
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
