/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import QuotesItem from '../../component/QuotesItem';
import styled from 'styled-components';
// import { GET_QUOTES_REQUEST } from '../../modules/hangang/reducer';
//swiper
const PAGE_COUNT = 5;
const QuotesContainer = (props) => {
  const slider1 = useRef();
  const { quotesData } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: props.actionType,
      payload: { accepted: '0', pageNum: 1, pageCount: PAGE_COUNT }
    });
  }, [props.actionType, dispatch]);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    beforeChange: function (currentSlide, nextSlide) {
      console.log('before change', currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log('after change', currentSlide);
    }
  };
  const { data } = quotesData;
  //console.log(data);

  const next = () => {
    if (slider1.current) {
      slider1.current.slickNext();
    }
  };
  const previous = () => {
    if (slider1.current) {
      slider1.current.slickPrev();
    }
  };

  return (
    <div>
      <Slider {...settings} ref={(slider) => (slider1.current = slider)}>
        {data &&
          data.map((quotes, index) => {
            return <QuotesItem key={index} quotes={quotes} />;
          })}
      </Slider>
      <QuotesSliderButton>
        <span onClick={previous}>
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5 5.5l-6 6.5 6 6.5L14 20l-7.5-8L14 4l1.5 1.5z"
              fill="#1b1c1d"
            ></path>
          </svg>
        </span>
        <span onClick={next}>
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.5 18.5l6-6.5-6-6.5L10 4l7.5 8-7.5 8-1.5-1.5z"
              fill="#1b1c1d"
            ></path>
          </svg>
        </span>
      </QuotesSliderButton>
    </div>
  );
};
const QuotesSliderButton = styled.div`
  padding-left: 25px;
  display: flex;
  justify-content: center;
  text-align: center;
  span {
    cursor: pointer;
  }
`;
export default QuotesContainer;
