import React from 'react';
import FileUploadForm from '../UnsplashContainer/FileUploadForm';
import CustomModal from '../../component/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BACKGROUND_IMAGE } from '../../modules/quotes/reducer';
import UnsplashContainer from '../UnsplashContainer';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const BackgroundSettingContainer = ({
  modalView,
  handleModalOpen,
  handleModalClose
}) => {
  const dispatch = useDispatch();
  const { selectedBackgroundUrl } = useSelector((state) => state.quotes);
  const callback = () => {};
  //변경
  const setSelectedBackgroundUrl = (image) => {
    dispatch({
      type: SET_BACKGROUND_IMAGE,
      payload: image
    });
  };
  return (
    <div>
      {modalView && (
        <CustomModal
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          component={
            <div style={{ width: '60%', margin: '0 auto' }}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="my server" key="1">
                  <FileUploadForm
                    setSelectedBackgroundUrl={setSelectedBackgroundUrl}
                    selectedBackgroundUrl={selectedBackgroundUrl}
                  />
                </TabPane>
                <TabPane tab="Find Unsplash" key="2">
                  <UnsplashContainer />
                </TabPane>
              </Tabs>
            </div>
          }
          modalView={modalView}
        />
      )}
    </div>
  );
};

export default BackgroundSettingContainer;
