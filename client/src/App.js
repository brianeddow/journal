import logo from './logo.svg';
import './App.css';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {

  const [ user, setUser ] = useState('');
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let info = await axios('/user');
        // info = JSON.parse(JSON.stringify(info));
        setUser(info.data._UID);
        console.log(`user info from get to /user -- ${info.data._UID}`)
      } catch (e) {
        setUser(e);
        console.log(`error from getUserInfo in App.js -- ${user}`);
      }
    }
    getUserInfo();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/entry" state={{ id: user }} className="mainLink">entry</Link>
        <Link to="/entries" state={{ id: user }} className="mainLink">entries</Link>
        <Link to="/singleentry" state={{ id: user }} className="mainLink">view entry</Link>
        <Link to="/button" className="mainLink">button</Link>
        <Link to="/textarea" className="mainLink">textarea</Link>
        <img src={logo} className="App-logo" alt="logo" />
        <form action="/logout?_method=DELETE" method="POST">
          <button type="submit">Logout</button>
        </form>
      </header>
    </div>
  );
}

export default App;
