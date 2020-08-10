import produce from 'immer';

export const initialState = {
  fontSize: 80,
  fontFamily: '',
  quotesText: '',
  quotesAuthor: ''
};

export const SET_FONT_SIZE = 'editer/SET_FONT_SIZE';
export const SET_FONT_FAMILY = 'editer/SET_FONT_FAMLIY';
export const SET_CARD_TYPE = 'editer/SET_CARD_TYPE';
export const SET_CARD_HEIGHT = 'editer/SET_CARD_HEIGHT';
export const SET_CARD_WIDTH = 'editer/SET_CARD_WIDTH';
export const SET_QUOTES_TEXT = 'editer/SET_QUOTES_TEXT';
export const SET_QUOTES_AUTHOR = 'editer/SET_QUOTES_AUTHOR';

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_FONT_SIZE: {
        draft.fontSize = action.payload;
        break;
      }
      case SET_FONT_FAMILY: {
        draft.fontFamily = action.payload;
        break;
      }

      case SET_CARD_TYPE: {
        draft.quotesText = action.payload;
        break;
      }
      case SET_CARD_WIDTH: {
        draft.cardWidth = action.payload;
        break;
      }
      case SET_CARD_HEIGHT: {
        draft.cardHeight = action.payload;
        break;
      }
      case SET_QUOTES_TEXT: {
        draft.quotesText = action.payload;
        break;
      }

      case SET_QUOTES_AUTHOR: {
        draft.quotesAuthor = action.payload;
        break;
      }

      default: {
        break;
      }
    }
  });
};
