import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
export type Item = {
  id: number;
  title: string;
}

type List = {
  id: number;
  title: string;
  items: Item[];
}

type InitialState = {
  lists: List[];
}

// Define the initial state using that type
const initialState: InitialState = {
  lists: [
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
    {
      id: 3,
      title: "done",
      items: [
        { id: 7, title: "saga" },
        { id: 8, title: "node js" },
        { id: 9, title: "work" },
      ],
    },
  ],
};

export const listsSlice = createSlice({
  name: 'list',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      
    },
    decrement: (state) => {
      
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
       
    },
  },
})

export const { increment, decrement, incrementByAmount } = listsSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default listsSlice.reducer