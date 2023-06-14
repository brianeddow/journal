import React from 'react';

function Input(props) {
  return (
    <div>
      {(props.type) ? '' : <span>{props.name}</span> }
      <input 
        type={props.type || 'text'}
        name={props.name} 
        placeholder={props.name}
        className={props.css}
        value={props.value}
        {...props.required}
      />
    </div>
  );
}

export default Input;