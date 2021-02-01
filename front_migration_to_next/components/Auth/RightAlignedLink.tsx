import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Aligner = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const StyledLink = styled.div`
  color: ${oc.gray[6]};
  &:hover {
    color: ${oc.gray[7]};
  }
`;

const RightAlignedLink = ({ to, children }) => (
  <Aligner>
    <StyledLink>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;
