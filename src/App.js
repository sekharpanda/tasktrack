import React, { useEffect, useState } from 'react';
import "./App.css";
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';
import todoIcon from './assets/direct-hit.png';
import doingIcon from './assets/glowing-star.png';
import doneIcon from './assets/check-mark-button.png';

const App = () => {
  const oldTasks = localStorage.getItem("tasks");
  const parsedTasks = oldTasks ? JSON.parse(oldTasks) : [];

  const [tasks, setTasks] = useState(Array.isArray(parsedTasks) ? parsedTasks : []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    setTasks(prevTasks => {
      if (Array.isArray(prevTasks)) {
        return prevTasks.filter((_, index) => index !== taskIndex);
      } else {
        console.error("Previous tasks state is not an array:", prevTasks);
        return [];
      }
    });
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className='app-main'>
        <TaskColumn title='To Do' icon={todoIcon} tasks={tasks} status="todo" handleDelete={handleDelete} />
        <TaskColumn title='Doing' icon={doingIcon} tasks={tasks} status="doing" handleDelete={handleDelete} />
        <TaskColumn title='Done' icon={doneIcon} tasks={tasks} status="done" handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;
