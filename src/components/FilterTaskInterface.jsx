import { useState, useRef } from "react";
import PropTypes from 'prop-types'

const titleRegex = /\w/;

export default function FilterTasksInterface(props) {
  const [selectInput, setSelectInput] = useState("title");
  const textInput = useRef();
  const [filter, setFilter] = useState({ type: selectInput, value: "" });

  function getPriorityFilter(event) {
    setFilter({ type: selectInput, value: event.target.id });
  }

  function getConclusionFilter(event) {
    setFilter({
      type: selectInput,
      value: event.target.id === "done" ? true : false,
    });
  }

  function getFilter() {
    if (filter.type === "title") {
      filter.value = textInput.current.value;

      if (titleRegex.test(filter.value)) {
        return filter;
      }
    } else if (filter.value || filter.value === false) {
      return filter;
    }
  }

  function closeInterface(event) {
    if (event.target.id === "closeButton") {
      props.toggleFilterTasksInterface();
    } else {
      const filter = getFilter();
      if (filter) {
        props.filterTasks(filter);
      }
    }
  }

  if (props.filterTasksInterface) {
    return (
      <div className="filterTasksInterface">
        <div className="filterTasksInterfaceContainer">
          <div className="filterTasksInterfaceHeader">
            <h1>Filtrar Tarefas</h1>
            <button onClick={closeInterface} id="closeButton">
              X
            </button>
          </div>

          <div className="filterConfig">
            <h3>Filtrar por: </h3>

            <select
              defaultValue={filter.type}
              onChange={(event) => {
                setSelectInput(event.target.value);
                setFilter({ type: event.target.value, value: "" });
              }}
            >
              <option value="title"> Título </option>
              <option value="priority"> Prioridade </option>
              <option value="conclusion"> Conclusão </option>
            </select>

            <div className="filterInfo">
              {selectInput === "title" ? (
                <input name="titleInput"
                  type="text"
                  autoComplete="off"
                  placeholder="Buscar pelo título..."
                  defaultValue={filter.value}
                  ref={textInput}
                />
              ) : (
                ""
              )}

              {selectInput === "priority" ? (
                <div className="taskPriority">
                  <button
                    id="high"
                    className={filter.value === "high" ? "selected" : ""}
                    onClick={getPriorityFilter}
                  >
                    Alta
                  </button>

                  <button
                    id="low"
                    className={filter.value === "low" ? "selected" : ""}
                    onClick={getPriorityFilter}
                  >
                    Baixa
                  </button>
                </div>
              ) : (
                ""
              )}

              {selectInput === "conclusion" ? (
                <div className="taskConclusion">
                  <button
                    id="done"
                    className={filter.value === true ? "selected" : ""}
                    onClick={getConclusionFilter}
                  >
                    Concluída
                  </button>

                  <button
                    id="notDone"
                    className={filter.value === false ? "selected" : ""}
                    onClick={getConclusionFilter}
                  >
                    Não Concluída
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="saveButton">
            <button onClick={closeInterface}>Filtrar Tarefas</button>
          </div>
        </div>
      </div>
    );
  }
}

FilterTasksInterface.propTypes = {
  filterTasksInterface: PropTypes.bool.isRequired,
  toggleFilterTasksInterface: PropTypes.func.isRequired,
  filterTasks: PropTypes.func.isRequired
}