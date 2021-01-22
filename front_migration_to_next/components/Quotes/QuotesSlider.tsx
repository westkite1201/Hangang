/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import styled from "styled-components";
//swiper
const QuotesItem = ({ quotes }) => {
  return (
    <QuotesItemWrapper>
      <QuotesContent>{quotes.word}</QuotesContent>
      <QuotesAuthor>{`-${quotes.name}`}</QuotesAuthor>
    </QuotesItemWrapper>
  );
};

const QuotesItemWrapper = styled.div`
  height: 10rem;
  color: white;
`;
const QuotesContent = styled.div`
  font-size: 2rem;
  @media only screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const QuotesAuthor = styled.div`
  font-size: 1rem;
  @media only screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const QuotesSlider = (props) => {
  const slider1 = useRef(null);
  const { quotesData } = useSelector((state) => state.quotes);

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
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
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
export default QuotesSlider;
