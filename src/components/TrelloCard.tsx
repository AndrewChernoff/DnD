import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export interface IAppProps {
    title: string
    id: number
}

export function TrelloCard ({title}: IAppProps) {
  return (
    <Card>
          <Typography  gutterBottom>
          {title}
        </Typography>
    </Card>
  );
}
