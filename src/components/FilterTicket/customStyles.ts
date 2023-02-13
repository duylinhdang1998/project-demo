import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
  control: provided => {
    return {
      ...provided,
      height: '40px',
      border: '1px solid #f7f7f7',
      fontSize: '14px',
    };
  },
  singleValue: provided => {
    const color = '#333';
    return {
      ...provided,
      color,
      fontSize: '14px',
      fontFamily: 'Google sans',
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      color: state.isSelected ? '#fff' : '#333',
      fontSize: '14px',
    };
  },
  indicatorSeparator: () => {
    return {
      display: 'none',
    };
  },
  menu: provided => {
    return {
      ...provided,
      zIndex: 9,
    };
  },
};
