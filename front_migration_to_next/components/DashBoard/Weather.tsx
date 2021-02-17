import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
const St = {
  Weather: styled.div`
    color: ${({ theme }) => theme.mode.gray1};
    height: 204px;
    padding: 24px;
    justify-content: space-between;
    display: flex;
    font-size: 14px;
    p {
      margin-top: 16px;
    }
    background: white;
  `,
  Left: styled.div`
    display: flex;
    flex-direction: column;
    width: 64px;
    padding-top: 55px;
  `,
  Icon: styled.div`
    width: 64px;
    height: 64px;
    background-position: center;
    background-size: contain;
  `,
  WeatherRight: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
  `,
  Temperature: styled.h1`
    font-size: 36px;
    text-align: right;
    height: 64px;
    color: #fff;
  `,
  Description: styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  `
};
function Weather({ city, icon, dateTime, temperature, name, loading }) {
  return (
    <Spin spinning={loading}>
      <St.Weather>
        <St.Left>
          <St.Icon
            style={{
              backgroundImage: `url(${icon})`
            }}
          />
          <p>{name}</p>
        </St.Left>
        <St.WeatherRight>
          <St.Temperature>{`${temperature}°`}</St.Temperature>
          <St.Description>
            {city},{dateTime}
          </St.Description>
        </St.WeatherRight>
      </St.Weather>
    </Spin>
  );
}

export default Weather;
