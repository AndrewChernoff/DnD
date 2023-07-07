import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

interface Item {
    id: number;
    title: string;
  }
  
  interface Board {
    id: number;
    title: string;
    items: Item[];
  }
  
  interface InitialState {
    boards: Board[];
    currentBoard: /* Board[] */any | null;
    currentItem: /* Item[] */any | null;
  }
  
  const initialState: InitialState = {
    boards: [
      {
        id: 1,
        title: "do",
        items: [
          { id: 1, title: "go to a store" },
          { id: 2, title: "buy milk" },
          { id: 3, title: "eat" },
        ],
      },
      {
        id: 2,
        title: "check",
        items: [
          { id: 4, title: "code review" },
          { id: 5, title: "tasks" },
          { id: 6, title: "codewars" },
        ],
      },
    ],
    currentBoard: null,
    currentItem: null,
  };

export const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload
    },
    setCurrentBoard: (state, action: PayloadAction</* Board */any>) => {
        //state.currentBoard = action.payload
        state.currentBoard = action.payload
      },
    setCurrentItem: (state, action: PayloadAction</* Item */any>) => {
        //state.currentItem = action.payload
        state.currentItem = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setBoards, setCurrentBoard, setCurrentItem } = tablesSlice.actions

export default tablesSlice.reducer