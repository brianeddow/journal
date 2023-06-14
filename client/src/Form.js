import React from 'react';

function Form(props) {
  return (
    <div>
      <form action={props.action} method="POST">
        {props.children}
      </form>
    </div>
  );
}

export default Form;