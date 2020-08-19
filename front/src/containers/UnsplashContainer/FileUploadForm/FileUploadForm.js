import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import './FileUploadForm.scss';
const USER_ID = 'testUser';
const PATH = 'http://localhost:3031/api/file/';
function ImageList({ filesPathList, setBackgroundUrl, selectedBackgroundUrl }) {
  console.log(filesPathList);
  if (_.isEmpty(filesPathList)) {
    console.log('isEmpty ');
    return <div></div>;
  } else {
    let imageList = filesPathList.map((item, index) => {
      let url = PATH + 'image/' + item;
      let className = url === selectedBackgroundUrl ? 'selected' : '';

      return (
        <Grid item xs={4} key={item}>
          <ImgDiv
            style={{ width: '200px', height: '100px', cursor: 'pointer' }}
            className={className}
          >
            <img
              alt="background"
              src={url}
              //onClick={() => setBackgroundUrl(url)}
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
const FileUploadForm = (props) => {
  const [files, setFiles] = useState([]);
  const [filesPathList, setFilesPathList] = useState([]);

  useEffect(() => {
    getFileList();
  }, []);
  async function getFileList() {
    let data = {
      user_id: USER_ID
    };
    let res = await axios.post(PATH + 'getImageFilePath', data);
    console.log('res ', res.data.data.files);

    setFilesPathList(res.data.data.files);
  }

  /*file Save to Server */
  async function onSubmitForm(e) {
    e.preventDefault();
    //console.log("onSubmitForm ", e.target.files);
    let fileInput = document.getElementById('fileAdd');
    if (_.isNil(fileInput)) {
      return;
    }
    let formData = new FormData();

    // let userId = cookies.get('user_id');
    // let user_name = cookies.get('user_name');
    let userId = 'testUser';
    let userName = 'testUserName';
    formData.append('user_id', userId);
    formData.append('user_name', userName);

    for (const key of Object.keys(files)) {
      formData.append('files', files[key]);
    }
    //formData

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      const res = await axios.post(
        'http://localhost:3031/api/file/uploadFiles',
        formData
      );
      console.log(res);
      if (res.data.code !== 200) {
        alert('저장되었습니다!');
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
    let fileInput = document.getElementById('fileAdd');
    if (_.isNil(fileInput)) {
      return;
    }
    let files = fileInput.files;
    if (files.length >= 10) {
      alert('한번에 10개 이상은 저장하실수 없습니다. ');
      return;
    }

    setFiles(event.target.files);
  };

  return (
    <div>
      <button onClick={getFileList}> getFileList </button>
      {/*
      <button onClick={setting.settingBackgroundURLRedis}>
        해당 백그라운드 저장
      </button>
      */}
      <form encType="multipart/form-data" onSubmit={onSubmitForm}>
        <div className="filebox">
          <label id="labelSubmit" for="submit">
            save
          </label>
          <input id="submit" type="submit" />
          <label id="labelFileAdd" for="fileAdd">
            File Add
          </label>
          <input
            id="fileAdd"
            name="files"
            type="file"
            onChange={fileUpload}
            multiple
          />
        </div>
      </form>
      <div>
        <Grid container spacing={3}>
          <ImageList
            filesPathList={filesPathList}
            // setBackgroundUrl={setting.setBackgroundUrl}
            // selectedBackgroundUrl={setting.selectedBackgroundUrl}
          />
        </Grid>
      </div>
    </div>
  );
};

export default FileUploadForm;
