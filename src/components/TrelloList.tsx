import { TrelloCard } from './TrelloCard';
import { Item, addListItem } from '../store/slices/listsSlice';
import { TrelloActionButton } from './TrelloActionButton';
import { useAppDispatch } from '../hooks/redux_hooks';

export interface ITrelloListProps {
  title: string
  id: number
  items: Item[]
}

export function TrelloList ({title, id, items}: ITrelloListProps) {

  const dispatch = useAppDispatch()

  const onAddListItemHandler = (title: string) => {
    dispatch(addListItem({title, listId:id}))
  }

  return (
    <div style={style.container}>
        <h2>{title}</h2>
        {items.map(el => {
          return <h3 key={el.id}><TrelloCard title={el.title} id={el.id}/></h3> 
        })}
        <TrelloActionButton list={false} onAddItem={onAddListItemHandler}/>
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
