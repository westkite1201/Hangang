import React, { useState, useRef } from 'react';
//import './styles.css';

import { fabric } from 'fabric';
// Or you can use:
// const fabric = require("fabric").fabric;
const images = [{ url: '/images/temp.jpeg' }];
export default function QuotesMakerContainer() {
  const [text, setState] = useState();
  const fabricRef = useRef();
  React.useEffect(() => {
    var imageSaver = document.getElementById('lnkDownload');
    imageSaver.addEventListener('click', saveImage, false);

    const canvas = new fabric.Canvas('my-fabric-canvas');
    fabricRef.current = canvas;
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      fill: 'blue',
      angle: 10,
      top: 20,
      left: 20
    });
    const textbox = new fabric.Textbox('입력하세요 명언을', {
      fontSize: 20,
      left: 50,
      top: 100,
      width: 200
    });
    canvas.add(textbox);
    canvas.add(rect);

    // do some stuff as new props or state have been received aka component did update
    let imagesList = new fabric.Image.fromURL(images[0].url, function (myImg) {
      let img1 = myImg.set({
        left: 0,
        top: 0
      });
      canvas.setBackgroundImage(img1, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img1.width,
        scaleY: canvas.height / img1.height
      });

      //canvas.backgroundImage.scaleToWidth(300);
      //canvas.backgroundImage.scaleToHeight(500);
      //canvas.setDimensions({ width: 300, height: 500 });
      canvas.renderAll();
      //canvas.add(img1);
      canvas.sendBackwards(img1);
    });
    console.log(imagesList);
    //canvas.add(imagesList);
    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, []);

  function saveImage(e) {
    this.href = fabricRef.current.toDataURL({
      format: 'png',
      quality: 1
    });
    this.download = 'canvas.png';
  }
  // function scaleToFill(img) {
  //   // get the scale
  //   var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  //   // get the top left position of the image
  //   var x = canvas.width / 2 - (img.width / 2) * scale;
  //   var y = canvas.height / 2 - (img.height / 2) * scale;
  //   ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  // }
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
  return (
    <div style={{ margin: 'auto' }}>
      <button onClick={switchType} name="type1">
        type1
      </button>
      <button onClick={switchType} name="type2">
        type2
      </button>
      <button onClick={switchType} name="type3">
        type3
      </button>
      <input type="file" id="imageLoader" name="imageLoader" />
      <canvas id="my-fabric-canvas" width={300} height={500} />
      <a id="lnkDownload" href="#">
        Save image
      </a>
    </div>
  );
}
