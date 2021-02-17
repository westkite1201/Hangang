import React from 'react';
import iconMap from '../../lib/iconMap';
import styled from 'styled-components';

const St = {
  NumberCard: styled.div`
    padding: 32px;
    margin-bottom: 24px;
    cursor: pointer;
    border-radius: 0;
    margin-bottom: 24px;
    background: #fff;
  `,

  IconWarp: styled.span`
    font-size: 54px;
    float: left;
  `,

  Content: styled.div`,
    width: 100%;
    padding-left: 78px;`,

  Title: styled.p`
    line-height: 16px;
    font-size: 16px;
    margin-bottom: 8px;
    height: 16px;
  `,
  Number: styled.p`
    line-height: 32px;
    font-size: 24px;
    height: 32px;

    margin-bottom: 0;
  `
};
interface INumberCardProps {
  icon: string;
  color: string;
  title: string;
  value: number;
}
function NumberCard({ icon, color, title, value }: INumberCardProps) {
  return (
    <St.NumberCard>
      <St.IconWarp color={color}>{iconMap[icon]}</St.IconWarp>
      <St.Content>
        <St.Title>{title || 'No Title'}</St.Title>
        <St.Number>
          <div>{value}</div>
        </St.Number>
      </St.Content>
    </St.NumberCard>
  );
}

export default NumberCard;
