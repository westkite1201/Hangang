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
      <button onClick={downloadImage}>로컬 다운로드</button>
      <button onClick={uploadSelectedImage}>서버에 이미지 추가</button>
      <button onClick={onRandom}>Random</button>
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
