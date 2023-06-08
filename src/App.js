import {useState} from 'react';

import './App.css';

function App() {
  const [timers, setTimers] = useState(['Timer 1', 'Timer 2']);
  
  const createTimer = (newTimer) => setTimers(existing => [...existing, newTimer]);
  
  const handleDelete = (timerName) => {
    setTimers(timers => [...timers.filter(timer => timer !== timerName)]);
  }
  
  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Timers</h1>
      </div>
      <div className='App-body'>
        <ul>
          {
            timers.map(title => (
              <li key={title}>
                <Timer title={title}  handleDelete={handleDelete}/>
              </li>
            ))
          }
          <li>
            <NewTimer createTimer={createTimer}/>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;

const Timer = ({title, handleDelete}) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState();
  
  const toggleTimer = () => {
    if (!timer) {
      const newTimer = setInterval(() => {
        setTime(currentTime => currentTime + 1);
      }, 1000);
      setTimer(newTimer);
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }
  
  return (
    <div className='Timer'>
      <p className='title'>{title}</p>
      <p className='time'>{(new Date(time * 1000 - 19*60*60*1000)).toTimeString('en-US').slice(0, 8)}</p>
      <button className='btn-delete' onClick={() => handleDelete(title)}>&#128465;</button>
      <button className={`btn-toggle ${timer ? 'btn-active':''}`} onClick={toggleTimer}>{timer ? 'Stop':'Start'}</button>
    </div>
  )
}

const NewTimer = ({createTimer}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleCreate = (ev) => {
    createTimer(ev.target['new-title'].value);
    setIsEditing(false);
  }
  
  if (isEditing) {
    return (
      <div className='Timer'>
        <form onSubmit={handleCreate}>
          <label className='title'>Title
            <input type='text' id='new-title'/>
            <div className='buttons'>
              <button className='btn-create'>Create</button>
              <button className='btn-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </label>
        </form>
      </div>
    )
  } else {
    return (
      <div className='btn-add-container'>
        <button className='btn-add' onClick={() => setIsEditing(true)}>+</button>
      </div>
    )
  }
}