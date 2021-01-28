import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
//import styles from './SearchForm.module.scss';

const SearchForm = ({
  onSearch,
  onRandom,
  downloadImage,
  uploadSelectedImage,
}) => {
  const [query, setQuery] = useState(null);
  return (
    <div className={'searchForm'}>
      <input
        placeholder="input search image"
        className={'searchForm__query'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        //onSearch={() => onSearch(query)}
      />
      <Button onClick={downloadImage}>로컬 다운로드</Button>
      <Button onClick={uploadSelectedImage}>서버에 이미지 추가</Button>
      <Button onClick={onRandom}>Random</Button>
    </div>
  );
};

export default SearchForm;

// .searchForm {
//   display: flex;
//   padding-bottom: 10px;
//   .searchForm__query {
//     flex: 2;
//     margin-right: 10px;
//   }
// }
