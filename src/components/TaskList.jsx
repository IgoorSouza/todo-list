import PropTypes from 'prop-types'

export default function TaskList(props) {
  let highPriorityTasks = [];
  let lowPriorityTasks = [];

  if (props.filter) {
    switch (props.filter.type) {
      case "title": {
        const titleRegex = new RegExp(props.filter.value);
        highPriorityTasks = props.tasks.filter(
          (task) => task.priority === "high" && titleRegex.test(task.title)
        );

        lowPriorityTasks = props.tasks.filter(
          (task) => task.priority === "low" && titleRegex.test(task.title)
        );
        break;
      }

      case "priority":
        if (props.filter.value === "high") {
          highPriorityTasks = props.tasks.filter(
            (task) => task.priority === "high"
          );
          lowPriorityTasks = [];
        } else {
          lowPriorityTasks = props.tasks.filter(
            (task) => task.priority === "low"
          );
          highPriorityTasks = [];
        }
        break;

      case "conclusion":
        highPriorityTasks = props.tasks.filter(
          (task) => task.priority === "high" && task.done === props.filter.value
        );

        lowPriorityTasks = props.tasks.filter(
          (task) => task.priority === "low" && task.done === props.filter.value
        );
        break;

      default:
        break;
    }
  } else {
    highPriorityTasks = props.tasks.filter((task) => task.priority === "high");
    lowPriorityTasks = props.tasks.filter((task) => task.priority === "low");
  }

  return (
    <div className="list">
      {props.tasks.length > 0 || props.filter ? (
        <div id="filterButtons">
          <div>
            <button onClick={props.toggleFilterTasksInterface}>
              Filtrar tarefas
            </button>
            <button onClick={props.removeFilter}>Remover Filtros</button>
          </div>
          <div id="currentFilter">
            <h2>Filtro atual:</h2>
            <h3>
              {!props.filter ? "Nenhum" : null}

              {props.filter.type === "title"
                ? `Tarefas cujo título possua "${props.filter.value}"`
                : null}

              {props.filter.type === "priority" && props.filter.value === "high"
                ? "Tarefas de alta prioridade"
                : null}

              {props.filter.type === "priority" && props.filter.value === "low"
                ? "Tarefas de baixa prioridade"
                : null}

              {props.filter.type === "conclusion" && props.filter.value === true
                ? "Tarefas concluídas"
                : null}

              {props.filter.type === "conclusion" &&
              props.filter.value === false
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
                <div><h2>!</h2></div>
                <h4>Tarefa importante</h4>
              </div>
            </div>

            <div className="taskButtons">
              <button
                id="doneButton"
                className={task.done ? "done" : ""}
                onClick={() => {
                  let taskIndex = props.tasks.indexOf(task);
                  props.setTaskAsDone(taskIndex);
                }}
              >
                {task.done ? "Concluída" : "Marcar como concluída"}
              </button>

              <button
                onClick={() => {
                  let taskIndex = props.tasks.indexOf(task);
                  props.editTask(JSON.stringify(task), taskIndex);
                }}
              >
                Editar
              </button>

              <button
                onClick={() => {
                  let taskIndex = props.tasks.indexOf(task);
                  props.removeTask(taskIndex);
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
                  let taskIndex = props.tasks.indexOf(task);
                  props.setTaskAsDone(taskIndex);
                }}
              >
                {task.done ? "Concluída" : "Marcar como concluída"}
              </button>

              <button
                onClick={() => {
                  let taskIndex = props.tasks.indexOf(task);
                  props.editTask(JSON.stringify(task), taskIndex);
                }}
              >
                Editar
              </button>

              <button
                onClick={() => {
                  let taskIndex = props.tasks.indexOf(task);
                  props.removeTask(taskIndex);
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

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  filter: PropTypes.oneOfType([ 
    PropTypes.bool.isRequired, 
    PropTypes.object.isRequired 
  ]),
  removeFilter: PropTypes.func.isRequired,
  setTaskAsDone: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleFilterTasksInterface: PropTypes.func.isRequired
}