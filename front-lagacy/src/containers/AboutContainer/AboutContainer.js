import React from 'react';
import AboutCard from '../../component/AboutCard';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
const AboutContainer = (props) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={1} md={2} lg={2}></Grid>
        <Grid item xs={10} md={8} lg={8}>
          <AboutCardContainer>
            <AboutCard
              thumbnailPath={'/images/서연.jpg'}
              memUsername={'김서연'}
              memNickname={'westkite1201'}
              memInfo={
                '한량이 되고 싶은 못된 개발자! 개발자란 타이틀에 요상한 로망이 있고 참고로 제라스 서폿 원픽유저다. 낙성대 제라스라고 불러줬음 좋겠다.'
              }
              githubUrl={'https://github.com/westkite1201'}
            />
            <AboutCard
              thumbnailPath={'/images/명성.jpg'}
              memUsername={'명성'}
              memNickname={'MasonMyeong'}
              memInfo={
                '풀스택을 지향하는 로직마스터! 클라이밍을 사랑하고 수염을 기르는 마초~마초~맨이다. 침착맨을 가끔 닮았다고 듣는다.'
              }
              githubUrl={'https://github.com/SeongMyeong'}
            />
          </AboutCardContainer>
        </Grid>
        <Grid item xs={1} md={2} lg={2}></Grid>
      </Grid>
    </div>
  );
};

const AboutCardContainer = styled.div``;
export default AboutContainer;
