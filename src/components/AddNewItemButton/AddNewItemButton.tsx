import AddIcon from '@mui/icons-material/Add';
import { ReactNode } from 'react';
import Button from 'components/Button/Button';
import { useStyles } from './styles';

export interface AddNewItemButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export const AddNewItemButton = ({ onClick, children }: AddNewItemButtonProps) => {
  const classes = useStyles();
  return (
    <Button backgroundButton="#1aa6ee" startIcon={<AddIcon />} className={classes.btnAdd} onClick={onClick}>
      {children}
    </Button>
  );
};