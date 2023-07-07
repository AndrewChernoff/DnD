import React, { useState } from 'react';
import './App.css';

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
  
  const [boards, setBoards] = useState([
    {id: 1, title: "do", items:[{id: 1, title: "go to a store"}, {id: 2, title: "buy milk"}, {id: 3, title: "eat"}]},
    {id: 2, title: "check", items:[{id: 4, title: "code review"}, {id: 5, title: "tasks"}, {id: 6, title: "codewars"}]},
    {id: 3, title: "done", items:[{id: 7, title: "saga"}, {id: 8, title: "node js"}, {id: 9, title: "work"}]},
  ])

  
  const [currentBoard, setCurrentBoard] = useState<any>(null)
  const [currentItem, setCurrentItem] = useState<any>(null)



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
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e: any): void {
    e.preventDefault()
    console.log('end');
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Item): void {
    e.stopPropagation()
    console.log('drop');
    const currentIndex = currentBoard.items.indexOf(currentItem)

    currentBoard.items.splice(currentIndex, 1)

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if(b.id === board.id) {
        return board
      }
      if(b.id === currentBoard.id) {
          return currentBoard
      }
      return b 
    }))
  }

  function dropCardHandler(e: any, board: Board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)

    currentBoard.items.splice(currentIndex, 1)

    setBoards(boards.map(b => {
      if(b.id === board.id) {
        return board
      }
      if(b.id === currentBoard.id) {
          return currentBoard
      }
      return b 
    }))
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

