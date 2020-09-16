import React from 'react';
import Root from '../../component/Wave/Root';
import Money from '../../component/Money';
import styled from 'styled-components';
const WaveContainer = () => {
  return (
    <Sbody>
      <Money />
    </Sbody>
  );
};

export default WaveContainer;
const Sbody = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden; /* 영역을 넘는 부분은 숨기기 */
  background-color: #ffffff; /* 배경은 흰색 */
`;
