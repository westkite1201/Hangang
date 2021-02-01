import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import { clientConfig } from '../../configuration/clientConfig';
//import './FileUploadForm.scss';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { successToast, errorToast } from '../../lib/toast';
import { setSelectedBackgroundUrl } from '../../lib/slices/quotesSlice';
//import { SUCCESS_TOAST, FAILURE_TOAST } from '../../../modules/toast/reducer';
const USER_ID = 'testUser';
const PATH = clientConfig.endpoint.api + '/file/';

function ImageList({
  filesPathList,
  handleSelect
  //selectedBackgroundUrl
}) {
  if (_.isEmpty(filesPathList)) {
    return <div></div>;
  } else {
    const imageList = filesPathList.map((fileName: string, index: number) => {
      const url = PATH + 'image/' + fileName;
      // const className =
      //   url ===
      //   clientConfig.endpoint.api + '/file/image/' + selectedBackgroundUrl.url
      //     ? 'selected'
      //     : '';
      return (
        <Grid item xs={4} key={fileName + ' ' + index}>
          <ImgDiv>
            <img
              alt="background"
              src={url}
              onClick={() => handleSelect('', false, fileName)}
            ></img>
          </ImgDiv>
        </Grid>
      );
    });
    return imageList;
  }
}
const ImgDiv = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;
const FileUploadForm = ({
  handleSelect
  // setSelectedBackgroundUrl,
  // selectedBackgroundUrl,
  // backGroundChangeToUrl
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [filesPathList, setFilesPathList] = useState([]);

  useEffect(() => {
    getFileList();
  }, []);

  async function getFileList() {
    const data = {
      user_id: USER_ID
    };
    const res = await axios.post(PATH + 'getImageFilePath', data);
    setFilesPathList(res.data.data.files);
  }

  /*file Save to Server */
  async function onSubmitForm(e) {
    e.preventDefault();
    //console.log("onSubmitForm ", e.target.files);
    const fileInput = document.getElementById('fileAdd');
    if (_.isNil(fileInput)) {
      return;
    }
    const formData = new FormData();
    const userId = 'testUser';
    const userName = 'testUserName';
    formData.append('user_id', userId);
    formData.append('user_name', userName);
    for (const key of Object.keys(files)) {
      formData.append('files', files[key]);
    }
    //formData
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    try {
      const res = await axios.post(
        clientConfig.endpoint.api + '/file/uploadFiles',
        formData
      );
      console.log(res);
      if (res.data.code !== 200) {
        successToast('저장되었습니다');
        getFileList();
      } else {
        errorToast('저장에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* fileUpload  */
  const fileUpload = (event) => {
    console.log(event.target.files);
    const fileInput = document.getElementById('fileAdd');
    if (_.isNil(fileInput)) {
      return;
    }
    // let files = fileInput.files;
    // if (files.length >= 10) {
    //   alert('한번에 10개 이상은 저장하실수 없습니다. ');
    //   return;
    // }
    setFiles(event.target.files);
  };

  const fileDelete = async (e) => {
    e.preventDefault();
    try {
      const data = {
        //imageUrlPath: selectedBackgroundUrl
      };
      const res = await axios.post(
        clientConfig.endpoint.api + '/file/delete_file_image',
        data
      );
      if (res.status === 200) {
        // dispatch({
        //   type: SUCCESS_TOAST,
        //   payload: {},
        // });
        getFileList();
      } else {
        errorToast('삭제에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <InputContainer>
        <Button onClick={getFileList}>refresh</Button>
        <form encType="multipart/form-data" onSubmit={onSubmitForm}>
          <St.FileBox>
            <label id="labelFileAdd" htmlFor="fileAdd">
              파일 추가
            </label>
            <input
              id="fileAdd"
              name="files"
              type="file"
              onChange={fileUpload}
              multiple
            />
            <label id="labelSubmit" htmlFor="submit">
              저장
            </label>
            <input id="submit" type="submit" />
            <Button onClick={fileDelete}>해당 이미지 파일삭제 </Button>
          </St.FileBox>
        </form>
      </InputContainer>

      <div style={{ height: '400px', overflow: 'auto' }}>
        <Grid container spacing={3}>
          {
            <ImageList
              filesPathList={filesPathList}
              handleSelect={handleSelect}
              //selectedBackgroundUrl={selectedBackgroundUrl}
            />
          }
        </Grid>
      </div>
      {/*<Button onClick={backGroundChangeToUrl}>확인</Button>*/}
    </div>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export default FileUploadForm;

const St = {
  Selected: styled.div`
    border: 5px solid rebeccapurple;
  `,

  FileBox: styled.div`
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
    // ,
    #submit {
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
  `
};
