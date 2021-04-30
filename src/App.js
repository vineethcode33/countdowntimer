import * as React from 'react';
import "./App.css"
import { v4 as uuidv4 } from 'uuid';
const { useState } = React;

const TimerInput = () => {

  const [timerName, setTimerName] = useState("")
  const [timerDate, setTimerDate] = useState("")
  const [timerTime, setTimerTime] = useState("")
  const [allTimers, setAllTimers] = useState([])


  const handleSubmit = (e) => {
    console.log("called on submit")
    let existingTimers = [...allTimers]
    existingTimers.push({
      timerName, dateTime: new Date(timerDate + ' ' + timerTime), id: uuidv4()
    })
    console.log("existingTimers: ", existingTimers);
    setAllTimers(existingTimers)
    e.preventDefault()

  }

  console.log("timerName:", timerName);
  console.log("timerDate:", timerDate);
  console.log("timerTime:", timerTime);
  console.log("allTimers:", allTimers);


  return (
    <div className="CounterInputCard">
      <form onSubmit={handleSubmit}>
        <label htmlFor="timerName">Name:</label>
        <input value={timerName} type="text" name="timerName" id="timerName" onChange={ (e) => setTimerName(e.target.value)}/>
        <label htmlFor="timerDate">Date:</label>
        <input value={timerDate} type="date" name="timerDate" id="timerDate" onChange={ (e) => setTimerDate(e.target.value)}/>
        <label htmlFor="timerTime">Time:</label>
        <input value={timerTime} type="time" name="timerTime" id="timerTime" onChange={ (e) => setTimerTime(e.target.value)}/>
        <input type="submit" value='Start'/>
        </form>
    </div>
  )
}

const CountDownTimers = (allTimers) => {

  return (
    <div>
      {
        allTimers.map((timer) =>
          <div>
            <p>{timer.name}</p>
            <p>{ timer.dateTime}</p>
          </div>

        )
      }
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <TimerInput ></TimerInput>
      {/* <CountDownTimers {...allTimers}/> */}
    </div>
  );
}




export default App;
