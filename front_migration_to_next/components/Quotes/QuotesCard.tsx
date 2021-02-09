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
  const cardType = getContentCardType(card_exps_typ_cd);

  switch (cardType) {
    case 'poster':
      return <PosterQuotesCard quotes={quotes} key={quotes._id} />;
    case 'banner':
      return <BannerQuotesCard quotes={quotes} key={quotes._id} />;
    default:
      return <div />;
  }
}
const QuotesCard = ({ quotes, index }) => {
  const { card_exps_typ_cd, usePreview } = quotes;
  if (usePreview) {
    return (
      <div>
        <CardComponent quotes={quotes} />
      </div>
    );
  } else if (card_exps_typ_cd === BANNER) {
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
        md={usePreview ? 12 : 4}
        lg={usePreview ? 12 : 3}
        key={index}
      >
        <CardComponent quotes={quotes} />
      </Grid>
    );
  }
};

export default QuotesCard;
