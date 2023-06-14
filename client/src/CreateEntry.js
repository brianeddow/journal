import React from 'react';
import Input from './Input.js';
import TextArea from './TextArea.js';
import Button from './Button.js';
import Form from './Form.js'
import { useLocation } from 'react-router-dom';

function CreateEntry() {

  const location = useLocation();
  const { id } = location.state;

  return (
    <Form action="/submitEntry">
      <Input name="id" css="entryInput" value={id} type="hidden" />
      <Input name="title" css="entryInput" required="required" />
      <Input name="subject" css="entryInput" required="required" />
      <Input name="keywords" css="entryInput" required="required" />
      <Input name="mood" css="entryInput" required="required" />
      <TextArea name="entry" css="entryInput" required="required" />
      <Button name="Submit" />
    </Form>
  );
}

export default CreateEntry;