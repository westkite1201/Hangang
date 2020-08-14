import React from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
export const MyColorPicker = ({
  displayColorPicker,
  backgroundColor,
  handleClick,
  handleClose,
  handleChange
}) => {
  console.log('displayColorPicker', displayColorPicker);
  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={backgroundColor} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default MyColorPicker;
