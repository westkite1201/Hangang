import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {
  TODO_MODAL_OPEN,
  DELETE_TODO_REQUEST
} from '../../modules/todos/reducer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function TodoItem({ todo }) {
  const [expand, setExpand] = useState(true);

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch({
      type: TODO_MODAL_OPEN,
      payload: {
        todoItemIndex: todo.todoItemIndex,
        isEdit: true
      }
    });
  };
  const handleDelete = () => {
    dispatch({
      type: DELETE_TODO_REQUEST,
      payload: {
        todoItemIndex: todo.todoItemIndex,
        todoIndex: 1
      }
    });
  };
  const ExpansionPanel = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0
      },
      '&:before': {
        display: 'none'
      },
      '&$expanded': {
        margin: 'auto'
      }
    },
    expanded: {}
  })(MuiExpansionPanel);
  // const onToggle = useCallback(() => dispatch(toggleTodo(id)), [dispatch, id]);
  // const onRemove = useCallback(() => dispatch(removeTodo(id)), [dispatch, id]);
  return (
    <TodoItemDiv>
      <div className={`todo todoItem${todo.isDone ? ' done' : ''}`}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <span className="text">{todo.title}</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>{todo.descTodo}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>

      <div>
        <Button onClick={handleEdit}>수정</Button>
        <Button>{todo.isDone ? 'done' : 'not '}</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </div>
    </TodoItemDiv>
  );
}
const Button = styled.div`
  background: grey;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
  color: white;
  padding: 0.2rem;
`;
const TodoItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
  .todo {
    width: 90%;
    box-shadow: none !important;
  }
  .todoitem {
    width: 90%;
    .done {
    }
    .text {
    }
    .remove {
    }
  }
`;
export default TodoItem;
