import React, { useState } from 'react';
import Preview from '../../component/Preview/Preview';
import Palette from '../../component/Palette';
import {
  getContrastYIQ,
  getRandomHexColor
} from '../../component/common/Utils';

const Input = ({ color, handleInputChange }) => {
  return (
    <div className="inputWrapper">
      <input
        className="textInput"
        onChange={(e) => handleInputChange(e)}
        name="text"
        style={{ color }}
        type="text"
        size="40"
        placeholder="Type text here :)"
      />
    </div>
  );
};
const BannerContainer = () => {
  const [href, setHref] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [quotesText, setQuotesText] = useState('');
  const [backGroundType, setBackGroundType] = useState();

  const handleInputChange = (e) => {
    setQuotesText(e.target.value);
  };

  const handleColorType = (colorType) => {
    this.setState({ colorType });
  };

  const handleCanvasChange = (href) => {
    setHref(href);
  };

  const handleBgModal = (open) => () => {
    this.setState({ bgModalOpen: open });
  };

  const setBackgroundImage = (blob) => {
    this.setState({
      backgroundType: 'image',
      backgroundImage: blob,
      bgModalOpen: false
    });
  };
  return (
    <div>
      <Preview
        backgroundType="color"
        backgroundColor="white"
        quotesText={quotesText}
        fontSize={80}
        textColor={'black'}
        updateCanvas={handleCanvasChange}
        width={'700'}
        height={'500'}
      />
      {/*<Palette />*/}
      <Input handleInputChange={handleInputChange} />
    </div>
  );
};
export default BannerContainer;
