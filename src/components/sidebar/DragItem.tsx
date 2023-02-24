import { Icon } from '@iconify/react';
import { Box, Stack, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import dragIcon from '@iconify/icons-mdi/drag';

interface DragItemProps {
  type: string;
  label: string;
  value: any;
}
const DragItem: React.FC<DragItemProps> = ({ type, label, value }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      data: value,
      type,
    },
    type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Stack
      ref={drag}
      sx={{
        background: isDragging ? 'green' : 'none',
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        '&:hover': {
          background: isDragging ? 'green' : '#959595',
        },
        py: 1,
        borderRadius: 2,
      }}
      direction="row"
      spacing={2}
    >
      <Icon icon={dragIcon} />
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default DragItem;
