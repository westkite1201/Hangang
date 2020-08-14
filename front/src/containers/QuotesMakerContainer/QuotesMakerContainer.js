import React, { useState, useRef } from 'react';
//import './styles.css';
import { Switch, Button } from 'antd';
import { fabric } from 'fabric';
import FontEditer from './FontEditor';
import MyColorPicker from '../../component/MyColorPicker';
import { getRandomHexColor } from '../../lib/helper';

// Or you can use:
// const fabric = require("fabric").fabric;
//http://jsfiddle.net/fabricjs/hXzvk/ 참고해보기
const images = [{ url: '/images/temp.jpeg' }];
export default function QuotesMakerContainer() {
  const [fontSize, setFontSize] = useState();
  const [fontFamily, setFontFamily] = useState();
  const [isUsingBackGroundPicture, setIsUsingBackGroundPicture] = useState(
    true
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1'
  });
  const [canvasInfo, setCanvasInfo] = useState({
    // width: 300,
    // height: 500
    width: 700,
    height: 240
  });
  const fabricRef = useRef();

  function addText() {
    const textbox = new fabric.Textbox('입력하세요 명언을', {
      fontSize: 40,
      fontFamily: 'NanumBrushScript-Regular',
      textAlign: 'center',
      left: 50,
      top: 100,
      width: 200,
      fill: '#fff'
    });
    fabricRef.current.add(textbox);
  }

  React.useEffect(() => {
    var imageSaver = document.getElementById('lnkDownload');
    imageSaver.addEventListener('click', saveImage, false);

    const canvas = new fabric.Canvas('my-fabric-canvas', {
      preserveObjectStacking: true,
      serializeBgOverlay: false //to serialize background data toJson
    });
    fabricRef.current = canvas;

    const textbox = new fabric.Textbox('입력하세요 명언을', {
      fontSize: 40,
      fontFamily: 'NanumBrushScript-Regular',
      textAlign: 'center',
      left: 50,
      top: 100,
      width: 200,
      fill: '#fff'
    });
    canvas.add(textbox);
    // canvas.add(rect);

    // do some stuff as new props or state have been received aka component did update
    new fabric.Image.fromURL(images[0].url, function (myImg) {
      let backgroundImage = myImg.set({
        left: 0,
        top: 0
      });
      canvas.setBackgroundImage(images[0].url, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / backgroundImage.width,
        scaleY: canvas.height / backgroundImage.height,
        backgroundImageOpacity: 1,
        backgroundImageStretch: true
      });
    });
    // canvas.on('mouse:wheel', function (opt) {
    //   let delta = opt.e.deltaY;
    //   let pointer = canvas.getPointer(opt.e);
    //   let zoom = canvas.getZoom();
    //   zoom = zoom + delta / 200;
    //   if (zoom > 10) zoom = 10;
    //   if (zoom < 1) zoom = 1;
    //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // });
    canvas.renderAll();
    return () => {
      canvas.dispose();
    };
  }, []);

  //이미지 다운로드
  function saveImage(e) {
    this.href = fabricRef.current.toDataURL({
      format: 'png',
      quality: 1
    });
    this.download = 'canvas.png';
  }
  function backGroundChange(e) {
    let canvas = fabricRef.current;
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (f) {
      let data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        let oImg = img.set({
          left: 0,
          top: 0
          // angle: 0,
          // width: canvas.width,
          // height: canvas.height
        });
        canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / oImg.width,
          scaleY: canvas.height / oImg.height,
          backgroundImageOpacity: 1,
          backgroundImageStretch: true
        });
        canvas.renderAll();
        let dataURL = canvas.toDataURL({
          format: 'png',
          quality: 1
        });
      });
    };
    reader.readAsDataURL(file);
  }
  function switchType(type) {
    switch (type) {
      case 'type1':
        setCanvasInfo({
          width: 300,
          height: 500
        });
        fabricRef.current.setDimensions({ width: 300, height: 500 });
        // do some stuff as new props or state have been received aka component did update
        new fabric.Image.fromURL(images[0].url, function (myImg) {
          fabricRef.current.backgroundImage = 0;
          let backgroundImage = myImg.set({
            left: 0,
            top: 0
          });
          fabricRef.current.setBackgroundImage(
            images[0].url,
            fabricRef.current.renderAll.bind(fabricRef.current),
            {
              scaleX: 300 / backgroundImage.width,
              scaleY: 500 / backgroundImage.height,
              backgroundImageOpacity: 1,
              backgroundImageStretch: true
            }
          );
        });
        fabricRef.current.renderAll();
        break;
      case 'type2':
        fabricRef.current.setDimensions({ width: 700, height: 240 });
        setCanvasInfo({
          width: 700,
          height: 240
        });
        // do some stuff as new props or state have been received aka component did update
        new fabric.Image.fromURL(images[0].url, function (myImg) {
          let backgroundImage = myImg.set({
            left: 0,
            top: 0
          });
          fabricRef.current.setBackgroundImage(
            images[0].url,
            fabricRef.current.renderAll.bind(fabricRef.current),
            {
              scaleX: 700 / backgroundImage.width,
              scaleY: 240 / backgroundImage.height,
              backgroundImageOpacity: 1,
              backgroundImageStretch: true
            }
          );
        });
        //fabricRef.current.renderAll();
        break;
      case 'type3':
        break;

      default:
        break;
    }
  }

  // fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  //   x: 0.5,
  //   y: -0.5,
  //   offsetY: 16,
  //   cursorStyle: 'pointer',
  //   mouseUpHandler: deleteObject,
  //   //render: renderIcon,
  //   cornerSize: 24
  // });
  // function deleteObject(eventData, target) {
  //   var canvas = target.canvas;
  //   canvas.remove(target);
  //   canvas.requestRenderAll();
  // }

  function onChange(checked) {
    let canvas = fabricRef.current;
    console.log(`switch to ${checked}`);
    if (checked) {
      fabricRef.current.backgroundImage = 0;
      fabricRef.current.renderAll();
    } else {
      fabric.Image.fromURL(images[0].url, function (myImg) {
        let backgroundImage = myImg.set({
          left: 0,
          top: 0
        });
        canvas.setBackgroundImage(
          images[0].url,
          canvas.renderAll.bind(canvas),
          {
            scaleX: canvas.width / backgroundImage.width,
            scaleY: canvas.height / backgroundImage.height,
            backgroundImageOpacity: 1,
            backgroundImageStretch: true
          }
        );
      });
    }
  }
  function handleFontSize(fontSize) {
    setFontSize(fontSize);
  }
  function handleFontFamily(fontFamily) {
    console.log(fabricRef.current);
  }

  const deleteObject = function () {
    let activateObj = fabricRef.current.getActiveObject();
    console.log(fabricRef.current.remove(activateObj));
  };

  const handleChangeComplete = (color) => {
    let canvas = fabricRef.current;
    setBackgroundColor(color.hex);
    canvas.setBackgroundColor(color.hex, canvas.renderAll.bind(canvas));
    canvas.renderAll();
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    console.log('color ', color);
    let canvas = fabricRef.current;
    setBackgroundColor(color.rgb);
    canvas.setBackgroundColor(color.hex, canvas.renderAll.bind(canvas));
    canvas.renderAll();
  };
  return (
    <div style={{ margin: 'auto' }}>
      <MyColorPicker
        handleClick={handleClick}
        handleClose={handleClose}
        handleChange={handleChange}
        displayColorPicker={displayColorPicker}
        backgroundColor={backgroundColor}
      />
      <FontEditer
        fontSize={fontSize}
        fontFamily={fontFamily}
        handleFontSize={handleFontSize}
        handleFontFamily={handleFontFamily}
      />

      <input
        id="fileAdd"
        name="files"
        type="file"
        onChange={backGroundChange}
        multiple
      />
      <Button onClick={deleteObject}>삭제</Button>
      <Button onClick={addText}>텍스트 추가입력</Button>
      <Button onClick={() => switchType('type1')}>type1</Button>
      <Button onClick={() => switchType('type2')}>type2</Button>
      {/*
      <Button onClick={switchType} name="type3">
        type3
      </Button>
      */}
      <Switch defaultChecked onChange={onChange}></Switch>
      <input type="file" id="imageLoader" name="imageLoader" />
      <canvas
        id="my-fabric-canvas"
        width={canvasInfo.width}
        height={canvasInfo.height}
      />
      <a id="lnkDownload" href="#">
        Save image
      </a>
    </div>
  );
}
