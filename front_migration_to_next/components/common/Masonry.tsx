import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
/* masonary useColumn */
const St = {
  Masonry: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: stretch;
    width: 100%;
    margin: auto;
  `,
  Column: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: stretch;
    flex-grow: 1;
  `
};

const Masonry_ = ({ brakePoints, children }) => {
  const [columns, setColumns] = useState(1);
  const masonryRef = useRef(null);
  const getColumns = (offsetWidth: number) => {
    return (
      brakePoints.reduceRight((prev, current, index) => {
        return current < offsetWidth ? prev : index;
      }, brakePoints.length) + 1
    );
  };

  const onResize = () => {
    if (masonryRef !== null && masonryRef.current) {
      const masonryColumns = getColumns(masonryRef.current.offsetWidth);
      if (columns !== masonryColumns) {
        setColumns(masonryColumns);
      }
    }
  };

  const mapChildren = () => {
    const col = [];
    const numColumns = columns;
    for (let i = 0; i < numColumns; i++) {
      col.push([]);
    }
    return children.reduce((acc, current, index) => {
      acc[index % numColumns].push(current);
      return acc;
    }, col);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    mapChildren();
    return () => {
      //window.removeEventListener('resize');
    };
  }, []);
  //console.log('children ', children);
  return (
    <St.Masonry ref={masonryRef}>
      {mapChildren().map((col, index: number) => {
        return (
          <St.Column key={index}>
            {col.map((child, i) => {
              return <div key={i}>{child}</div>;
            })}
          </St.Column>
        );
      })}
    </St.Masonry>
  );
};
export default Masonry_;
