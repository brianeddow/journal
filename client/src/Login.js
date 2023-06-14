import React from 'react';
import Input from './Input.js';
import Button from './Button.js';
import Form from './Form.js'

function Login(props) {
  return (
    <div>
      <h1>Login</h1>
      <Form action="/login">
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <Button name="Submit" />
      </Form>
      <Button name="Register"/>
    </div>
  )
}

export default Login;