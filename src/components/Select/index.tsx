import React from 'react';
import { FiX } from 'react-icons/fi';
import { FADED_BLACK, WHITE } from 'src/constants/colors';
import MenuItem from '@mui/material/MenuItem';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type SelectProps = {
  placeholder: string;
  value: string;
  options: LabelValueProps[];
  onChange: (value: string) => void;
  sx?: SxProps;
  selectBoxStyle?: SxProps;
};

export const Select: React.FC<SelectProps> = ({
  value,
  placeholder,
  options,
  onChange,
  sx,
  selectBoxStyle,
}) => {
  function onChangeHandler(e: SelectChangeEvent) {
    onChange(e.target.value);
  }

  function clearSelectHandler() {
    onChange('');
  }

  function renderValue() {
    if (value !== '') return options.find((op) => op.value === value)?.label;
    else
      return (
        <Typography
          sx={{
            color: FADED_BLACK,
            fontSize: '16px',
            fontWeight: 400,
            ...sx,
          }}
        >
          {placeholder}
        </Typography>
      );
  }

  return (
    <MUISelect
      sx={{
        marginRight: '15px',
        width: '186px',
        height: '40px',
        background: WHITE,
        ...selectBoxStyle,
      }}
      displayEmpty
      value={value}
      onChange={onChangeHandler}
      endAdornment={
        value ? (
          <FiX
            style={{ marginRight: '15px', zIndex: 1 }}
            color={FADED_BLACK}
            cursor="pointer"
            onClick={clearSelectHandler}
            size={30}
          />
        ) : null
      }
      renderValue={renderValue}
    >
      {options.map((op) => (
        <MenuItem value={op.value} key={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </MUISelect>
  );
};

export default Select;
