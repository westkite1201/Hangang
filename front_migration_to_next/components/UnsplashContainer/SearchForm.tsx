import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import styled from 'styled-components';
import { errorToast } from '../../lib/toast';
//import styles from './SearchForm.module.scss';

const St = {
  SearchForm: styled.div`
    display: flex;
    justify-content: center;
  `
};
const SearchForm = ({
  onSearch,
  onRandom,
  downloadImage,
  uploadSelectedImage
}) => {
  const [query, setQuery] = useState(null);
  function handleSearch() {
    if (query) {
      onSearch(query);
    } else {
      errorToast('검색어를 입력해주세요!');
    }
  }

  return (
    <St.SearchForm>
      <Input
        placeholder="검색어를 입력하세요."
        className={'searchForm__query'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outlined" onClick={handleSearch}>
        검색
      </Button>
      <Button variant="outlined" onClick={onRandom}>
        랜덤 검색
      </Button>
      <Button variant="outlined" onClick={downloadImage}>
        로컬 다운로드
      </Button>
      <Button variant="outlined" onClick={uploadSelectedImage}>
        서버에 이미지 추가
      </Button>
    </St.SearchForm>
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
