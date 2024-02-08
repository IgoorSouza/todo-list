import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function TaskList() {
  const tasks = useSelector((state) => {
    return state.allReducers.tasksReducer;
  });

  const filter = useSelector((state) => {
    return state.allReducers.filterReducer;
  });

  const dispatch = useDispatch();

  let highPriorityTasks = [];
  let lowPriorityTasks = [];

  useEffect(() => {
    let getTasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
    if (getTasksFromStorage && getTasksFromStorage.length !== 0) {
      dispatch({ type: "updateTasks", payload: getTasksFromStorage });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function setTaskAsDone(taskIndex) {
    let newTask = {
      title: tasks[taskIndex].title,
      description: tasks[taskIndex].description,
      priority: tasks[taskIndex].priority,
      done: !tasks[taskIndex].done,
    };

    let newTasks = [...tasks];

    newTasks[taskIndex] = newTask;

    dispatch({ type: "updateTasks", payload: newTasks });
  }

  function editTask(task, taskIndex) {
    dispatch({
      type: "setEditMode",
      payload: {
        enabled: true,
        task: JSON.parse(task),
        taskIndex: taskIndex,
      },
    });

    dispatch({ type: "toggleAddTaskInterface" });
  }

  function removeTask(taskIndex) {
    const newTasks = tasks.filter((task, index) => {
      return index != taskIndex;
    });
    
    dispatch({ type: "updateTasks", payload: newTasks });
  }

  if (filter) {
    switch (filter.type) {
      case "title": {
        const titleRegex = new RegExp(filter.value);
        highPriorityTasks = tasks.filter(
          (task) => task.priority === "high" && titleRegex.test(task.title)
        );

        lowPriorityTasks = tasks.filter(
          (task) => task.priority === "low" && titleRegex.test(task.title)
        );
        break;
      }

      case "priority":
        if (filter.value === "high") {
          highPriorityTasks = tasks.filter((task) => task.priority === "high");
          lowPriorityTasks = [];
        } else {
          lowPriorityTasks = tasks.filter((task) => task.priority === "low");
          highPriorityTasks = [];
        }
        break;

      case "conclusion":
        highPriorityTasks = tasks.filter(
          (task) => task.priority === "high" && task.done === filter.value
        );

        lowPriorityTasks = tasks.filter(
          (task) => task.priority === "low" && task.done === filter.value
        );
        break;

      default:
        break;
    }
  } else {
    highPriorityTasks = tasks.filter((task) => task.priority === "high");
    lowPriorityTasks = tasks.filter((task) => task.priority === "low");
  }

  return (
    <div className="list">
      {tasks.length > 0 || filter ? (
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
            <h3>
              {!filter ? "Nenhum" : null}

              {filter.type === "title"
                ? `Tarefas cujo título possua "${filter.value}"`
                : null}

              {filter.type === "priority" && filter.value === "high"
                ? "Tarefas de alta prioridade"
                : null}

              {filter.type === "priority" && filter.value === "low"
                ? "Tarefas de baixa prioridade"
                : null}

              {filter.type === "conclusion" && filter.value === true
                ? "Tarefas concluídas"
                : null}

              {filter.type === "conclusion" && filter.value === false
                ? "Tarefas não concluídas"
                : null}
            </h3>
          </div>
        </div>
      ) : (
        ""
      )}

      {highPriorityTasks.map((task, index) => {
        return (
          <div key={index} className={task.done ? "taskDone" : ""}>
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
                className={task.done ? "done" : ""}
                onClick={() => {
                  let taskIndex = tasks.indexOf(task);
                  setTaskAsDone(taskIndex);
                }}
              >
                {task.done ? "Concluída" : "Marcar como concluída"}
              </button>

              <button
                onClick={() => {
                  let taskIndex = tasks.indexOf(task);
                  editTask(JSON.stringify(task), taskIndex);
                }}
              >
                Editar
              </button>

              <button
                onClick={() => {
                  let taskIndex = tasks.indexOf(task);
                  removeTask(taskIndex);
                }}
              >
                Remover
              </button>
            </div>
          </div>
        );
      })}

      {lowPriorityTasks.map((task, index) => {
        return (
          <div key={index} className={task.done ? "taskDone" : ""}>
            <div className="taskInfo">
              <div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
              </div>
            </div>

            <div className="taskButtons">
              <button
                id="doneButton"
                className={task.done ? "done" : ""}
                onClick={() => {
                  let taskIndex = tasks.indexOf(task);
                  setTaskAsDone(taskIndex);
                }}
              >
                {task.done ? "Concluída" : "Marcar como concluída"}
              </button>

              <button
                onClick={() => {
                  let taskIndex = tasks.indexOf(task);
                  editTask(JSON.stringify(task), taskIndex);
                }}
              >
                Editar
              </button>

              <button
                onClick={() => {
                  let taskIndex = tasks.indexOf(task);
                  removeTask(taskIndex);
                }}
              >
                Remover
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
