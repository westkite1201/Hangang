import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TODO_REQUEST,
  EDIT_TODO_REQUEST,
} from '../../modules/todos/reducer';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TodoModalContainer({ todoModalView, handleClose }) {
  const classes = useStyles();
  const { todosArr, isEdit, editTodoItemIndex } = useSelector(
    (state) => state.todos,
  );
  const [title, setTitle] = useState('');
  const [descTodo, setDescTodo] = useState('');
  const [isDone, setIsDone] = useState(false);

  const dispatch = useDispatch();

  const handleIsDone = (event) => {
    setIsDone(event.target.checked);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescTodo = (e) => {
    setDescTodo(e.target.value);
  };

  useEffect(() => {
    console.log('editTodoItemIndex ', editTodoItemIndex);
    setTitle(isEdit ? todosArr.data[editTodoItemIndex - 1].title : '');
    setDescTodo(isEdit ? todosArr.data[editTodoItemIndex - 1].descTodo : '');
    setIsDone(isEdit ? todosArr.data[editTodoItemIndex - 1].isDone : '');
  }, [isEdit, editTodoItemIndex]);

  const addTodo = () => {
    console.log(title, descTodo);
    dispatch({
      type: ADD_TODO_REQUEST,
      payload: {
        todoIndex: 1,
        title: title,
        descTodo: descTodo,
        isDone: isDone,
      },
    });
  };

  const editTodo = () => {
    dispatch({
      type: EDIT_TODO_REQUEST,
      payload: {
        todoIndex: 1,
        title: title,
        descTodo: descTodo,
        isDone: isDone,
        todoItemIndex: editTodoItemIndex,
      },
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={todoModalView}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={todoModalView}>
          <div className={classes.paper}>
            <div>
              <input onChange={handleTitle} value={title} />
            </div>
            <hr />
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={10}
                defaultValue={descTodo}
                onChange={handleDescTodo}
                variant="outlined"
              />
            </div>
            <div>
              isDone
              <Checkbox
                checked={isDone}
                onChange={handleIsDone}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
            <div>
              <button onClick={isEdit ? editTodo : addTodo}>
                {isEdit ? '수정' : '저장'}
              </button>
              <button onClick={handleClose}>취소</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
