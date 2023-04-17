import { DialogTitle as MUIDialogTitle, DialogTitleProps as MUIDialogTitleProps } from '@mui/material';

export type DialogTitleProps = MUIDialogTitleProps;

export const DialogTitle = ({ sx, ...props }: DialogTitleProps) => {
  return <MUIDialogTitle {...props} sx={{ padding: '0 !important', fontSize: '18px', color: 'rgba(12, 17, 50, 1)', fontWeight: 700, ...sx }} />;
};
