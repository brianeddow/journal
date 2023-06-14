import Input from './Input.js';
import Button from './Button.js';
import Form from './Form.js'

import { BrowserRouter as Router, Routes } from 'react-router-dom';

function Dashboard(props) {
  return (
    <div>
      <h2>Welcome User</h2>
      <Button name="New Entry"></Button>
      <Button name="All Entries"></Button>
    </div>
  )
}

export default Dashboard;