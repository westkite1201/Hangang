import React from 'react';
import BannerQuotesCard from './BannerQuotesCard';
import PosterQuotesCard from './PosterQuotesCard';
import { getContentCardType } from '../../lib/helper';
import { Grid } from '@material-ui/core';
import { BANNER, POSTER } from '../../lib/CommonString';
//pst_exps_typ_cd =  10 // 일반콘텐츠
//=20 //
function CardComponent({ quotes }) {
  const { card_exps_typ_cd } = quotes;
  let cardType = getContentCardType(card_exps_typ_cd);
  switch (cardType) {
    case 'poster':
      return <PosterQuotesCard quotes={quotes} />;
    case 'banner':
      return <BannerQuotesCard quotes={quotes} />;
    default:
      return <PosterQuotesCard quotes={quotes} />;
  }
}
const QuotesCard = ({ quotes, key }) => {
  const { card_exps_typ_cd } = quotes;
  if (card_exps_typ_cd === BANNER) {
    return (
      <Grid item xs={12} md={12} lg={12} key={key}>
        <CardComponent quotes={quotes} />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} md={6} lg={4} key={key}>
        <CardComponent quotes={quotes} />
      </Grid>
    );
  }
};

export default QuotesCard;
