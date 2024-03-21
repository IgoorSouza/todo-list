import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const titleRegex = /\w/;

export default function TaskInterface() {
  const [taskPriority, setTaskPriority] = useState("low");
  const taskTitleInput = useRef();
  const taskDescriptionInput = useRef();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => {
    return state.allReducers.tasksReducer;
  });

  const addTaskInterface = useSelector((state) => {
    return state.allReducers.addTaskInterfaceReducer;
  });

  const editMode = useSelector((state) => {
    return state.allReducers.editModeReducer;
  });

  useEffect(() => {
    if (editMode.enabled) {
      taskTitleInput.current.value = editMode.task.title;
      taskDescriptionInput.current.value = editMode.task.description;
      setTaskPriority(editMode.task.priority);
    }
  }, [editMode]);

  function closeInterface(event) {
    if (event.target.id != "closeButton") {
      const task = {
        title: taskTitleInput.current.value,
        description: taskDescriptionInput.current.value,
        priority: taskPriority,
        done: editMode.enabled ? editMode.task.done : false,
      };
  
      if (titleRegex.test(task.title)) {
        if (editMode.enabled) {
          let newTasks = [...tasks];
          newTasks[editMode.taskIndex] = task;
  
          dispatch({ type: "updateTasks", payload: newTasks });
        } else {
          dispatch({ type: "updateTasks", payload: [...tasks, task] });
        }
      }
    }

    if (editMode.enabled) {
      dispatch({
        type: "setEditMode",
        payload: { enabled: false, task: null, taskIndex: null },
      });
    }
    
    setTaskPriority("low");
    dispatch({ type: "toggleAddTaskInterface" });
  }

  if (addTaskInterface) {
    return (
      <div className="addTaskInterface">
        <div className="addTaskInterfaceContainer">
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
              defaultValue={editMode.enabled ? editMode.task.title : null}
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
              defaultValue={editMode.enabled ? editMode.task.description : null}
            />
          </div>
          
          <div className="taskPriority">
            <h3>Prioridade:</h3>

            <div>
              <button
                className={taskPriority === "high" ? "selected" : null}
                onClick={() => setTaskPriority("high")}
              >
                Alta
              </button>

              <button
                className={taskPriority === "low" ? "selected" : null}
                onClick={() => setTaskPriority("low")}
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