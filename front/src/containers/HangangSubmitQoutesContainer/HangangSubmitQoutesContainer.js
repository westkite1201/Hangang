// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components';
// import { GET_HANGANG_TEMP_REQUEST } from '../../modules/hangang/reducer';
// import QuotesContainer from '../QuotesContainer';
// import { getNearbyStaion } from '../../lib/helper';
// import moment from 'moment';
// import { useSpring, animated } from 'react-spring';
// import * as easings from 'd3-ease';
// function StationInfo({ station, riverTempData }) {
//   return (
//     <div>
//       <StationInfoTime>
//         <div>
//           <span className="date">
//             {riverTempData.data && station
//               ? moment(riverTempData.data[station.index].MSR_DATE).format(
//                   'YYYY년 MM월 DD일'
//                 )
//               : '--'}
//           </span>
//         </div>
//         <div className="measure-time">
//           {riverTempData.data && station
//             ? riverTempData.data[station.index].MSR_TIME
//             : '--'}
//         </div>
//       </StationInfoTime>

//       <StationInfoContainer>
//         <div>
//           측정소 <span className="station-name">{station && station.name}</span>
//         </div>
//         <div>
//           측정소까지{' '}
//           <span className="station-distance">
//             {station && `${parseInt(station.distance / 1000)}km`}
//           </span>
//         </div>
//       </StationInfoContainer>
//     </div>
//   );
// }
// const StationInfoTime = styled.div`
//   text-align: center;

//   .date {
//     font-size: 2rem;
//   }
//   .measure-time {
//     font-size: 3rem;
//     color: #d3f9d8;
//   }
// `;

// const StationInfoContainer = styled.div`
//   text-align: center;
//   font-size: 2rem;
//   .station-name {
//     font-size: 2rem;
//   }
//   .station-distance {
//     font-size: 2rem;
//   }
// `;

// function HangangSubmitQoutesContainer() {
//   const [station, setStation] = useState();
//   const [isInfoGrow, setIsInfoGrow] = useState();
//   const { riverTempData } = useSelector((state) => state.hangang);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getPosition = (options) => {
//       return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, options);
//       });
//     };
//     const nowGeolocation = async () => {
//       if (navigator.geolocation) {
//         // GPS를 지원하면
//         try {
//           let position = await getPosition();
//           let notLng = position.coords.longitude;
//           let notLat = position.coords.latitude;
//           console.log(getNearbyStaion(notLat, notLng));
//           setStation(getNearbyStaion(notLat, notLng));
//         } catch (e) {
//           console.log('error ', e);
//         }
//       } else {
//         alert('GPS를 지원하지 않습니다');
//       }
//     };
//     dispatch({
//       type: GET_HANGANG_TEMP_REQUEST,
//       payload: {}
//     });
//     nowGeolocation();
//   }, [dispatch]);

//   function handleMouseOver() {
//     setIsInfoGrow(true);
//   }
//   function handleMouseLeave() {
//     setIsInfoGrow(false);
//   }
//   const titleStyle = useSpring({
//     config: { duration: 1000, easing: easings.easeExpOut },
//     transform: isInfoGrow ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0) ',
//     opacity: isInfoGrow ? '0' : '1'
//   });
//   const infoStyle = useSpring({
//     config: { duration: 1000, easing: easings.easeExpOut },
//     transform: isInfoGrow ? 'translate3d(0, 0, 0)' : 'translate3d(0, -150%, 0)',
//     opacity: isInfoGrow ? '1' : '0'
//   });
//   //점검중 일 경우 대비
//   function viewTemperture() {}
//   return (
//     <Wrapper>
//       <BackGround></BackGround>
//       <TitleWrapper>
//         <Title>
//           <hr></hr>
//           <animated.div
//             className={'station-info'}
//             style={infoStyle}
//             onMouseOver={handleMouseOver}
//             onMouseLeave={handleMouseLeave}
//           >
//             <StationInfo station={station} riverTempData={riverTempData} />
//           </animated.div>
//           <div style={{ padding: '30px 0 30px 0' }}>
//             <animated.div
//               onMouseOver={handleMouseOver}
//               onMouseLeave={handleMouseLeave}
//               style={titleStyle}
//             >
//               <div>지금 한강은...</div>
//               <TitleTemperture style={{ textAlign: 'center' }}>
//                 {riverTempData.data && station
//                   ? riverTempData.data[station.index].W_TEMP
//                   : '--'}
//                 °C
//               </TitleTemperture>
//             </animated.div>
//           </div>

//           <hr></hr>
//         </Title>
//         <QuetesWrapper>
//           <QuotesContainer />
//         </QuetesWrapper>
//       </TitleWrapper>
//     </Wrapper>
//   );
// }
// const QuetesWrapper = styled.div`
//   text-align: center;
// `;
// const Wrapper = styled.div`
//   overflow: hidden;
// `;

// const TitleWrapper = styled.div`
//   position: relative;
//   padding-top: 10%;
//   /*height: 100vh;*/
//   text-align: center;
//   /* justify-content: center;
//   align-items: center; */
// `;
// const Title = styled.div`
//   position: relative;
//   color: white;
//   font-size: 2.5rem;
//   padding: 10px 20% 10px 20%;
//   .station-info {
//     position: absolute;
//     left: 50%;
//     margin-left: -98px;
//   }
// `;
// const TitleTemperture = styled.div`
//   color: white;
//   text-align: center;
//   font-size: 4rem;
// `;
// const BackGround = styled.div`
//   overflow-y: hidden;
//   z-index: -1;
//   height: 100vh;
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-color: transparent;
//   background-image: url('/images/river.jpeg');
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   filter: blur(4px);
//   -webkit-filter: blur(4px);
// `;
// export default HangangSubmitQoutesContainer;
