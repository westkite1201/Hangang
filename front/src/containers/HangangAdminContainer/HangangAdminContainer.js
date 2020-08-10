import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { GET_QUOTES_SUBMIT } from '../../modules/hangang/reducer';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';

const SubmitQuotes = ({ quotesList }) => {
  return quotesList.map((quote, index) => {
    return (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <div key={index}>
          <ul>
            <li>{quote.name}</li>
            <li>{quote.word}</li>
            <br/>
          </ul>
        </div>
      </Grid>
    );
  });
};

const HangangAdminContainer = () => {
  const [isInfoGrow, setIsInfoGrow] = useState();
  const { quotesData } = useSelector((state) => state.hangang);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_QUOTES_SUBMIT,
      payload: { accepted: '1' }
    });
  }, [dispatch]);

  const titleStyle = useSpring({
    config: { duration: 1000, easing: easings.easeExpOut },
    transform: isInfoGrow ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0) ',
    opacity: isInfoGrow ? '0' : '1'
  });
  const infoStyle = useSpring({
    config: { duration: 1000, easing: easings.easeExpOut },
    transform: isInfoGrow ? 'translate3d(0, 0, 0)' : 'translate3d(0, -150%, 0)',
    opacity: isInfoGrow ? '1' : '0'
  });
  const { data } = quotesData;
  return (
    <Wrapper>
      <Grid container spacing={3}>
      <Grid item xs={1} md={1} lg={1}></Grid>
      <Grid item xs={10} md={10} lg={10}>
        <Grid container spacing={3}>
          {data && <SubmitQuotes quotesList={data} />}
        </Grid>
      </Grid>
      <Grid item xs={1} md={1} lg={1}></Grid>
    </Grid>
    </Wrapper>
  );
}
const QuetesWrapper = styled.div`
  text-align: center;
`;
const Wrapper = styled.div`
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  position: relative;
  padding-top: 10%;
  /*height: 100vh;*/
  text-align: center;
  /* justify-content: center;
  align-items: center; */
`;
const Title = styled.div`
  position: relative;
  color: white;
  font-size: 2.5rem;
  padding: 10px 20% 10px 20%;
  .station-info {
    position: absolute;
    left: 50%;
    margin-left: -98px;
  }
`;
const TitleTemperture = styled.div`
  color: white;
  text-align: center;
  font-size: 4rem;
`;
const BackGround = styled.div`
  overflow-y: hidden;
  z-index: -1;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  background-image: url('/images/river.jpeg');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(4px);
  -webkit-filter: blur(4px);
`;
export default HangangAdminContainer;
