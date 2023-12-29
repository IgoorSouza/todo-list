import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'

const titleRegex = /\w/;

export default function TaskInterface(props) {
  const [taskPriority, setTaskPriority] = useState("low");
  const taskTitleInput = useRef();
  const taskDescriptionInput = useRef();

  useEffect(() => {
    if (props.editMode.enabled) {
      taskTitleInput.current.value = props.editMode.task.title;
      taskDescriptionInput.current.value = props.editMode.task.description;
      setTaskPriority(props.editMode.task.priority);
    }
  }, [props.editMode]);

  function getTaskPriority(event) {
    setTaskPriority(event.target.id);
  }

  function getTaskValues() {
    const task = {
      title: taskTitleInput.current.value,
      description: taskDescriptionInput.current.value,
      priority: taskPriority,
      done: props.editMode.enabled ? props.editMode.task.done : false,
    };

    return task;
  }

  function closeInterface(event) {
    let task = getTaskValues();

    if (event.target.id === "closeButton") {
      props.toggleAddTaskInterface();

      taskTitleInput.current.value = "";
      taskDescriptionInput.current.value = "";
      setTaskPriority("low");
    } else if (titleRegex.test(task.title)) {
      props.editMode.enabled
        ? props.saveTask(JSON.stringify(task), props.editMode.taskIndex)
        : props.saveTask(JSON.stringify(task));

      taskTitleInput.current.value = "";
      taskDescriptionInput.current.value = "";
      setTaskPriority("low");
    }
  }

  if (props.addTaskInterface) {
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
            <input name="titleInput"
              type="text"
              autoComplete="off"
              ref={taskTitleInput}
              defaultValue={
                props.editMode.enabled ? props.editMode.task.title : ""
              }
            />
          </div>
          <div className="taskDescription">
            <h3>Descrição:</h3>
            <input name="descriptionInput"
              type="text"
              autoComplete="off"
              id="description"
              ref={taskDescriptionInput}
              defaultValue={
                props.editMode.enabled ? props.editMode.task.description : ""
              }
            />
          </div>
          <div className="taskPriority">
            <h3>Prioridade:</h3>

            <div>
              <button
                id="high"
                className={taskPriority === "high" ? "selected" : ""}
                onClick={getTaskPriority}
              >
                Alta
              </button>

              <button
                id="low"
                className={taskPriority === "low" ? "selected" : ""}
                onClick={getTaskPriority}
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

TaskInterface.propTypes = {
  addTaskInterface: PropTypes.bool.isRequired,
  toggleAddTaskInterface: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  editMode: PropTypes.object.isRequired
}