import React from 'react';

function TextArea(props) {
  return (
    <div>
      <span>{props.name}</span>
      <textarea 
        type="text"
        name={props.name} 
        placeholder={props.name}
        className={props.css}
        style={{width: "500px", height: "500px"}}
      ></textarea>
    </div>
  );
}

export default TextArea;