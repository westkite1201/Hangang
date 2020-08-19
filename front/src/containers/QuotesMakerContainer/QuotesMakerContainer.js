import React, { useState, useRef } from 'react';
//import './styles.css';
import { Switch, Button, Upload, message } from 'antd';
import { fabric } from 'fabric';
import FontEditer from './FontEditor';
import MyColorPicker from '../../component/MyColorPicker';
import { getRandomHexColor } from '../../lib/helper';
import UnsplashContainer from '../UnsplashContainer';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { SAVE_CANVAS_IMAGE_REQUEST } from '../../modules/quotes/reducer';
// Or you can use:
// const fabric = require("fabric").fabric;
//http://jsfiddle.net/fabricjs/hXzvk/ 참고해보기
const images = [{ url: '/images/temp.jpeg' }];
export default function QuotesMakerContainer() {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
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
  const dispatch = useDispatch();
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
    // let imageSaver = document.getElementById('lnkDownload');
    // imageSaver.addEventListener('click', saveImage, false);

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
    const textAuthor = new fabric.Textbox('작가', {
      fontSize: 30,
      fontFamily: 'NanumBrushScript-Regular',
      textAlign: 'center',
      left: 50,
      top: 100,
      width: 200,
      fill: '#fff'
    });
    canvas.add(textAuthor);

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
    canvas.renderAll();
    return () => {
      canvas.dispose();
    };
  }, []);

  //이미지 다운로드
  const saveImage = (e) => {
    try {
      let href = fabricRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      // let data = decodeBase64Image(this.href);
      // console.log('data ', data);
      dispatch({
        type: SAVE_CANVAS_IMAGE_REQUEST,
        payload: {
          imgB64Data: href,
          author: author,
          content: content
        }
      });
    } catch (e) {
      console.log('error', e);
    }

    //this.download = 'canvas.png';
  };

  function decodeBase64Image(dataString) {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
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

  //사진인지, color 인지 결정
  function onChange(checked) {
    let canvas = fabricRef.current;
    console.log(`switch to ${checked}`);
    setIsUsingBackGroundPicture(checked);
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
    let activeTextObj = fabricRef.current.getActiveObject();
    if (activeTextObj && activeTextObj.isType('text')) {
      activeTextObj.set({
        fontFamily: fontFamily
      });
      fabricRef.current.renderAll();
    }
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

  const handleContentChange = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };
  const handleAuthorChange = (e) => {
    console.log(e.target.value);
    setAuthor(e.target.value);
  };

  return (
    <QuotesMakerWrapper>
      {/*<UnsplashContainer />*/}
      <EditerWrapper>
        <FontEditer
          fontSize={fontSize}
          fontFamily={fontFamily}
          handleFontSize={handleFontSize}
          handleFontFamily={handleFontFamily}
        />
        <InputBox>
          <label for="fileAdd">백그라운드</label>
          <input
            id="fileAdd"
            name="files"
            type="file"
            onChange={backGroundChange}
            multiple
          />
        </InputBox>
        <Button onClick={deleteObject}>오브젝트 삭제</Button>
        <Button onClick={addText}>텍스트 추가</Button>
        <Button onClick={() => switchType('type1')}>카드 타입 1</Button>
        <Button onClick={() => switchType('type2')}>카드 타입 2</Button>
        <Switch defaultChecked onChange={onChange}></Switch>
      </EditerWrapper>
      <CanvasWrapper>
        <canvas
          id="my-fabric-canvas"
          width={canvasInfo.width}
          height={canvasInfo.height}
        />
      </CanvasWrapper>
      <MyColorPicker
        handleClick={handleClick}
        handleClose={handleClose}
        handleChange={handleChange}
        displayColorPicker={displayColorPicker}
        backgroundColor={backgroundColor}
      />
      <Input placeholder="내용" onChange={handleContentChange} />
      <Input placeholder="저자" onChange={handleAuthorChange} />
      {/*    <a id="lnkDownload" href="#">
        Save image
      </a> */}

      <Button id="lnkDownload" onClick={saveImage}>
        Save image
      </Button>
    </QuotesMakerWrapper>
  );
}
const QuotesMakerWrapper = styled.div`
  background-color: 'black';
`;
const EditerWrapper = styled.div``;
const CanvasWrapper = styled.div``;

const InputBox = styled.div`
  label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #999;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
  }
  input[type='file'] {
    /* 파일 필드 숨기기 */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
