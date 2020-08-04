import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GET_HANGANG_TEMP_REQUEST } from '../../modules/hangang/reducer';

function HangangContainer() {
  //  const { todosArr, todoModalView } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const getTemp = () => {
    dispatch({
      type: GET_HANGANG_TEMP_REQUEST,
      payload: {}
    });
  };

  return (
    <Fragment>
      <button onClick={getTemp}>테스트 </button>
      <Div>HELLO 한강</Div>
    </Fragment>
  );
}

const ProgressBar = styled.div``;
const Div = styled.div``;
export default HangangContainer;
