import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import QuotesCard from '../../component/QuotesCard';
import UnsplashContainer from '../UnsplashContainer';
import FileUploadForm from '../UnsplashContainer/FileUploadForm';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  SUBMIT_QUOTES_REQUEST,
  SET_BACKGROUND_IMAGE
} from '../../modules/quotes/reducer';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const PreviewContainer = () => {
  const { selectedBackgroundUrl } = useSelector((state) => state.quotes);
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
    usePreview: true
  });

  useEffect(() => {
    setQuotes({
      ...quotes,
      backgroundImagePath: selectedBackgroundUrl.url,
      isUnsplash: selectedBackgroundUrl.isUnsplash,
      id: selectedBackgroundUrl.id
    });
  }, [selectedBackgroundUrl]);

  const handleContentChange = (e) => {
    setQuotes({
      ...quotes,
      word: spaceInsert(e.target.value)
    });
  };
  const handleAuthorChange = (e) => {
    setQuotes({
      ...quotes,
      name: e.target.value
    });
  };
  const handleCardType = (type) => {
    setQuotes({
      ...quotes,
      card_exps_typ_cd: type
    });
  };

  const submitQuotes = () => {
    console.log('buttonClick');
    dispatch({
      type: SUBMIT_QUOTES_REQUEST,
      payload: quotes
    });
  };
  const setSelectedBackgroundUrl = (image) => {
    let array = image.split('/');
    let imagePathName = array[array.length - 1];
    dispatch({
      type: SET_BACKGROUND_IMAGE,
      payload: { url: imagePathName, isUnsplash: false }
    });
  };
  const callback = () => {};
  return (
    <PreviewWrapper>
      <Container>
        <QuotesCardContainer>
          <Grid container spacing={3}>
            <QuotesCard quotes={quotes}></QuotesCard>
          </Grid>
        </QuotesCardContainer>
        <TabContainer>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="my server" key="1">
              <FileUploadForm
                setSelectedBackgroundUrl={setSelectedBackgroundUrl}
                selectedBackgroundUrl={selectedBackgroundUrl}
              />
            </TabPane>
            <TabPane tab="Find Unsplash" key="2">
              <UnsplashContainer />
            </TabPane>
          </Tabs>
        </TabContainer>
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
      <Button onClick={submitQuotes}> 업 로 드</Button>
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
