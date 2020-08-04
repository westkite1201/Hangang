import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_TODOS_REQUEST,
  TODO_MODAL_OPEN,
  TODO_MODAL_CLOSE,
} from '../modules/todos/reducer';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TodoItem from '../components/Todo/TodoItem';
import TodoModalContainer from './TodoModalContainer';
import _ from 'lodash';
import moment from 'moment';
function TodoList() {
  const { todosArr, todoModalView } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const { data, loading, error } = todosArr;

  const handleAddTodo = () => {
    dispatch({
      type: TODO_MODAL_OPEN,
      payload: {
        todoItemIndex: 0,
        isEdit: false,
      },
    });
  };

  const handleClose = () => {
    dispatch({
      type: TODO_MODAL_CLOSE,
      payload: {
        todoItemIndex: 0,
        isEdit: false,
      },
    });
  };

  const getTodo = (todoNum) => {
    dispatch({
      type: GET_TODOS_REQUEST,
      payload: todoNum,
    });
  };

  useEffect(() => {
    getTodo(1);
  }, []);

  return (
    <Fragment>
      <Div>
        <div className="todo-list-wrapper">
          <div className="todo-list-container">
            <div className="todo-date-time">
              {moment().format('MM월 DD일 HH시 mm분')}
            </div>
            <hr />
            <div className="todo-list-content">
              {data &&
                data.map((todo) => (
                  <TodoItem todo={todo} key={todo.todoItemIndex} />
                ))}
            </div>

            <AddCircleOutlineIcon
              style={{ cursor: 'pointer' }}
              onClick={handleAddTodo}
            />
            <ProgressBar percent={30}>
              <div className="todo-today-progress-wrapper">
                <div className="todo-today-progress-inner"></div>
              </div>
            </ProgressBar>
          </div>
        </div>
      </Div>
      <TodoModalContainer
        todoModalView={todoModalView}
        handleClose={handleClose}
      />
    </Fragment>
  );
}

const ProgressBar = styled.div`
  .todo-today-progress {
    .todo-today-progress-inner {
      background-color: green;
      width: ${(props) => props.percent}%;
    }
  }
`;
const Div = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  .todo-list-wrapper {
    overflow: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 768px;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
    /* margin: 50px 50px 50px 50px; */
    margin-top: 30px;
    margin-bottom: 32px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .todo-list-container {
      border-radius: 4px;
      text-align: center;

      .todo-date-time {
        font-size: 2rem;
      }
      .todo-list-content {
      }
      .todo-today-progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
export default TodoList;
