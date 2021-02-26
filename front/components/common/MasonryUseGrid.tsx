import React, { useEffect, useState } from 'react';
import ImageBox from './ImageBox';
import styled from 'styled-components';
import _ from 'lodash';

const ROW_HEIGHT = 20;
const ROW_GAP = 10;

interface IMasonryContainerProps {
  imageList: any[];
  handleSelect?: (photo, isUnsplash: boolean, url: string) => void;
}
const MasonryContainer = (props: IMasonryContainerProps) => {
  const { imageList, handleSelect } = props;
  const [windowSize, setWindowSize] = useState(0);
  function resizeWindow() {
    if (window) {
      setWindowSize(window.innerWidth);
    }
  }

  const resizeThrottle = _.throttle(resizeWindow, 100);

  useEffect(() => {
    window.addEventListener('resize', resizeThrottle);
    return () => {
      window.removeEventListener('resize', resizeThrottle);
    };
  }, []);

  return (
    <St.Container>
      <St.Grid>
        {imageList &&
          imageList.length !== 0 &&
          imageList.map((item: string, index: number) => {
            return (
              <ImageBox
                rowHeight={ROW_HEIGHT}
                rowGap={ROW_GAP}
                windowSize={windowSize}
                url={item}
                key={index}
                handleSelect={handleSelect}
              ></ImageBox>
            );
          })}
      </St.Grid>
    </St.Container>
  );
};

const St = {
  Container: styled.div`
    margin: 10px;
    color: #374046;
    background-color: #374046;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.15em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  `,
  Grid: styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 20px;
  `,
  Item: styled.div`
    background-color: #ffffff;
  `
};

export default MasonryContainer;
