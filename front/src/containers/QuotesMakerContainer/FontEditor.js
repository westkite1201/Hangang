import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const FontEditor = ({
  fontSize,
  fontFamily,
  handleFontSize,
  handleFontFamily
}) => {
  const fontSizeList = [
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    120,
    140,
    180,
    240
  ];
  const fontFamilyList = [
    'Monaco',
    'Nanum Myeongjo',
    'Noto Sans KR',
    'Yeon Sung',
    'Do Hyeon',
    'Lobster',
    'Times New Roman',
    'Impact',
    'Helvetica',
    'Courier'
  ];

  return (
    <div className="editorWrapper">
      <div className="editoritem">
        <Select
          className="fontSelect"
          placeholder="font family"
          defaultValue={fontFamily}
          style={{ width: 150 }}
          onChange={handleFontFamily}
        >
          {fontFamilyList.map((family) => (
            <Option key={family} value={family}>
              {family}
            </Option>
          ))}
        </Select>
      </div>

      <div className="editoritem">
        <Select
          style={{ width: 150 }}
          placeholder="font size"
          defaultValue={fontSize}
          optionFilterProp="children"
          onChange={handleFontSize}
        >
          {fontSizeList.map((size) => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default FontEditor;
