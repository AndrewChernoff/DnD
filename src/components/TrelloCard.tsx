import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Draggable } from 'react-beautiful-dnd';

export interface IAppProps {
    title: string
    id: string
    index: number
}

export function TrelloCard ({title, id, index}: IAppProps) {
  return (
    <Draggable draggableId={id.toString()} index={index}>
    {(provided) => {
      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Typography gutterBottom>{title}</Typography>
          </Card>
        </div>
      );
    }}
  </Draggable>

  );
}
