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
              thumbnailPath={'/images/명성.jpg'}
              memUsername={'명성'}
              memNickname={'MasonMyeong'}
              memInfo={'명성'}
              githubUrl={'https://github.com/SeongMyeong'}
            />
            <AboutCard
              thumbnailPath={'/images/서연.jpg'}
              memUsername={'김서연'}
              memNickname={'westkite1201'}
              memInfo={
                '한량이 되고 싶은 못된 개발자, UI에 관심이 많고 개발자란 타이틀에 요상한 로망이 있는 프론트앤더'
              }
              githubUrl={'https://github.com/westkite1201'}
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
