import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import QuotesContainer from '../QuotesContainer';
import { GET_QUOTES_SUBMIT } from '../../modules/hangang/reducer';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';

function HangangAdminContainer() {
  const [isInfoGrow, setIsInfoGrow] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({
    //   type: GET_HANGANG_TEMP_REQUEST,
    //   payload: {}
    // });
  }, [dispatch]);

  function handleMouseOver() {
    setIsInfoGrow(true);
  }
  function handleMouseLeave() {
    setIsInfoGrow(false);
  }
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
  //점검중 일 경우 대비
  function viewTemperture() {}
  return (
    <Wrapper>
      admin 페이지 입니다.
      <br/>
      데이터 조회한애들 올거임
      <QuotesContainer actionType={GET_QUOTES_SUBMIT}/>
      {/*
      <BackGround></BackGround>
      <TitleWrapper>
        <Title>
          <hr></hr>
          <animated.div
            className={'station-info'}
            style={infoStyle}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
          </animated.div>
          <div style={{ padding: '30px 0 30px 0' }}>
            <animated.div
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              style={titleStyle}
            >
            </animated.div>
          </div>

          <hr></hr>
        </Title>
        <QuetesWrapper>
          <QuotesContainer actionType={'todos/GET_QUOTES_SUBMIT'}/>
        </QuetesWrapper>
      </TitleWrapper>
      */}
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
