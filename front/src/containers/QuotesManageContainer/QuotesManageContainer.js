import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUOTES_REQUEST } from '../../modules/quotes/reducer';
const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: 8px;
  background-color: lightblue;
  padding: 8px;
`;

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.word}
        </QuoteItem>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index) => {
    return <Quote quote={quote} index={index} key={quote._id} />;
  });
});

function addId(quotes) {
  return quotes.reduce((acc, curr) => {
    acc.push({ ...curr, id: curr._id });
    return acc;
  }, []);
}
function QuotesManageContainer() {
  const [state, setState] = useState({ quotes: initial });
  const { quotesData } = useSelector((state) => state.quotes);

  console.log('state', state);
  const dispatch = useDispatch();

  useEffect(() => {
    function dispatchQuotes() {
      dispatch({
        //전부다 받아오기
        type: GET_QUOTES_REQUEST,
        payload: { accepted: '0' }
      });
    }
    dispatchQuotes();
  }, [dispatch]);
  useEffect(() => {
    if (quotesData.data && quotesData.data.length !== 0) {
      setState({ quotes: addId(quotesData.data) });
    }
  }, [quotesData.data]);
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );
    console.log('quotes ', quotes);
    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default QuotesManageContainer;
