import { Fade, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Tag from 'components/Tag/Tag';
import React, { memo } from 'react';

interface Props {
  text?: string;
  status?: string[];
}

const useStyles = makeStyles(() => ({
  tooltipWrapper: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: '#F5FAFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    marginLeft: '4px',
  },
  tooltipTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff !important',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    maxWidth: '400px !important',
  },
}));

function TooltipMoreStatus({ text, status }: Props) {
  const classes = useStyles();
  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltipTitle,
      }}
      placement="bottom-end"
      title={
        <React.Fragment>
          {status?.map(
            (s, index) =>
              index > 0 && (
                <Box py="4px" key={index.toString()}>
                  <Tag text={s} variant={index % 2 === 0 ? 'success' : 'error'} />
                </Box>
              ),
          )}
        </React.Fragment>
      }
      TransitionComponent={Fade}>
      <Box className={classes.tooltipWrapper}>+{text}</Box>
    </Tooltip>
  );
}

export default memo(TooltipMoreStatus);
