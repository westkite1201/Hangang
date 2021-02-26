import { useState, useRef, useEffect } from 'react';
import { clientConfig } from '../../configuration/clientConfig';
const PATH = clientConfig.endpoint.api + '/file/';
interface IImageBoxProps {
  rowHeight: number;
  rowGap: number;
  windowSize: number;
  url: string;
  handleSelect?: (photo, isUnsplash: boolean, url: string) => void;
}
const ImageBox = (props: IImageBoxProps) => {
  const { rowHeight, rowGap, windowSize, url, handleSelect } = props;
  const [height, setHeight] = useState(0);
  const [gridRowEnd, setGridRowEnd] = useState(0);
  const targetRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setHeight(targetRef.current.clientHeight);
  }, [windowSize]);

  useEffect(() => {
    if (height !== 0) {
      const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
      setGridRowEnd(rowSpan);
    }
  }, [height]);

  useEffect(() => {
    setHeight(targetRef.current.clientHeight);
  }, []);

  useEffect(() => {
    setHeight(targetRef.current.clientHeight);
  }, [loading]);

  function handleImageLoaded() {
    setLoading(false);
  }
  const fullUrl = PATH + 'image/' + url;
  return (
    <div className="item photo" style={{ gridRowEnd: `span ${gridRowEnd}` }}>
      <div className="content" ref={targetRef}>
        <img
          className="photothumb"
          src={fullUrl}
          onLoad={handleImageLoaded}
          data-src={loading ? '/images/temp.jpage' : fullUrl}
          onClick={() => handleSelect('', false, url)}
        />
      </div>
    </div>
  );
};

export default ImageBox;
