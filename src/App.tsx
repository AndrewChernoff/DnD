import React, { useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/store';
import { setBoards, setCurrentBoard, setCurrentItem } from './store/features/tablesSlice';

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
  
  /* const [boards, setBoards] = useState([
    {id: 1, title: "do", items:[{id: 1, title: "go to a store"}, {id: 2, title: "buy milk"}, {id: 3, title: "eat"}]},
    {id: 2, title: "check", items:[{id: 4, title: "code review"}, {id: 5, title: "tasks"}, {id: 6, title: "codewars"}]},
  ]) */

  
  /* const [currentBoard, setCurrentBoard] = useState<Board | null>(null)
  const [currentItem, setCurrentItem] = useState<Item | null>(null) */



  function dragOverHandler(e: any): void {
    e.preventDefault()
    console.log('over');
    if(e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }

  function dragLeaveHandler(e: any): void {
    e.preventDefault()
    console.log('leave');
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Item): void {
    console.log('start');
    dispatch(setCurrentBoard(board))
    dispatch(setCurrentItem(item))
  }

  function dragEndHandler(e: any): void {
    e.preventDefault()
    console.log('end');
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Item): void {
    /* e.stopPropagation()
    console.log('drop');
    if (!currentBoard || !currentItem) {
      return;
    }
    const currentIndex = currentBoard.items.indexOf(currentItem)

    ///currentBoard.items.splice(currentIndex, 1)
    setCurrentBoard(currentBoard.items.splice(currentIndex, 1))

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    dispatch(setBoards(boards.map(b => {
      if(b.id === board.id) {
        return board
      }
      if(b.id === currentBoard.id) {
          return currentBoard
      }
      return b 
    }))) */

    console.log('drop');
  if (!currentBoard || !currentItem) {
    return;
  }

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
    /* if (!currentBoard || !currentItem) {
      return;
    }
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)

    currentBoard.items.splice(currentIndex, 1)

    dispatch(setBoards(boards.map(b => {
      if(b.id === board.id) {
        return board
      }
      if(b.id === currentBoard.id) {
          return currentBoard
      }
      return b 
    }))) */
  }

  return (
    <div className="app">
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
    </div>
  );
}

export default App;

