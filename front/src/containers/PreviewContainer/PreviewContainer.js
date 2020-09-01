import React, { useState } from 'react';
import { Input, Button } from 'antd';
import QuotesCard from '../../component/QuotesCard';
import UnsplashContainer from '../UnsplashContainer';
import styled from 'styled-components';
const PreviewContainer = () => {
  const spaceInsert = (str) => {
    return str.replace(/#/gi, '\n');
  };
  const [quotes, setQuotes] = useState({
    card_exps_typ_cd: '10',
    word: '',
    name: ''
  });

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

  return (
    <PreviewWrapper>
      <EditerContainer>
        {/*<UnsplashContainer />*/}
        <div>
          <Button onClick={() => handleCardType('10')}>카드 타입 1</Button>
          <Button onClick={() => handleCardType('20')}>카드 타입 2</Button>
          <Button onClick={() => handleCardType('30')}>카드 타입 2</Button>
        </div>
        <div>
          <Input placeholder="내용" onChange={handleContentChange} />
          <Input placeholder="저자" onChange={handleAuthorChange} />
        </div>
      </EditerContainer>
      <QuotesCardContainer>
        <QuotesCard quotes={quotes}></QuotesCard>
      </QuotesCardContainer>
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div`
  display: flex;
`;
const EditerContainer = styled.div``;
const QuotesCardContainer = styled.div``;

export default PreviewContainer;
