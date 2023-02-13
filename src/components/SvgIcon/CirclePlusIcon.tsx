import { SvgIcon } from '@mui/material';
import { memo } from 'react';

function CirclePlusIcon() {
  return (
    <SvgIcon>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99998 2.50065C5.85784 2.50065 2.49998 5.85851 2.49998 10.0007C2.49998 14.1428 5.85784 17.5006 9.99998 17.5006C14.1421 17.5006 17.5 14.1428 17.5 10.0007C17.5 5.85851 14.1421 2.50065 9.99998 2.50065ZM0.833313 10.0007C0.833313 4.93804 4.93737 0.833984 9.99998 0.833984C15.0626 0.833984 19.1666 4.93804 19.1666 10.0007C19.1666 15.0633 15.0626 19.1673 9.99998 19.1673C4.93737 19.1673 0.833313 15.0633 0.833313 10.0007Z"
        fill="#858C93"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5.83398C10.4603 5.83398 10.8334 6.20708 10.8334 6.66732V13.334C10.8334 13.7942 10.4603 14.1673 10 14.1673C9.53978 14.1673 9.16669 13.7942 9.16669 13.334V6.66732C9.16669 6.20708 9.53978 5.83398 10 5.83398Z"
        fill="#858C93"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.83331 9.99935C5.83331 9.53911 6.20641 9.16602 6.66665 9.16602H13.3333C13.7936 9.16602 14.1666 9.53911 14.1666 9.99935C14.1666 10.4596 13.7936 10.8327 13.3333 10.8327H6.66665C6.20641 10.8327 5.83331 10.4596 5.83331 9.99935Z"
        fill="#858C93"
      />
    </SvgIcon>
  );
}

export default memo(CirclePlusIcon);
