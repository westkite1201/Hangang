/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import StationInfo from './StationInfo';
import QuotesSlider from '../Quotes/QuotesSlider';
import { getNearbyStaionArray, getBackgroundImage } from '../../lib/helper';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import { IHangangStation, ICoordinates, IHangangTemp } from '../../interfaces';
import Hr from '../common/Hr';

//import useHangangTemp from '../../hooks/useHangangTemp';

let backGroundtimer = null;

function HangangContainer({ riverTempData }) {
  console.log('riverTempData ', riverTempData);
  const [backgroundImagePath, setBackGroundImagePath] = useState('');
  const [tempertureData, setTempertureData] = useState<IHangangTemp>();
  const [station, setStation] = useState({
    index: 0,
    name: '',
    lat: 0,
    lng: 0,
    distance: 0,
  });
  const [stations, setStations] = useState<IHangangStation[]>();
  const [isInfoGrow, setIsInfoGrow] = useState(false);
  //const { hangangState, getHangangTemp } = useHangangTemp()
  //const { riverTempData } = useSelector((state) => state.hangang);
  const dispatch = useDispatch();

  //function
  function getTempData(stations, riverTempData) {
    console.log('getTempData ', stations, riverTempData);
    let stationNum = 0;
    stations.some((item, key) => {
      stationNum = key;
      return riverTempData[key].W_TEMP !== '점검중';
    });
    return {
      tempertureData: riverTempData[stationNum],
      station: stations[stationNum],
    };
  }
  useEffect(() => {
    console.log('useEfffect ', stations, riverTempData);

    if (stations && riverTempData && riverTempData.length !== 0) {
      const { tempertureData, station } = getTempData(stations, riverTempData);
      console.log('inside useEffect ', tempertureData, station);
      setTempertureData(tempertureData);
      setStation(station);
    }
  }, [stations, riverTempData]);

  useEffect(() => {
    const getPosition: () => Promise<ICoordinates> = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (err) => {
            reject(err);
          },
        );
      });
    };

    const nowGeolocation = async () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        try {
          const coords = await getPosition();
          const notLng = coords.longitude;
          const notLat = coords.latitude;
          //console.log(getNearbyStaionArray(notLat, notLng));
          setStations(getNearbyStaionArray(notLat, notLng));
        } catch (e) {
          console.log('error ', e);
        }
      } else {
        alert('GPS를 지원하지 않습니다');
      }
    };

    //현재 위치 확인
    nowGeolocation();
    //backGroundTimer 세팅
    setBackGroundImagePath(getBackgroundImage());
    //1시간에 한번 변경함
    backGroundtimer = setInterval(() => {
      setBackGroundImagePath(getBackgroundImage());
    }, 1000 * 3600);

    return () => {
      clearInterval(backGroundtimer);
    };
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
    opacity: isInfoGrow ? '0' : '1',
  });
  const infoStyle = useSpring({
    config: { duration: 1000, easing: easings.easeExpOut },
    transform: isInfoGrow ? 'translate3d(0, 0, 0)' : 'translate3d(0, -150%, 0)',
    opacity: isInfoGrow ? '1' : '0',
  });

  return (
    <Wrapper>
      <BackGround backgroundImagePath={backgroundImagePath} />
      <TitleWrapper>
        <Title>
          <Hr></Hr>
          <animated.div
            className={'station-info'}
            style={infoStyle}
            // onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <StationInfo tempertureData={tempertureData} station={station} />
          </animated.div>
          <div style={{ padding: '30px 0 30px 0' }}>
            <animated.div
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              style={titleStyle}
            >
              <div>지금 한강은...</div>
              <TitleTemperture style={{ textAlign: 'center' }}>
                {tempertureData ? tempertureData.W_TEMP : '--'}
                °C
              </TitleTemperture>
            </animated.div>
          </div>

          <Hr></Hr>
        </Title>
        <QuetesWrapper>
          <QuotesSlider />
        </QuetesWrapper>
        {/*<ButtonContainer history={props.history} />*/}
      </TitleWrapper>
    </Wrapper>
  );
}
const QuetesWrapper = styled.div`
  text-align: center;
`;
const Wrapper = styled.div`
  font-family: NanumBrushScript-Regular;
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

  background-image: url(${(props) => props.backgroundImagePath});
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(4px);
  -webkit-filter: blur(4px);
`;
export default HangangContainer;
