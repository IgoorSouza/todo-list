import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import "./index.css";

import Header from "./components/Header";
import AddTaskInterface from "./components/AddTaskInterface";
import FilterTasksInterface from "./components/FilterTaskInterface";
import TaskList from "./components/TaskList";

import tasksReducer from "./reducers/tasksReducer"
import filterReducer from "./reducers/filterReducer"
import editModeReducer from "./reducers/editModeReducer"
import addTaskInterfaceReducer from "./reducers/addTaskInterfaceReducer"
import filterTasksInterfaceReducer from "./reducers/filterTasksInterfaceReducer"

const allReducers = combineReducers({
  tasksReducer,
  filterReducer,
  editModeReducer,
  addTaskInterfaceReducer,
  filterTasksInterfaceReducer,
})

const store = configureStore({ reducer: { allReducers }})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <AddTaskInterface />
        <FilterTasksInterface />
        <TaskList />
      </Provider>
    </div>
  );
}

export default App;