import React from 'react';

interface CheckCircleProps {
  success?: boolean;
}
export default function CheckCircle({ success }: CheckCircleProps) {
  return success ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="10" fill="#33CC7F" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.8047 6.19526C16.0651 6.45561 16.0651 6.87772 15.8047 7.13807L8.4714 14.4714C8.21106 14.7318 7.78894 14.7318 7.5286 14.4714L4.19526 11.1381C3.93491 10.8777 3.93491 10.4556 4.19526 10.1953C4.45561 9.93491 4.87772 9.93491 5.13807 10.1953L8 13.0572L14.8619 6.19526C15.1223 5.93491 15.5444 5.93491 15.8047 6.19526Z"
        fill="white"
      />
    </svg>
  ) : (
    <>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.8047 7.19526C17.0651 7.45561 17.0651 7.87772 16.8047 8.13807L9.4714 15.4714C9.21106 15.7318 8.78894 15.7318 8.5286 15.4714L5.19526 12.1381C4.93491 11.8777 4.93491 11.4556 5.19526 11.1953C5.45561 10.9349 5.87772 10.9349 6.13807 11.1953L9 14.0572L15.8619 7.19526C16.1223 6.93491 16.5444 6.93491 16.8047 7.19526Z"
          fill="#B2BABE"
        />
        <rect x="1" y="1" width="20" height="20" rx="10" stroke="#B2BABE" stroke-width="1.5" />
      </svg>
    </>
  );
}
