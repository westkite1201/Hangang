import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import QuotesItem from '../../component/QuotesItem';
import { GET_QUOTES_REQUEST } from '../../modules/hangang/reducer';

const QuotesContainer = (props) => {
  const { quotesData } = useSelector((state) => state.hangang);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_QUOTES_REQUEST,
      payload: { accepted: '0' }
    });
  }, [dispatch]);
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
  return (
    <Slider {...settings}>
      {data &&
        data.map((quotes, index) => {
          return <QuotesItem key={index} quotes={quotes} />;
        })}
    </Slider>
  );
};
export default QuotesContainer;
