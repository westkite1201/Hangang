import React from 'react';
import styled from 'styled-components';
const QuotesItem = ({ quotes }) => {
  return (
    <QuotesItemWrapper>
      <QuotesContent>{quotes.word}</QuotesContent>
      <QuotesAuthor>{`-${quotes.name}`}</QuotesAuthor>
    </QuotesItemWrapper>
  );
};

export default QuotesItem;

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
