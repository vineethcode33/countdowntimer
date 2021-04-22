import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
const { useState } = React;

const TimerInput = () => {
  return (
    <div>
      <div>
        <label htmlFor="timerName">NAME</label>
        <input type="text" name="timerName" id="timerName" />
      </div>
      <div>
        <label htmlFor="timerDate">Date</label>
        <input type="date" name="timerDate" id="timerDate"/>
      </div>
      <div>
        <label htmlFor="timerTime">Time</label>
        <input type="time" name="timerTime" id="timerTime"/>
      </div>
      <button type="submit">Start</button>
    </div>
  )
}

const countRemainingTime = (date, time) => {
  let seconds = Math.round(date.getTime() / 1000);
  let currentTime = seconds - 1;
  return currentTime;
}

function App() {
  const [timers, setTimers] = useState([{
    name: "My next birthday",
    id: uuidv4(),
    date: new Date("01-10-2022"),
    time: null
  }])
  return (
    <div className="App">
      <TimerInput></TimerInput>
      {
        timers.length > 0 ?
          <div>
            <span>
              {timers[0]["date"].toString()}
            </span>
          </div>: ""

      }
    </div>
  );
}




export default App;
