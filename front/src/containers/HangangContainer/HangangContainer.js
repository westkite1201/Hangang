import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
//import {} from '../modules/hangang/reducer';

function HangangContainer() {
  // const { todosArr, todoModalView } = useSelector((state) => state.todos);
  // const dispatch = useDispatch();

  // const handleClose = () => {
  //   dispatch({
  //     type: TODO_MODAL_CLOSE,
  //     payload: {
  //       todoItemIndex: 0,
  //       isEdit: false
  //     }
  //   });
  // };

  return (
    <Fragment>
      <Div>HELLO 한강</Div>
    </Fragment>
  );
}

const ProgressBar = styled.div``;
const Div = styled.div``;
export default HangangContainer;
