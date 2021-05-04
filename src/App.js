import * as React from 'react';
import "./App.css"
import { v4 as uuidv4 } from 'uuid';
const { useState } = React;

const CountDownTimers = ({ allTimers }) => {
  return (
    <div>
      {
        allTimers.map((timer, index) => (
          <div key={uuidv4()}>
            <p>Name: {timer.timerName}</p>
            <p>Count down: {`${timer.days}:${timer.hours}:${timer.minutes}:${timer.seconds}`}</p>
          </div>
        ))
     }
    </div>
  )
}

const TimerInput = () => {

  const [timerName, setTimerName] = useState("")
  const [timerDate, setTimerDate] = useState("")
  const [timerTime, setTimerTime] = useState("")
  const [allTimers, setAllTimers] = useState([])


  const handleSubmit = (e) => {

    e.preventDefault()
    let existingTimers = [...allTimers]
    let dateNow = Date.now()
    let userDate = new Date(timerDate + ' ' + timerTime)
    console.log(userDate.toUTCMilliseconds())
    let elapsed =  userDate.getUTCMilliseconds() - dateNow
    let days = Math.floor(elapsed / (3600*24))
    let hours = Math.floor((elapsed % (3600*24)) / 3600)
    let minutes = Math.floor((elapsed % 3600)/60)
    let seconds = Math.floor(elapsed % 60)

    existingTimers.push({
      timerName,
      dateTime: new Date(timerDate + ' ' + timerTime),
      id: uuidv4(),
      days,
      hours,
      minutes,
      seconds
    })
    setAllTimers(existingTimers)
    setTimerName("")
    setTimerDate("")
    setTimerTime("")
  }

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
      <CountDownTimers allTimers={allTimers}/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <TimerInput></TimerInput>
    </div>
  );
}

export default App;
