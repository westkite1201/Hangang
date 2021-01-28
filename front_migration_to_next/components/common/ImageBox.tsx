import { useState, useEffect, useRef } from 'react';
//현재 사용하지 않음
const ImageBox = ({ thumbnail, onClick }) => {
  const [height, setHeight] = useState(0);

  const targetDiv = useRef(null);

  useEffect(() => {
    setHeight(targetDiv.current.clientHeight);
  }, []);

  return (
    <div
      className="thumbnail__item'"
      style={{
        gridRowEnd: `span ${Math.floor(height / 10)}`,
      }}
      ref={targetDiv}
    >
      <img
        src={thumbnail.urls.thumb}
        //data-src={defaultImg}
        alt={thumbnail.alt_description}
        //className={CX({ [styles.active]: thumbnail.id === selected })}
        onClick={() => onClick(thumbnail)}
      />
      <span>By {thumbnail.user.username}</span>
    </div>
  );
};

export default ImageBox;
