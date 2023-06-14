import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login.js';
import Register from './Register.js';
import App from './App.js';
import CreateEntry from './CreateEntry.js';
import SingleEntry from './SingleEntry.js';
import AllEntries from './AllEntries.js';
import Form from './Form.js';
import Input from './Input.js';
import Button from './Button.js';
import Textarea from './TextArea.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<AllEntries />} />
        <Route path="/entry" element={<CreateEntry />} />
        <Route path="/singleentry" element={<SingleEntry />} />
        <Route path="/form" element={<Form><Input name="bacon" /><Button name="eggs" /></Form>} />
        <Route path="/button" element={<Button name="Je suis un button" />} />
        <Route path="/textarea" element={<Textarea />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();