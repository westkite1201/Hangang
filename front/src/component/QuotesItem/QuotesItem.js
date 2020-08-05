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
  height: 100px;
  color: white;
`;
const QuotesContent = styled.div`
  font-size: 2.5rem;
`;

const QuotesAuthor = styled.div`
  font-size: 1.5rem;
`;
