/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import QuotesCard from '../components/Quotes/QuotesCard';
import UnsplashContainer from '../components/UnsplashContainer/UnsplashContainer';
//import FileUploadForm from '../components/UnsplashContainer/FileUploadForm';
import styled from 'styled-components';
import { Grid, Input, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
//import { IQuote } from '../interfaces';
import { RootState } from '../store';
// import {
//   SUBMIT_QUOTES_REQUEST,
//   SET_BACKGROUND_IMAGE,
// } from '../../modules/quotes/reducer';
//import { Tabs, Input, Button } from 'antd';
//const { TabPane } = Tabs;
const PreviewContainer = () => {
  const { selectedBackgroundUrl } = useSelector(
    (state: RootState) => state.quotes,
  );
  const spaceInsert = (str) => {
    return str.replace(/#/gi, '\n');
  };
  const dispatch = useDispatch();
  const [quotes, setQuotes] = useState({
    backgroundImagePath: selectedBackgroundUrl.url,
    isUnsplash: selectedBackgroundUrl.isUnsplash,
    id: selectedBackgroundUrl.id,
    thumbnailUserImage: '',
    card_exps_typ_cd: '10',
    word: '',
    name: '',
    fontColor: '',
    accepted: '0',
    usePreview: true,
  });

  useEffect(() => {
    setQuotes({
      ...quotes,
      backgroundImagePath: selectedBackgroundUrl.url,
      isUnsplash: selectedBackgroundUrl.isUnsplash,
      id: selectedBackgroundUrl.id,
    });
  }, [selectedBackgroundUrl]);

  const handleContentChange = (e) => {
    setQuotes({
      ...quotes,
      word: spaceInsert(e.target.value),
    });
  };
  const handleAuthorChange = (e) => {
    setQuotes({
      ...quotes,
      name: e.target.value,
    });
  };
  const handleCardType = (type) => {
    setQuotes({
      ...quotes,
      card_exps_typ_cd: type,
    });
  };

  const submitQuotes = () => {
    console.log('buttonClick');
    // dispatch({
    //   type: SUBMIT_QUOTES_REQUEST,
    //   payload: quotes,
    // });
  };
  const setSelectedBackgroundUrl = (image) => {
    const array = image.split('/');
    const imagePathName = array[array.length - 1];
    // dispatch({
    //   type: SET_BACKGROUND_IMAGE,
    //   payload: { url: imagePathName, isUnsplash: false },
    // });
  };
  return (
    <PreviewWrapper>
      <Container>
        <QuotesCardContainer>
          <Grid container spacing={3}>
            <QuotesCard quotes={quotes} index={0}></QuotesCard>
          </Grid>
        </QuotesCardContainer>
        <TabContainer>{<UnsplashContainer />}</TabContainer>
      </Container>
      <EditerContainer>
        <div>
          <Button onClick={() => handleCardType('10')}>카드 타입 1</Button>
          <Button onClick={() => handleCardType('20')}>카드 타입 2</Button>
          <Button onClick={() => handleCardType('30')}>카드 타입 3</Button>
        </div>
        <InputContainer>
          <Input placeholder="내용" onChange={handleContentChange} />
          <Input placeholder="저자" onChange={handleAuthorChange} />
        </InputContainer>
      </EditerContainer>
      <button onClick={submitQuotes}> 업 로 드</button>
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div``;
const Container = styled.div`
  display: flex;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const EditerContainer = styled.div``;
const TabContainer = styled.div`
  width: 50%;
`;
const QuotesCardContainer = styled.div`
  padding: 1rem;
  width: 50%;
`;

export default PreviewContainer;
