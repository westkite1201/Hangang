import React from 'react';
import styled from 'styled-components';
export interface StatusProps {
    count:  number;
    info : string; 
  }
const StatusCard: React.FC<StatusProps> = ({count, info}) => {
    return (
        <StatusCardWrapper>
            <div>
                {info}
            </div>
            {count}
        </StatusCardWrapper>
    );
};
const StatusCardWrapper = styled.div`
    background-color: white;
    width : 500px;
    height: 500px;
    border-radius :4px;
    margin : 5px;

`;

export default StatusCard;