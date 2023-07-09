import React, { useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/store';
import { setBoards, setCurrentBoard, setCurrentItem } from './store/features/tablesSlice';
import Container from '@mui/material/Container/Container';

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

  const boards = useAppSelector(store => store.tables.boards)
  const currentBoard = useAppSelector(store => store.tables.currentBoard)
  const currentItem = useAppSelector(store => store.tables.currentItem)
  const dispatch = useAppDispatch()

  function check(id: number) {
   return currentBoard.items.some((el: any) => el.id === id)
  }

  function dragOverHandler(e: any): void {
    e.preventDefault()
    console.log('over');
    if(e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }

  function dragLeaveHandler(e: any): void {
    e.preventDefault()
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Item): void {
    dispatch(setCurrentBoard(board))
    dispatch(setCurrentItem(item))
  }

  function dragEndHandler(e: any): void {
    e.preventDefault()
    e.target.style.boxShadow = 'none'
    /* if (currentBoard && currentItem) {
      check(currentItem.id)
    } */
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Item): void {
  if (!currentBoard || !currentItem) {
    return;
  }

  console.log(currentBoard);
  console.log(currentItem);
  console.log(check(currentItem.id))

  const currentIndex = currentBoard.items.indexOf(currentItem);
  const updatedCurrentBoard = {
    ...currentBoard,
    items: [
      ...currentBoard.items.slice(0, currentIndex),
      ...currentBoard.items.slice(currentIndex + 1),
    ],
  };

  const dropIndex = board.items.indexOf(item);
  const updatedBoard = {
    ...board,
    items: [
      ...board.items.slice(0, dropIndex + 1),
      currentItem,
      ...board.items.slice(dropIndex + 1),
    ],
  };
  /////is we have item in currentboard ....
  dispatch(setBoards(boards.map((b) => {
    if (b.id === board.id) {
      return updatedBoard;
    }
    if (b.id === updatedCurrentBoard.id) {
      return updatedCurrentBoard;
    }
    return b;
  })));

  dispatch(setCurrentBoard(updatedCurrentBoard));
  }

  function dropCardHandler(e: any, board: Board) {
    if (!currentBoard || !currentItem) {
      return;
    }
  
    const updatedBoardItems = [...board.items, currentItem];
    const currentIndex = currentBoard.items.indexOf(currentItem);
    const updatedCurrentBoardItems = [
      ...currentBoard.items.slice(0, currentIndex),
      ...currentBoard.items.slice(currentIndex + 1),
    ];
  
    dispatch(
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return { ...board, items: updatedBoardItems };
          }
          if (b.id === currentBoard.id) {
            return { ...currentBoard, items: updatedCurrentBoardItems };
          }
          return b;
        })
      )
    );
  }

  return (
    <div className="app">
      <Container maxWidth="sm">

      {boards.map(board => (
        <div className='board' key={board.id + board.title}
        onDragOver={(e:React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
        onDrop={(e:any) => dropCardHandler(e, board)}

        >
          <div className='board__title'>{board.title}</div>
          {board.items.map(item => (
            <div className="item"
            onDragOver={(e:React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
            onDragLeave={(e:React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
            onDragStart={(e:React.DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
            onDragEnd={(e:React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
            draggable={true} key={item.id}
            >{item.title}</div>
          ))}
        </div>
      ))}
      </Container>

    </div>
  );
}

export default App;

