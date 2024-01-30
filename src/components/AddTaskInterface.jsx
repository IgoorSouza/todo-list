import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const titleRegex = /\w/;

export default function TaskInterface() {
  const [taskPriority, setTaskPriority] = useState("low");
  const taskTitleInput = useRef();
  const taskDescriptionInput = useRef();

  const tasks = useSelector((state) => {
    return state.allReducers.tasksReducer;
  });

  const addTaskInterface = useSelector((state) => {
    return state.allReducers.addTaskInterfaceReducer;
  });

  const editMode = useSelector((state) => {
    return state.allReducers.editModeReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode.enabled) {
      taskTitleInput.current.value = editMode.task.title;
      taskDescriptionInput.current.value = editMode.task.description;
      setTaskPriority(editMode.task.priority);
    }
  }, [editMode]);

  function getTaskPriority(priority) {
    setTaskPriority(priority);
  }

  function getTaskValues() {
    const task = {
      title: taskTitleInput.current.value,
      description: taskDescriptionInput.current.value,
      priority: taskPriority,
      done: editMode.enabled ? editMode.task.done : false,
    };

    return task;
  }

  function saveTask(task) {
    if (editMode.enabled) {
      let newTasks = [...tasks];
      newTasks[editMode.taskIndex] = task;
      dispatch({ type: "updateTasks", payload: newTasks });
      dispatch({
        type: "setEditMode",
        payload: { enabled: false, task: null, taskIndex: null },
      });
    } else {
      dispatch({ type: "updateTasks", payload: [...tasks, task] });
    }

    dispatch({ type: "toggleAddTaskInterface" });
  }

  function closeInterface(event) {
    let task = getTaskValues();

    if (event.target.id === "closeButton") {
      dispatch({ type: "toggleAddTaskInterface" });

      if (editMode.enabled) {
        dispatch({
          type: "setEditMode",
          payload: { enabled: false, task: null, taskIndex: null },
        });
      }

      taskTitleInput.current.value = "";
      taskDescriptionInput.current.value = "";
      setTaskPriority("low");
    } else if (titleRegex.test(task.title)) {
      saveTask(task);

      taskTitleInput.current.value = "";
      taskDescriptionInput.current.value = "";
      setTaskPriority("low");
    }
  }

  if (addTaskInterface) {
    return (
      <div className="addTaskInterface">
        <div className="addTaskInterfaceContainer">
          {" "}
          <div className="addTaskInterfaceHeader">
            <h1>Adicionar Tarefa</h1>
            <button onClick={closeInterface} id="closeButton">
              X
            </button>
          </div>
          <div className="taskTitle">
            <h3>Título:</h3>
            <input
              name="titleInput"
              type="text"
              autoComplete="off"
              ref={taskTitleInput}
              defaultValue={editMode.enabled ? editMode.task.title : ""}
            />
          </div>
          <div className="taskDescription">
            <h3>Descrição:</h3>
            <input
              name="descriptionInput"
              type="text"
              autoComplete="off"
              id="description"
              ref={taskDescriptionInput}
              defaultValue={editMode.enabled ? editMode.task.description : ""}
            />
          </div>
          <div className="taskPriority">
            <h3>Prioridade:</h3>

            <div>
              <button
                id="high"
                className={taskPriority === "high" ? "selected" : ""}
                onClick={() => getTaskPriority("high")}
              >
                Alta
              </button>

              <button
                id="low"
                className={taskPriority === "low" ? "selected" : ""}
                onClick={() => getTaskPriority("low")}
              >
                Baixa
              </button>
            </div>
          </div>
          <div className="saveButton">
            <button onClick={closeInterface}>Salvar Tarefa</button>
          </div>
        </div>
      </div>
    );
  }
}
