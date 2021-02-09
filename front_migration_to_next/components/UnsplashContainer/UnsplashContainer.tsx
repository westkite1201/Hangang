import React, { useState, useEffect, useCallback, useRef } from 'react';
import ThumbnailList from './ThumbnailList';
import * as UnsplashAPI from '../../lib/api/unsplash';
//import { downloadPhoto } from '../../lib/downloadPhoto';
import SearchForm from './SearchForm';
//import useIntersectionObserver from './useIntersectionObserver';
import Loading from '../common/Loading';
import FileUploadForm from './FileUploadForm';
import { useDispatch } from 'react-redux';
import {
  uploadImageThunk,
  setSelectedBackgroundUrl
} from '../../lib/slices/quotesSlice';
import styled from 'styled-components';
import { lnfoToast } from '../../lib/toast';
import StyledTab from '../common/StyledTab';

const PER_PAGE = 30;
const St = {
  Wrapper: styled.div`
    word-break: break-word;
    padding: 1rem;
    flex: 1 1 0%;
    overflow-y: auto;
    color: rgb(33, 37, 41);
  `,
  LoadingWrapper: styled.div`
    margin: auto;
  `
};

const UnsplashContainer = () => {
  const dispatch = useDispatch();
  const currentQuery = useRef('');
  const currentPage = useRef(1);
  const totalPage = useRef(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  const loadImage = useCallback(
    async ({ query, page }) => {
      try {
        setLoading(true);
        const data = await UnsplashAPI.searchPhotos({
          query,
          page,
          per_page: PER_PAGE
        });
        totalPage.current = data.total_pages;
        return data;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [setError]
  );

  const searchImage = useCallback(
    async (query) => {
      if (!query) {
        await loadRandomImage();
        return;
      }
      currentQuery.current = query;
      currentPage.current = 1;
      try {
        const data = await loadImage({ query, page: 1, per_page: PER_PAGE });

        setImages([...data.results]);
      } catch (e) {
        console.error(e);
      }
    },
    [loadImage]
  );

  async function loadRandomImage() {
    try {
      setLoading(true);
      const data = await UnsplashAPI.getRandomPhotos({ count: 30 });
      totalPage.current = 5;
      currentQuery.current = '';
      setImages((images) => [...images, ...data]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  const loadMoreImage = useCallback(async () => {
    if (images.length > 0) {
      currentPage.current++;
      const data = await loadImage({
        query: currentQuery.current,
        page: currentPage.current
      });

      setImages([...images, ...data.results]);
    }
  }, [images, loadImage, targetRef, loading]);

  const downloadImage = useCallback(async () => {
    try {
      //alert('downloadImage');

      setLoading(true);
      //const blob = await downloadPhoto(photo.urls.regular);
      const blob = await UnsplashAPI.getImage(
        photo.urls.regular,
        photo.alt_description
      );
      setPhoto(blob);
      setSelected(photo.id);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setError, setPhoto, photo, loading]);

  useEffect(() => {
    const _onIntersect = ([entry]) => {
      if (
        !loading &&
        entry.isIntersecting &&
        currentPage.current < totalPage.current
      ) {
        if (currentQuery.current !== '') {
          loadMoreImage();
        } else {
          loadRandomImage();
        }
      }
    };
    let observer;
    if (targetRef.current) {
      observer = new IntersectionObserver(_onIntersect, { threshold: 1 });
      observer.observe(targetRef.current);
    }
    return () => observer && observer.disconnect();
  }, [targetRef, targetRef.current, images, loading]);

  // useIntersectionObserver({
  //   root: rootRef.current,
  //   target: targetRef.current,
  //   onIntersect: ([{ isIntersecting }]) => {
  //     console.log('isIntersecting', isIntersecting);
  //     if (
  //       isIntersecting &&
  //       !!currentQuery.current &&
  //       currentPage.current < totalPage.current
  //     ) {
  //       loadMoreImage();
  //     }
  //   }
  // });

  const handleSelect = (photo, isUnsplash: boolean, url: string) => {
    if (isUnsplash) {
      setPhoto(photo);
      setSelected(photo.id);
      dispatch(
        setSelectedBackgroundUrl({
          url: photo.urls.regular,
          isUnsplash: true,
          id: photo.id
        })
      );
    } else {
      dispatch(
        setSelectedBackgroundUrl({
          url: url,
          isUnsplash: false,
          id: url
        })
      );
    }
  };

  //upload 서버
  const uploadSelectedImage = async () => {
    try {
      if (photo) {
        const params = {
          url: photo.urls.regular,
          id: photo.id,
          backgroundImagePath: ''
        };
        dispatch(uploadImageThunk(params));
      } else {
        lnfoToast('사진을 선택해주세요!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <St.Wrapper>
      <StyledTab
        tabContentFirst={<FileUploadForm handleSelect={handleSelect} />}
        tabContentSecond={
          <>
            <SearchForm
              onSearch={searchImage}
              onRandom={loadRandomImage}
              downloadImage={downloadImage}
              uploadSelectedImage={uploadSelectedImage}
            />
            <div ref={rootRef}>
              <ThumbnailList
                onClick={handleSelect}
                selected={selected}
                thumbnails={images}
              />
              {loading && (
                <St.LoadingWrapper>
                  <Loading />
                </St.LoadingWrapper>
              )}
              <div ref={targetRef} />
            </div>
          </>
        }
      />
    </St.Wrapper>
  );
};

export default UnsplashContainer;
