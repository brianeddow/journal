import React from 'react';
import { Link } from 'react-router-dom';

const DisplayEntry = ({ id, index, title, date, mood, keywords, entry }) => {
  let row;
  return row = (
    <div key={index}>
      <p>Title: {title}</p>
      <p>Date: {date}</p>
      <p>Mood: {mood}</p>
      <p>Keywords: {keywords}</p>
      <p>Entry: {entry}</p>
      <Link to="/singleentry" state={{ id: id, entry: { 
        index,
        title,
        date,
        mood,
        keywords,
        entry
       } }}>Edit</Link>
    </div>
  );
}

export default DisplayEntry;