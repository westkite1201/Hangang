import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Grid,
  TableCell,
  TableRow,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { GET_QUOTES_REQUEST_ADMIN } from '../../modules/hangang/reducer';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import QuotesCard from '../../component/QuotesCard';

const QuotesCardList = ({ quotesList }) => {
  return quotesList.map((quotes, index) => {
    return <QuotesCard quotes={quotes} key={index} />;
  });
};

const HangangAdminContainer = () => {
  const [isInfoGrow, setIsInfoGrow] = useState();
  const { quotesData } = useSelector((state) => state.hangang);
  const [acceptedQuotes, setAcceptedQuotes] = useState();
  const [submitQuotes, setSubmitQuotes] = useState();
  const [showQuotes, setShowQuotes] = useState();
  const [tempList, setTempList] = useState();

  const [isAcceptedManage, setIsAcceptedManage] = useState(false); // 초기값은 submit 받은 데이터를 보여줌
  const [showCode, setShowCode] = useState('10');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_QUOTES_REQUEST_ADMIN,
      payload: { accepted: '1' }
    });
  }, [dispatch]);

  useEffect(() => {
    const { data } = quotesData;
    if (data) {
      const {
        accepted_quotes: acceptedQuotes,
        submit_quotes: submitQuotes
      } = data;
      setAcceptedQuotes(acceptedQuotes);
      setSubmitQuotes(submitQuotes);
      setShowQuotes(submitQuotes);
      setTempList(submitQuotes);
    }
  }, [quotesData]);

  useEffect(() => {
    setShowQuotes(isAcceptedManage ? acceptedQuotes : submitQuotes);
    setTempList(isAcceptedManage ? acceptedQuotes : submitQuotes);
  }, [isAcceptedManage]);

  const titleStyle = useSpring({
    config: { duration: 1000, easing: easings.easeExpOut },
    transform: isInfoGrow ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0) ',
    opacity: isInfoGrow ? '0' : '1',
    backgroundColor: 'black'
  });

  const handleChangeType = (event) => {
    setIsAcceptedManage(event.target.checked);
  };

  const handleChangeCode = (event) => {
    setShowCode(event.target.value);
    const temp = tempList.filter(
      (quote) => quote.card_exps_typ_cd === event.target.value
    );
    setShowQuotes(temp);
  };

  return (
    <Wrapper>
      <Title>
        <hr></hr>
        <div style={{ padding: '30px 0 30px 0' }}>
          <animated.div style={titleStyle}>
            <div>확인좀 해주세요...</div>
          </animated.div>
          <FormControlLabel
            control={
              <Switch checked={isAcceptedManage} onChange={handleChangeType} />
            }
            label="Switch Manage"
          />
          <RadioGroup
            name="showCode"
            aria-label="showCode"
            value={showCode.toString()}
            onChange={handleChangeCode}
            row
          >
            {[10, 20, 30].map((value, index) => (
              <FormControlLabel
                key={index}
                value={value.toString()}
                control={<Radio />}
                label={value.toString()}
              />
            ))}
          </RadioGroup>
        </div>
        <hr></hr>
      </Title>
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid container spacing={1}>
            {showQuotes && <QuotesCardList quotesList={showQuotes} />}
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Wrapper>
  );
};
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
