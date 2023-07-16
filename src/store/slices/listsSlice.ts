import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

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

let listId = 4
let listItemId = 4

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
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{title: string}>) => {
      const newList = {
        id: listId++, 
        title: action.payload.title,
        items: []
      }
      state.lists.push(newList)
    },
    /* addListItem: (state, action: PayloadAction<{title: string, listId: number}>) => {
      console.log(action.payload.title);
      return state.lists.map(el => {
        if (el.id === listId) {
          let newItem = {
            id: 10000,
            title: action.payload.title
          }
          el.items.push(newItem)
        }
      })
      
    }, */
    addListItem: (state, action: PayloadAction<{title: string, listId: number}>) => {
      const { title, listId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const newItem = { id: listItemId++, title };
        list.items.push(newItem);
      }
    },

  },
})

export const { addList, addListItem } = listsSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default listsSlice.reducer