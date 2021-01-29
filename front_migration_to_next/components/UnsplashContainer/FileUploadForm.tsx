import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import { clientConfig } from '../../configuration/clientConfig';
import './FileUploadForm.scss';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
//import { SUCCESS_TOAST, FAILURE_TOAST } from '../../../modules/toast/reducer';
const USER_ID = 'testUser';
const PATH = clientConfig.endpoint.api + '/file/';
function ImageList({
  filesPathList,
  setSelectedBackgroundUrl,
  selectedBackgroundUrl
}) {
  if (_.isEmpty(filesPathList)) {
    console.log('isEmpty ');
    return <div></div>;
  } else {
    const imageList = filesPathList.map((item, index) => {
      const url = PATH + 'image/' + item;
      const className =
        url ===
        clientConfig.endpoint.api + '/file/image/' + selectedBackgroundUrl.url
          ? 'selected'
          : '';
      return (
        <Grid item xs={4} key={item}>
          <ImgDiv className={className}>
            <img
              alt="background"
              src={url}
              onClick={() => setSelectedBackgroundUrl(url)}
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
  setSelectedBackgroundUrl,
  selectedBackgroundUrl,
  backGroundChangeToUrl
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
        alert('저장되었습니다!');
        getFileList();
      } else {
        alert('저장에 실패하였습니다.');
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
        imageUrlPath: selectedBackgroundUrl
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
        alert('삭제에 실패하였습니다.');
        // dispatch({
        //   type: FAILURE_TOAST,
        //   payload: {},
        // });
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
          <div className="filebox">
            <label id="labelFileAdd" htmlFor="fileAdd">
              File Add
            </label>
            <input
              id="fileAdd"
              name="files"
              type="file"
              onChange={fileUpload}
              multiple
            />
            <label id="labelSubmit" htmlFor="submit">
              save
            </label>
            <input id="submit" type="submit" />
            <Button onClick={fileDelete}>해당 이미지 파일삭제 </Button>
          </div>
        </form>
      </InputContainer>

      <div style={{ height: '400px', overflow: 'auto' }}>
        <Grid container spacing={3}>
          <ImageList
            filesPathList={filesPathList}
            setSelectedBackgroundUrl={setSelectedBackgroundUrl}
            selectedBackgroundUrl={selectedBackgroundUrl}
          />
        </Grid>
      </div>
      <Button onClick={backGroundChangeToUrl}>확인</Button>
    </div>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export default FileUploadForm;

// .selected {
//   border: 5px solid rebeccapurple;
// }

// .filebox label {
//   display: inline-block;
//   padding: 0.5em 0.75em;
//   color: #999;
//   font-size: inherit;
//   line-height: normal;
//   vertical-align: middle;
//   background-color: #fdfdfd;
//   cursor: pointer;
//   border: 1px solid #ebebeb;
//   border-bottom-color: #e2e2e2;
//   border-radius: 0.25em;
// }
// .filebox input[type='file'] {
//   /* 파일 필드 숨기기 */
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   border: 0;
// }
// .filebox #submit {
//   /* 파일 필드 숨기기 */
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   border: 0;
// }
