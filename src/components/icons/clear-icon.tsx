import React from 'react';

type ClearIconProperties = {
  onClick: () => void;
  style: React.CSSProperties;
};

export const ClearIcon: React.FC<ClearIconProperties> = ({
  onClick,
  style
}) => (
  <svg
    onClick={onClick}
    style={style}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <svg
      onClick={onClick}
      style={style}
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="grey"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.95 13.94l-1.41 1.41L12 13.42l-3.54 3.54-1.41-1.41L10.59 12 7.05 8.46l1.41-1.41L12 10.59l3.54-3.54 1.41 1.41L13.41 12l3.54 3.54z"
      />
    </svg>
  </svg>
);
