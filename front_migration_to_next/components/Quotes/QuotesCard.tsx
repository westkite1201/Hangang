import React from 'react';
import BannerQuotesCard from './BannerQuotesCard';
import PosterQuotesCard from './PosterQuotesCard';
//import ThumbQuotesCard from './ThumbQuotesCard';
import { getContentCardType } from '../../lib/helper';
import { Grid } from '@material-ui/core';
import { BANNER, POSTER } from '../../lib/CommonString';
//pst_exps_typ_cd =  10 // 일반콘텐츠
//=20 //
function CardComponent({ quotes }) {
  const { card_exps_typ_cd } = quotes;
  let cardType = getContentCardType(card_exps_typ_cd);
  console.log('cardType ', cardType);
  switch (cardType) {
    case 'poster':
      return <PosterQuotesCard quotes={quotes} />;
    case 'banner':
      return <BannerQuotesCard quotes={quotes} />;
    default:
      return <div />;
  }
}
const QuotesCard = ({ quotes, index }) => {
  const { card_exps_typ_cd, usePreview } = quotes;
  if (card_exps_typ_cd === BANNER) {
    return (
      <Grid item xs={12} md={12} lg={12} key={index}>
        <CardComponent quotes={quotes} />
      </Grid>
    );
  } else {
    return (
      <Grid
        item
        xs={12}
        md={usePreview ? 12 : 6}
        lg={usePreview ? 12 : 4}
        key={index}
      >
        <CardComponent quotes={quotes} />
      </Grid>
    );
  }
};

export default QuotesCard;
