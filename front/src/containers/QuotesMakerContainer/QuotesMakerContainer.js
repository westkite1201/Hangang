import React, { useState, useRef } from 'react';
//import './styles.css';
import { Switch, Button } from 'antd';
import { fabric } from 'fabric';
import FontEditer from './FontEditor';
// Or you can use:
// const fabric = require("fabric").fabric;
const images = [{ url: '/images/temp.jpeg' }];
export default function QuotesMakerContainer() {
  const [fontSize, setFontSize] = useState();
  const [fontFamily, setFontFamily] = useState();
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
      preserveObjectStacking: true
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

  function switchType(e) {
    switch (e.target.name) {
      case 'type1':
        break;
      case 'type2':
        break;
      case 'type3':
        break;

      default:
        break;
    }
  }
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  function handleFontSize(fontSize) {
    setFontSize(fontSize);
  }
  function handleFontFamily(fontFamily) {
    console.log(fabricRef.current);
  }
  return (
    <div style={{ margin: 'auto' }}>
      <FontEditer
        fontSize={fontSize}
        fontFamily={fontFamily}
        handleFontSize={handleFontSize}
        handleFontFamily={handleFontFamily}
      />
      <Button onClick={addText}>텍스트 추가입력</Button>
      <Button onClick={switchType} name="type1">
        type1
      </Button>
      <Button onClick={switchType} name="type2">
        type2
      </Button>
      <Button onClick={switchType} name="type3">
        type3
      </Button>
      <Switch defaultChecked onChange={onChange}></Switch>
      <input type="file" id="imageLoader" name="imageLoader" />
      <canvas id="my-fabric-canvas" width={300} height={500} />
      <a id="lnkDownload" href="#">
        Save image
      </a>
    </div>
  );
}
