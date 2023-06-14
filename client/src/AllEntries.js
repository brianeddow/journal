'use strict';

import React, { useState, useEffect } from 'react';
import readItem from './db_actions/readItem.js';
import table from './controller/table.js';
import DisplayEntry from './DisplayEntry.js';
import Button from './Button.js';
import { useLocation, Link } from 'react-router-dom';

const AllEntries = (props) => {

  let [entries, setEntries] = useState([]);
  let [entryArray, setEntryArray] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const getEntries = () => {
      try {
        readItem(id)
          .then(response => {
            const entries = JSON.parse(JSON.stringify(response));
            const newData = [];
            for (let key in entries) {
              let entry = entries[key];
              newData.push({
                index: key,
                title: entry.title,
                date: entry.date,
                mood: entry.mood,
                keywords: entry.keywords,
                entry: entry.entry
              })
            }
            setEntries(newData);
            const entryArray = [];
            for (let key in entries) {
              entryArray.push([key,entries[key]]);
            }
            setEntryArray(entryArray);
          })
        } catch (e) {
          console.log(`error in GetEntries -- ${e}`);
        }
    }
    getEntries();
  }, [])

  return (
    <div>
      {entryArray.map( entry => <DisplayEntry id={id} { ...entry[1] } /> )}
      <div><Link to="/"><Button name="home" /></Link></div>
    </div>
  );
}
 
export default AllEntries;