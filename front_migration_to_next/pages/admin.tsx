import React, { useState, useEffect } from 'react';
import QuotesCard from '../components/Quotes/QuotesCard';
import UnsplashContainer from '../components/UnsplashContainer/UnsplashContainer';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  submitQuotesThunk,
  setSelectedBackgroundUrl
} from '../lib/slices/quotesSlice';
const PreviewContainer = () => {
  const { selectedBackgroundUrl } = useSelector(
    (state: RootState) => state.quotes
  );
  console.log('selecetedBackgroundUrl', selectedBackgroundUrl);
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
    dispatch(submitQuotesThunk(quotes));
  };
  const handleSetSelectedBackgroundUrl = (image) => {
    const array = image.split('/');
    const imagePathName = array[array.length - 1];
    dispatch(
      setSelectedBackgroundUrl({ url: imagePathName, isUnsplash: false })
    );
  };

  return (
    <>
      <St.Container>
        <St.QuotesCardContainer>
          <St.PreviewWrapper>
            <St.QuotesCardWrapper>
              <QuotesCard quotes={quotes} index={0}></QuotesCard>
            </St.QuotesCardWrapper>
            <St.EditerContainer>
              <St.ButtonContainer>
                <Button variant="outlined" onClick={() => handleCardType('10')}>
                  포스터
                </Button>
                <Button variant="outlined" onClick={() => handleCardType('20')}>
                  배너
                </Button>
                <Button variant="outlined" onClick={() => handleCardType('30')}>
                  썸네일
                </Button>
              </St.ButtonContainer>
              <St.InputContainer>
                <TextField
                  placeholder="내용"
                  variant="outlined"
                  onChange={handleContentChange}
                />
                <TextField
                  placeholder="저자"
                  variant="outlined"
                  onChange={handleAuthorChange}
                />
              </St.InputContainer>
              <Button
                variant="outlined"
                color="secondary"
                onClick={submitQuotes}
              >
                UPLOAD
              </Button>
            </St.EditerContainer>
          </St.PreviewWrapper>
        </St.QuotesCardContainer>
        <St.TabContainer>
          <UnsplashContainer />
        </St.TabContainer>
      </St.Container>
    </>
  );
};

const St = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    input {
      margin-right: 10px;
    }
    margin-bottom: 1rem;
  `,
  PreviewWrapper: styled.div`
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  `,
  QuotesCardWrapper: styled.div`
    height: 40%;
    margin-top: 10%;
    min-height: 460px;
  `,
  EditerContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    button {
      margin-right: 0.5rem;
    }
    margin-bottom: 1rem;
  `,
  TabContainer: styled.div`
    min-width: 0px;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
  `,
  QuotesCardContainer: styled.div`
    min-width: 0px;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    box-shadow: rgb(0 0 0 / 2%) 0px 0px 8px;
  `
};

export default PreviewContainer;
