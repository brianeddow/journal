import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayEntry from './DisplayEntry.js';
import { Link } from 'react-router-dom';
import Button from './Button.js';

const SingleEntry = (props) => {
  const location = useLocation();
  const { id, entry } = location.state;

  useEffect(() => {
    console.log('user ',id);
  })

  return (
    <div>
      <div><DisplayEntry {...entry} /></div>
      <div><Link to="/entries" state={{ id }}><Button name="Back"></Button></Link></div>
    </div>
  );

}

export default SingleEntry;