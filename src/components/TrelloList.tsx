import { TrelloCard } from './TrelloCard';
import { Item, addListItem } from '../store/slices/listsSlice';
import { TrelloActionButton } from './TrelloActionButton';
import { useAppDispatch } from '../hooks/redux_hooks';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export interface ITrelloListProps {
  title: string
  id: string
  items: Item[]
  index: number
}

export function TrelloList({ title, id, items, index }: ITrelloListProps) {
  const dispatch = useAppDispatch();

  const onAddListItemHandler = (title: string) => {
    dispatch(addListItem({ title, listId: id }));
  };

  return (

    <Draggable draggableId={id.toString()} index={index}>
      {provided => (
        <div
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
      >
        <Droppable droppableId={id.toString()}>

        {(provided) => (
          <div style={{ ...style.container }}
          {...provided.droppableProps} ref={provided.innerRef}>
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
      </div>
      )}
    </Draggable>
 

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
