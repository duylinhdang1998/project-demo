import { Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';

interface NumberCountProps {
  value?: number;
  onChangeValue?: (val: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    width: 24,
    height: 24,
    display: 'block',
    textAlign: 'center',
    fontSize: 14,
    color: theme.palette.primary.main,
    backgroundColor: '#E8F6FD',
    border: 'none',
    borderRadius: '50%',
  },
}));

export default function NumberCount({ value, onChangeValue }: NumberCountProps) {
  const [counter, setCounter] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    setCounter(value ?? 0);
  }, [value]);

  useEffect(() => {
    onChangeValue?.(counter);
  }, [counter]);

  const handleDecrease = () => {
    setCounter((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
  };

  const handleIncrease = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <button className={classes.btn} onClick={handleDecrease}>
        -
      </button>
      <Typography variant="body2">{counter}</Typography>
      <button className={classes.btn} onClick={handleIncrease}>
        +
      </button>
    </Stack>
  );
}
