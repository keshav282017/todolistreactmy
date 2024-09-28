import React, { useState } from "react";
import "./style.css";

function App() {
  // states
  const [task, setTask] = useState("");
  const [list, setlist] = useState([]);
  const [dueDate, setdueDate] = useState("");
  const [originalList, setoriginalList] = useState([]);

  // functions

  //addtask
  function addTask(e) {
    e.preventDefault();

    setlist([...list, { text: task, dueDate, completed: false }]);
    console.log(list);
    setTask("");
    setdueDate("");
  }

  //removetask
  function removeTask(index) {
    const newTasks = list.filter((_, i) => i !== index);
    setlist(newTasks);
  }
  // compelte button function
  const toggleComplete = (index) => {
    const newTasks = list.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    
    setlist(newTasks);
  };

  // clear all list button
  function clearAllTask() {
    setlist([]);
  }

  // show complete task
  const showCompeletedTask = () => {
    if (originalList.length === 0) {
      setoriginalList(list); // Store the current full list only once
    }
    const completedTask = list.filter((i) => i.completed === true);
    setlist(completedTask);
  };
  // show again all task
  const showAllTask = () => {
    setlist(originalList);
  };

  return (
    <div className="container">
      <div className="App">
        <form onSubmit={addTask}>
          <div className="input">
            <h1>To-Do List</h1>

            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />

            <input
              type="date"
              onChange={(e) => setdueDate(e.target.value)}
              required
            />
            <button className="add-btn" type="submit">
              Add
            </button>
          </div>
        </form>

        <div className="task-list">
          {list.map((t, index) => (
            <li key={index} className={t.completed ? "completed" : "undo"}>
              <span>{t.text}</span>
              {t.dueDate && <span> (Due: {t.dueDate})</span>}
              <div className="btn-1">
                <button onClick={() => removeTask(index)}>Delete</button>
                <button onClick={() => toggleComplete(index)}
                  className={t.completed? "complete" : "undo"} 
                  >
                  {t.completed ? "Undo" : "Complete"}
                </button>
              </div>
            </li>
          ))}
        </div>

        <div className="btn-2">
          <button onClick={clearAllTask}>clearAll</button>
          <button onClick={showCompeletedTask}>Completed Tasks</button>
          <button onClick={showAllTask}>All Task</button>
        </div>
      </div>
    </div>
  );
}

export default App;
