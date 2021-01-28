import React from 'react';
import styled from 'styled-components';
import Masonry from '../common/Masonry';
const defaultImg = '/images/river.jpeg';
const brakePoints = [350, 500, 750];
// let images = [];
// const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643];
// for (let i = 0; i < imgId.length; i++) {
//   const ih = 200 + Math.floor(Math.random() * 10) * 15;
//   images.push('https://unsplash.it/250/' + ih + '?image=' + imgId[i]);
// }
const St = {
  MasonryContainer: styled.div`
    width: 80%;
    margin: auto;
    margin-top: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    p {
      text-align: center;
      padding: 4px;
      font-family: monospace;
      background: #222;
      color: #efefef;
    }
  `,
  Tile: styled.div`
    margin: 4px;
    img {
      box-shadow: 0 1px 1px 2px rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      width: 100%;
      border: ${(props) => (props.isSelected ? '3px solid #5a6dff' : 'none')};
    }
  `,
};

const Tile = ({ src, onClick, selected, thumbnail }) => {
  let isSelected = false;
  if (thumbnail && thumbnail.id === selected) {
    isSelected = true;
  }
  return (
    <St.Tile onClick={() => onClick(thumbnail)} isSelected={isSelected}>
      <img src={src} />
    </St.Tile>
  );
};

const ThumbnailList = ({ thumbnails, selected, onClick }) => {
  return (
    <St.MasonryContainer>
      <p> 원하는 사진을 골라보세요.</p>
      <Masonry brakePoints={brakePoints}>
        {thumbnails.map((thumbnail, id) => {
          return (
            <Tile
              src={thumbnail.urls.regular}
              thumbnail={thumbnail}
              key={id}
              selected={selected}
              onClick={onClick}
            />
          );
        })}
      </Masonry>
    </St.MasonryContainer>
  );
};
export default ThumbnailList;
