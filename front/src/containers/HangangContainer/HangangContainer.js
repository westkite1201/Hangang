import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GET_HANGANG_TEMP_REQUEST } from '../../modules/hangang/reducer';

function HangangContainer() {
  const { riverTempData } = useSelector((state) => state.hangang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_HANGANG_TEMP_REQUEST,
      payload: {}
    });
  }, []);

  const getTemp = () => {
    dispatch({
      type: GET_HANGANG_TEMP_REQUEST,
      payload: {}
    });
  };

  return (
    <Fragment>
      <button onClick={getTemp}>테스트 </button>
      <BackGround></BackGround>
      <TitleWrapper>
        <Title>
          <hr></hr>
          지금 한강은...
          <TitleTemp style={{ textAlign: 'center' }}>
            {riverTempData.data && riverTempData.data.length > 1 ? riverTempData.data[1].W_TEMP : '--'}°C
          </TitleTemp>
          <hr></hr>
        </Title>
      </TitleWrapper>
    </Fragment>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  height: 60vh;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  color: white;
  font-size: 2.5rem;
`;
const TitleTemp = styled.div`
  color: white;
  text-align: center;
  font-size: 4rem;
`;
const BackGround = styled.div`
  z-index: -1;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  background-image: url('/river.jpeg');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(4px);
  -webkit-filter: blur(4px);
`;
export default HangangContainer;
