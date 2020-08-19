import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './SearchForm.module.scss';

const SearchForm = ({
  onSearch,
  onRandom,
  downloadImage,
  uploadSelectedImage
}) => {
  const [query, setQuery] = useState(null);

  return (
    <div className={styles['searchForm']}>
      <Input.Search
        placeholder="input search image"
        className={styles['searchForm__query']}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={() => onSearch(query)}
      />
      <Button type="primary" onClick={downloadImage}>
        로컬 다운로드
      </Button>
      <Button type="primary" onClick={uploadSelectedImage}>
        서버에 이미지 추가
      </Button>
      <Button type="primary" onClick={onRandom}>
        Random
      </Button>
    </div>
  );
};

export default SearchForm;
