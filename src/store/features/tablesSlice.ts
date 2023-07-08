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
        title: "Users",
        items: [
          { id: 1, title: "Viktor" },
          { id: 2, title: "Valera" },
          { id: 3, title: "Sveta" },
        ],
      },
      {
        id: 2,
        title: "Mentors",
        items: [
          { id: 4, title: "Mark" },
          { id: 5, title: "Elon" },
          { id: 6, title: "Dimych" },
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