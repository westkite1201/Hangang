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
  color: white;
`;
const QuotesContent = styled.div`
  font-size: 2rem;
`;

const QuotesAuthor = styled.div`
  font-size: 1.4rem;
`;
