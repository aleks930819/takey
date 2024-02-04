import React from 'react';

import style from './radio-input.module.css';

interface RadioInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const RadioInput = ({ ...props }: RadioInputProps) => {
  return (
    <label className={style.customRadio} htmlFor={props.id}>
      {props.label}
      <input type="radio" {...props} />
      <span className={style.checkmark}></span>
    </label>
  );
};

export default RadioInput;
