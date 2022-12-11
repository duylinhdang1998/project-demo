import { Box, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { memo, useCallback } from 'react';

interface TextWithLinkProps {
  text: string;
  highlight: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '14px !important',
    fontWeight: 400,
    textAlign: 'center',
  },
  highlight: {
    color: theme.palette.primary.main + '!important',
    fontWeight: 'bold',
    fontSize: 14,
    cursor: 'pointer',
  },
}));

function TextWithLink({ text, highlight, onClick }: TextWithLinkProps) {
  const classes = useStyles();
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography component="span" className={classes.root}>
        {text}{' '}
        <span className={classes.highlight} onClick={handleClick}>
          {highlight}
        </span>
      </Typography>
    </Box>
  );
}

export default memo(TextWithLink);
