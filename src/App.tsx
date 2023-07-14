import React, { useState } from 'react';
import './App.css';
import { TrelloList } from './components/TrelloList';
import { useAppSelector } from './hooks/redux_hooks';
import { TrelloActionButton } from './components/TrelloActionButton';

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

  const style = {
    container: {
      display: 'flex',
      gap: '15px',
      alignItems: 'start'
    }
  }

  return (
    <div style={style.container} className="app">
      {lists.map(el => {
       return <TrelloList title={el.title} id={el.id} items={el.items}/>  
      })}
      
      <TrelloActionButton list={true}/>
    </div>
  );
}

export default App;

