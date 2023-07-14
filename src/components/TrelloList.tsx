import * as React from 'react';
import { TrelloCard } from './TrelloCard';
import { Item } from '../store/slices/listsSlice';
import { TrelloActionButton } from './TrelloActionButton';

export interface ITrelloListProps {
  title: string
  id: number
  items: Item[]
}

export function TrelloList ({title, id, items}: ITrelloListProps) {
  return (
    <div style={style.container}>
        <h2>{title}</h2>
        {items.map(el => {
          return <h3><TrelloCard title={el.title} id={el.id}/></h3> 
        })}
        <TrelloActionButton list={false}/>
      {/* <h3><TrelloCard title={'fsd'}/></h3> */}
    </div>
  );
}

const style = {
  container: {
    backgroundColor: '#ccc',
    borderRadius: 3,
    width: 300,
    height: '100%'
  }
}
