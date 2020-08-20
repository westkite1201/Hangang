import React from 'react';
import './AboutCard.scss';
import {
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  MehOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
const AboutCard = ({ thumbnailPath, memUsername, memNickname, memInfo }) => {
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
            {memUsername}김서연 - {memNickname}westkite1201
          </div>
          <div className="my_infomation_contents">
            {memInfo}
            한량이 되고 싶은 못된 개발자, UI에 관심이 많고 개발자란 타이틀에
            요상한 로망이 있는 프론트앤더
          </div>
          <IconContainer>
            <div>
              <GithubOutlined />
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
  justify-content: center;
  font-size: 20px;
  div {
    padding: 5px;
  }
`;
export default AboutCard;
