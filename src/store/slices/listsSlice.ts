import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { nanoid } from '@reduxjs/toolkit'


export type Item = {
  id: string;
  title: string;
}

type List = {
  id: string;
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
      id: nanoid(),
      title: "do",
      items: [
        { id: nanoid(), title: "go to a store" },
        { id: nanoid(), title: "buy milk" },
        { id: nanoid(), title: "eat" },
      ],
    },
    {
      id: nanoid(),
      title: "check",
      items: [
        { id: nanoid(), title: "code review" },
        { id: nanoid(), title: "tasks" },
        { id: nanoid(), title: "codewars" },
      ],
    },
    {
      id: nanoid(),
      title: "done",
      items: [
        { id: nanoid(), title: "saga" },
        { id: nanoid(), title: "node js" },
        { id: nanoid(), title: "work" },
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
        id: nanoid(), 
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
    addListItem: (state, action: PayloadAction<{title: string, listId: string}>) => {
      const { title, listId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const newItem = { id: nanoid(), title };
        list.items.push(newItem);
      }
    },
    sort: (state, action: PayloadAction<{droppableIdStart: string, droppableIdEnd: any/* string */, droppableIndexStart: number, droppableIndexEnd: number, draggableId: string}>) => {
      
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
      } = action.payload;
    

      /* if(droppableIdStart === droppableIdEnd) {
        const list = state.lists.find(list => droppableIdStart === list.id)
        
        if(list) {
          const card = list.items.splice(droppableIndexStart, 1)
          list.items.splice(droppableIdEnd, 0, ...card)
        }
      } */
      if (droppableIdStart === droppableIdEnd) {
        const list = state.lists.find((list) => list.id === droppableIdStart);
    
        if (list) {
          const item = list.items.splice(droppableIndexStart, 1)[0];
          list.items.splice(droppableIndexEnd, 0, item);
        }
      }
    
    }

  },
})

export const { addList, addListItem, sort } = listsSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default listsSlice.reducer