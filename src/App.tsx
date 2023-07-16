import React, { useState } from 'react';
import './App.css';
import { TrelloList } from './components/TrelloList';
import { useAppDispatch, useAppSelector } from './hooks/redux_hooks';
import { TrelloActionButton } from './components/TrelloActionButton';
import { addList, sort } from './store/slices/listsSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

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
      gap: '15px',
      alignItems: 'start',
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {destination, source, draggableId} = result
  
    if(!destination) {
      return
    }

    dispatch(sort({droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
       draggableId: draggableId}))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div style={style.container} className="app">
      {lists.map(el => {
       return <TrelloList key={el.id} title={el.title} id={el.id} items={el.items}/>  
      })}
      
      <TrelloActionButton list={true} onAddList={onAddListHandler}/>
    </div>
    </DragDropContext>
  );
}

export default App;

