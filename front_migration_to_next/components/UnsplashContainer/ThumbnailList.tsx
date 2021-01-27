import React from 'react';
//import styles from './ThumbnailList.module.scss';
//import CX from 'classnames';
import Grid from '@material-ui/core/Grid';
//import { defaultImg } from '../../../configuration/clientConfig';
const defaultImg = '/images/river.jpeg';
const ThumbnailList = ({ thumbnails, selected, onClick }) => (
  <Grid container spacing={3}>
    {thumbnails.map((thumbnail) => (
      <Grid item xs={4} key={thumbnail.id}>
        <div className={'thumbnail__item'}>
          <img
            src={thumbnail.urls.thumb}
            data-src={defaultImg}
            alt={thumbnail.alt_description}
            //className={CX({ [styles.active]: thumbnail.id === selected })}
            onClick={() => onClick(thumbnail)}
          />
          <span>By {thumbnail.user.username}</span>
        </div>
      </Grid>
    ))}
  </Grid>
);

export default ThumbnailList;
// .thumbnail__item {
//   //height: 150px;
//   img {
//     //max-height: 120px;
//     width: 100%;
//     display: block;
//     margin: 0 auto;
//     border: 5px solid #ffffff;
//     cursor: pointer;
//     &.active {
//       border: 5px solid #5a6dff;
//     }
//   }
//}
