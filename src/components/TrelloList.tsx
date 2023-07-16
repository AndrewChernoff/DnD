import { TrelloCard } from './TrelloCard';
import { Item, addListItem } from '../store/slices/listsSlice';
import { TrelloActionButton } from './TrelloActionButton';
import { useAppDispatch } from '../hooks/redux_hooks';
import { Droppable } from 'react-beautiful-dnd';

export interface ITrelloListProps {
  title: string
  id: string
  items: Item[]
}

export function TrelloList({ title, id, items }: ITrelloListProps) {
  const dispatch = useAppDispatch();

  const onAddListItemHandler = (title: string) => {
    dispatch(addListItem({ title, listId: id }));
  };

  return (
    <Droppable droppableId={id.toString()}>
      {(provided, snapshot) => (
        <div
          style={{ ...style.container, backgroundColor: snapshot.isDraggingOver ? 'skyblue' : '#ccc' }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{title}</h2>
          {items.map((el, index) => {
            return (
              <h3 key={el.id}>
                <TrelloCard title={el.title} index={index} id={el.id} />
              </h3>
            );
          })}
          <TrelloActionButton /*listId={listId} */ list={false} onAddItem={onAddListItemHandler} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
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
