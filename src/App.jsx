import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';//Gera um Id aleatorio.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import './index.css';
import Tasks from "./components/Tasks"
import AddTask from './components/AddTask'
import Header from './components/Header';
import TaskDetails from './components/TaskDetails';
import axios from 'axios';



const App = () => {
  //let const message= "Hello World!!";
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar progrogramação',
      completed: false,
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: true,
    }
  ]);
  //API 
useEffect(() => {
  const fetchTasks = async () =>{
    const {data} = await axios.get(
      "https://jsonplaceholder.cypress.io/todos?_limit=10"
    );
    setTasks(data);
  };
  fetchTasks();
},[])


  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    })
    setTasks(newTasks);
  };
  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),//Gera um Id aleatorio.
        completed: false,
      },
    ];
    setTasks(newTasks)
  };
  //Remover tarefa.
  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);

    setTasks(newTasks);
  };

  return (
    //Aqui renderiza na tela 
    <Router>
      <div className='container'>
        <Header />

        <Routes>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDeletion={handleTaskDeletion}

                />
              </>
            )}
          />
            <Route path="/:taskTile" exact component={TaskDetails} />

        </Routes>

      </div>
    </Router>

  )
};
export default App;