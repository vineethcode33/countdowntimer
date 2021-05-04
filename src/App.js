import * as React from 'react';
import "./App.css"
import { v4 as uuidv4 } from 'uuid';
const { useState, useEffect } = React;

const CountDownTimers = ({ allTimers }) => {
  return (
    <div>
      {
        allTimers.map((timer, index) => (
          <div key={uuidv4()}>
            <p>Name: {timer.timerName}</p>
            <p>Count down: {`${timer.days}D:${timer.hours}H:${timer.minutes}M:${timer.seconds}S`}</p>
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


  const calTime = (userDate) => {
    let dateNow = new Date()

    let elapsed_seconds = (userDate - dateNow)/1000
    let days = Math.floor(elapsed_seconds / (3600*24))
    let hours = Math.floor((elapsed_seconds % (3600*24)) / (3600))
    let minutes = Math.floor((elapsed_seconds % (3600))/(60))
    let seconds = Math.floor(elapsed_seconds % 60)
    return {days, hours, minutes, seconds}
  }

  const updateCountDownTimer = (timers) => {
    let newTimers=[];
    timers.forEach((timer, index) => {
      let userDate = timer.dateTime
      let { days, hours, minutes, seconds } = calTime(userDate);

      newTimers.push({
      days, hours, minutes, seconds,
      timerName: timer.timerName,
      dateTime: timer.dateTime,
      id: timer.id
      })
    })
    return newTimers;
  }

   useEffect(() => {
    const interval = setInterval(() => {
      if (allTimers.length > 0) {
        let newTimers = updateCountDownTimer(allTimers)
        setAllTimers(newTimers)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [updateCountDownTimer,allTimers]);



  const handleSubmit = (e) => {
    e.preventDefault()
    let existingTimers = [...allTimers]
    let userDate = new Date(timerDate.toString() + ' ' + timerTime.toString())
    let { days, hours, minutes, seconds } = calTime(userDate)

    existingTimers.push({
      timerName,
      dateTime: new Date(timerDate.toString() + ' ' + timerTime.toString()),
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
