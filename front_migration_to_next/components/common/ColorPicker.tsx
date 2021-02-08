import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
interface IRgbColor {
  colorValue?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}
//${(props: IRgbColor => `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
const St = {
  Color: styled.div`
    width: 36px;
    height: 14px;
    border-radius: 2px;
    background: ${({ colorValue }: IRgbColor) =>
      `rgba(${colorValue.r}, ${colorValue.g}, ${colorValue.b}, ${colorValue.a})`};
  `,
  Swatch: styled.div`
    padding: 5px;
    background: #fff;
    borderradius: 1px;
    boxshadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
  `,
  Popover: styled.div`
    position: absolute;
    zindex: 2;
  `,
  Cover: styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  `
};

const SketchExample = ({ quotes, setQuotes }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: 241,
    g: 112,
    b: 19,
    a: 1
  });

  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    console.log('hello clolr ', color);
    setColor(color.rgb);
    setQuotes({ ...quotes, font_color: color.hex });
  };
  return (
    <div>
      <St.Swatch onClick={handleClick}>
        <St.Color colorValue={color} />
      </St.Swatch>
      {displayColorPicker ? (
        <St.Popover>
          <St.Cover onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </St.Popover>
      ) : null}
    </div>
  );
};

export default SketchExample;
