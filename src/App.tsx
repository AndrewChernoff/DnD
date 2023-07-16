import React, { useState } from 'react';
import './App.css';
import { TrelloList } from './components/TrelloList';
import { useAppDispatch, useAppSelector } from './hooks/redux_hooks';
import { TrelloActionButton } from './components/TrelloActionButton';
import { addList, sort } from './store/slices/listsSlice';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

type Item = {
  id: number;
  title: string;
};

type Board = {
  id: number;
  title: string;
  items: Item[];
};

function App() {
  
  const lists = useAppSelector(state => state.lists.lists)
  const dispatch = useAppDispatch()

  const onAddListHandler = (title: string) => {
    dispatch(addList({title}))
  }
  
  const style = {
    container: {
      display: 'flex',
      /* gap: '15px', */
      justifyContent: 'space-around',
      alignItems: 'start',
      
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId, type} = result
  
    if(!destination) {
      return
    }

    dispatch(sort({droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
       draggableId: draggableId, type: type}))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-list' direction='horizontal' type='list'>
        {provided => (
                <div style={style.container} {...provided.droppableProps} ref={provided.innerRef}>
                {lists.map((el, index) => {
                return <TrelloList key={el.id} title={el.title} id={el.id} items={el.items} index={index}/>  
                })}
                
                <TrelloActionButton list={true} onAddList={onAddListHandler}/>
              </div>
        )}
      </Droppable>


    </DragDropContext>
  );
}

export default App;

