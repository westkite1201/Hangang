import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Grid,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import {
  GET_QUOTES_ADMIN_REQUEST,
  PUT_QUOTES_ACCEPTED
} from '../../modules/quotes/reducer';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import QuotesCard from '../../component/QuotesCard';
import WithAuth from '../../lib/WithAuth';

let returnIdList = [];

const QuotesCardList = ({ quotesList }) => {
  const onChecked = (event) => {
    if (event.target.checked) {
      returnIdList.push(event.target.id);
    } else {
      returnIdList = returnIdList.filter((id) => {
        return id !== event.target.id;
      });
    }
  };

  return (
    quotesList &&
    quotesList.map((quotes, index) => {
      return (
        <QuotesCard
          quotes={quotes}
          onChecked={onChecked}
          key={'quote-card-' + index}
          index={'quote-card-' + index}
        />
      );
    })
  );
};

const HangangAdminContainer = ({ history, confirm }) => {
  console.log('confirm, ', confirm);
  if (false && confirm.gb_cd !== '1') {
    alert('권한이 없습니다!');
    history.push('/');
  }
  const { quotesAdminData } = useSelector((state) => state.quotes);
  const [showQuotes, setShowQuotes] = useState();

  const [isAcceptedManage, setIsAcceptedManage] = useState(false); // 초기값은 submit 받은 데이터를 보여줌
  const [showCode, setShowCode] = useState('10');
  const dispatch = useDispatch();

  const [backgroundImagePath, setBackgroundImagePath] = useState(
    '/images/river.jpeg'
  );
  useEffect(() => {
    if (true || confirm.gb_cd === '1') {
      dispatch({
        type: GET_QUOTES_ADMIN_REQUEST,
        payload: { accepted: '1' }
      });
    }
  }, [confirm.gb_cd, dispatch]);

  useEffect(() => {
    const { data } = quotesAdminData;
    if (data) {
      const {
        accepted_quotes: acceptedQuotes,
        submit_quotes: submitQuotes
      } = data;
      let filterAccecptContent = acceptedQuotes;
      let filterSubmitContent = submitQuotes;
      if (isAcceptedManage) {
        // 전체
        filterAccecptContent = acceptedQuotes;
        if (showCode !== '전체') {
          filterAccecptContent =
            acceptedQuotes &&
            acceptedQuotes.filter((item) => {
              return showCode === item.card_exps_typ_cd;
            });
        }
      } else {
        // 요청
        filterSubmitContent = submitQuotes;
        if (showCode !== '전체') {
          filterSubmitContent =
            submitQuotes &&
            submitQuotes.filter((item) => {
              return showCode === item.card_exps_typ_cd;
            });
        }
      }
      setShowQuotes(
        isAcceptedManage ? filterAccecptContent : filterSubmitContent
      );
    }
  }, [isAcceptedManage, quotesAdminData, showCode]);

  const handleChangeCode = (event) => {
    setShowCode(event.target.value);
  };

  const handleChangeType = (event) => {
    setIsAcceptedManage(event.target.checked);
  };

  const handleClickButton = (accepted) => {
    dispatch({
      type: PUT_QUOTES_ACCEPTED,
      payload: { ids: returnIdList, accepted: accepted ? '0' : '1' }
    });
    returnIdList = [];
  };

  console.log('showQuotes ', showQuotes);
  return (
    <Wrapper>
      <BackGround backgroundImagePath={backgroundImagePath} />
      <Title>
        <div style={{ padding: '30px 0 30px 0' }}>
          <hr></hr>
          <div>확인좀 해주세요...</div>
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
            onChange={(event) => handleChangeCode(event)}
            row
          >
            {[10, 20, 30, '전체'].map((value, index) => (
              <FormControlLabel
                key={index}
                value={value.toString()}
                control={<Radio />}
                label={value.toString()}
              />
            ))}
          </RadioGroup>
          <button onClick={() => handleClickButton(true)}>Accept</button>
          <button onClick={() => handleClickButton(false)}>Decline</button>
        </div>
        <hr></hr>
      </Title>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} lg={1}></Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container spacing={1}>
            {showQuotes && <QuotesCardList quotesList={showQuotes} />}
          </Grid>
        </Grid>
        <Grid item xs={1} md={1} lg={1}></Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
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
export default WithAuth(HangangAdminContainer);
