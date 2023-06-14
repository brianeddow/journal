import React from 'react';
import Input from './Input.js';
import Button from './Button.js';
import Form from './Form.js'

function Register(props) {
  return (
    <div>
      <h1>Register</h1>
      <Form action="/register">
        <Input name="name" type="text" />
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <Button name="Submit" />
      </Form>
      <Button name="Login" />
    </div>
  )
}

export default Register;