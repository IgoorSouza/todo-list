import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => {
    return state.allReducers.tasksReducer;
  });

  const filter = useSelector((state) => {
    return state.allReducers.filterReducer;
  });

  useEffect(() => {
    let getTasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    if (getTasksFromStorage && getTasksFromStorage.length !== 0) {
      dispatch({ type: "updateTasks", payload: getTasksFromStorage });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function setTaskAsDone(task, taskIndex) {
    let newTask = {...task, done: !task.done};
    let allTasks = [...tasks];
    allTasks[taskIndex] = newTask;

    dispatch({ type: "updateTasks", payload: allTasks });
  }

  function editTask(task, taskIndex) {
    dispatch({ type: "toggleAddTaskInterface" });

    dispatch({
      type: "setEditMode",
      payload: {
        enabled: true,
        task,
        taskIndex
      },
    });
  }

  function removeTask(removedTask) {
    const newTasks = tasks.filter((task) => {
      return removedTask != task;
    });
    
    dispatch({ type: "updateTasks", payload: newTasks });
  }
  
  return (
    <div className="list">
      {(tasks.length > 0 || filter) && (
        <div id="filterButtons">
          <div>
            <button
              onClick={() => dispatch({ type: "toggleFilterTasksInterface" })}
            >
              Filtrar tarefas
            </button>

            <button
              onClick={() => dispatch({ type: "updateFilter", payload: false })}
            >
              Remover Filtros
            </button>
          </div>

          <div id="currentFilter">
            <h2>Filtro atual:</h2>

            <h3>{
              !filter ?
              "Nenhum" :
              filter.type === "title" ?
                `Tarefas cujo título possua "${filter.value}"` :
              filter.value === "high" ?
                "Tarefas de alta prioridade" :
              filter.value === "low" ?
                "Tarefas de baixa prioridade" :
              filter.value === true ? 
                "Tarefas concluídas" :
              filter.value === false && 
                "Tarefas não concluídas"
              }</h3>
          </div>
        </div>
      )}

      {tasks.map((task, index) => {
        const titleRegex = new RegExp(filter.value);
        
        return task.priority === "high" && (
          !filter ||
          (filter.type === "title" && titleRegex.test(task.title)) || 
          (filter.type === "priority" && filter.value === task.priority) || 
          (filter.type === "conclusion" && filter.value === task.done)
        ) && (
          <div key={index} className={task.done ? "taskDone" : null}>
            <div className="taskInfo">
              <div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
              </div>

              <div className="importantTask">
                <div>
                  <h2>!</h2>
                </div>

                <h4>Tarefa importante</h4>
              </div>
            </div>

            <div className="taskButtons">
              <button
                id="doneButton"
                className={task.done ? "done" : null}
                onClick={() => setTaskAsDone(task, tasks.indexOf(task))}
              >
                {task.done ? "Concluída" : "Marcar como concluída"}
              </button>

              <button onClick={() => editTask(task, tasks.indexOf(task))}>
                Editar
              </button>

              <button onClick={() => removeTask(task)}>
                Remover
              </button>
            </div>
          </div>
        );
      })}

      {tasks.map((task, index) => {
        const titleRegex = new RegExp(filter.value);

        return task.priority === "low" && (
          !filter ||
          (filter.type === "title" && titleRegex.test(task.title)) || 
          (filter.type === "priority" && filter.value === task.priority) || 
          (filter.type === "conclusion" && filter.value === task.done)
        ) && (
          <div key={index} className={task.done ? "taskDone" : null}>
            <div className="taskInfo">
              <div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
              </div>
            </div>

            <div className="taskButtons">
              <button
                id="doneButton"
                className={task.done ? "done" : null}
                onClick={() => setTaskAsDone(task, tasks.indexOf(task))}
              >
                {task.done ? "Concluída" : "Marcar como concluída"}
              </button>

              <button onClick={() => editTask(task, tasks.indexOf(task))}>
                Editar
              </button>

              <button onClick={() => removeTask(task)}>
                Remover
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}