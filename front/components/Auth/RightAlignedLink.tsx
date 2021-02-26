import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Link from 'next/link';
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

const RightAlignedLink = ({ onClick, children }) => (
  <Aligner>
    <StyledLink onClick={onClick}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;
