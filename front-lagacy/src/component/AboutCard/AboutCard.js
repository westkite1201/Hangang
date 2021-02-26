import React from 'react';
import './AboutCard.scss';
import {
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  MehOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
const AboutCard = ({
  thumbnailPath,
  memUsername,
  memNickname,
  memInfo,
  githubUrl
}) => {
  return (
    <div className="my_infomation_wrapper">
      <div className="my_infomation_container">
        <div className="my_infomation_thumbnail">
          {thumbnailPath ? (
            <img
              alt="thumbnail"
              className="my_infomation_thumbnail"
              src={thumbnailPath}
            ></img>
          ) : (
            <div style={{ width: '100%', height: '100%' }}>
              <MehOutlined style={{ fontSize: '100px' }} />
            </div>
          )}
        </div>
        <div className="my_infomation_body">
          <div className="my_infomation_name">
            {memUsername}
            <span className="my_infomation_nick_name">{memNickname}</span>
          </div>

          <div className="my_infomation_contents">{memInfo}</div>
          <IconContainer>
            <div>
              <GithubOutlined
                onClick={() => window.open(githubUrl, '_blank')}
              />
            </div>
            <div>
              <InstagramOutlined />
            </div>
            <div>
              <MailOutlined />
            </div>
          </IconContainer>
        </div>
      </div>
    </div>
  );
};

const IconContainer = styled.div`
  display: flex;
  justify-content: left;
  font-size: 20px;
  div {
    padding: 5px;
  }
`;
export default AboutCard;
