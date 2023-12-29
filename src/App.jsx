import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import AddTaskInterface from "./components/AddTaskInterface";
import FilterTasksInterface from "./components/FilterTaskInterface";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [addTaskInterface, setAddTaskInterface] = useState(false);
  const [filterTasksInterface, setFilterTasksInterface] = useState(false);
  const [filter, setFilter] = useState(false);
  const [editMode, setEditMode] = useState({
    enabled: false,
    task: null,
    taskIndex: null,
  });

  useEffect(() => {
    let getTasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    if (getTasksFromStorage && getTasksFromStorage.length !== 0) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function toggleFilterTasksInterface() {
    setFilterTasksInterface((state) => !state);
  }

  function filterTasks(filter) {
    setFilter(filter);
    toggleFilterTasksInterface();
  }

  function removeFilter() {
    setFilter(false);
  }

  function toggleAddTaskInterface() {
    setAddTaskInterface((state) => !state);
    if (editMode.enabled) {
      setEditMode({ enabled: false, task: null, taskIndex: null });
    }
  }

  function saveTask(getTask) {
    let task = JSON.parse(getTask);
    if (editMode.enabled) {
      tasks[editMode.taskIndex] = task;
    } else {
      setTasks([...tasks, task]);
    }
    toggleAddTaskInterface();
  }

  function setTaskAsDone(taskIndex) {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    setTasks([...tasks]);
  }

  function editTask(task, taskIndex) {
    setEditMode({
      enabled: true,
      task: JSON.parse(task),
      taskIndex: taskIndex,
    });
    setAddTaskInterface(true);
  }

  function removeTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      <Header toggleAddTaskInterface={toggleAddTaskInterface} />

      <AddTaskInterface
        addTaskInterface={addTaskInterface}
        toggleAddTaskInterface={toggleAddTaskInterface}
        saveTask={saveTask}
        editMode={editMode}
      />

      <FilterTasksInterface
        filterTasksInterface={filterTasksInterface}
        toggleFilterTasksInterface={toggleFilterTasksInterface}
        filterTasks={filterTasks}
      />

      <TaskList
        tasks={tasks}
        filter={filter}
        removeFilter={removeFilter}
        setTaskAsDone={setTaskAsDone}
        editTask={editTask}
        removeTask={removeTask}
        toggleFilterTasksInterface={toggleFilterTasksInterface}
      />
    </div>
  );
}

export default App;