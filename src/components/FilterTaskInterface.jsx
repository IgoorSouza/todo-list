import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const titleRegex = /\w/;

export default function FilterTasksInterface() {
  const [selectInput, setSelectInput] = useState("title");
  const [filter, setFilter] = useState({ type: selectInput, value: "" });
  const textInput = useRef();

  const filterTasksInterface = useSelector((state) => {
    return state.allReducers.filterTasksInterfaceReducer;
  });

  const dispatch = useDispatch();

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
      dispatch({ type: "toggleFilterTasksInterface" });
    } else {
      const filter = getFilter();
      if (filter) {
        dispatch({ type: "updateFilter", payload: filter });
        dispatch({ type: "toggleFilterTasksInterface" });
      }
    }
  }

  if (filterTasksInterface) {
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
              {selectInput === "title" && (
                <input
                  name="titleInput"
                  type="text"
                  autoComplete="off"
                  placeholder="Filtrar pelo título..."
                  defaultValue={filter.value}
                  ref={textInput}
                />
              )}

              {selectInput === "priority" && (
                <div className="taskPriority">
                  <button
                    id="high"
                    className={filter.value === "high" ? "selected" : ""}
                    onClick={() =>
                      setFilter({ type: selectInput, value: "high" })
                    }
                  >
                    Alta
                  </button>

                  <button
                    id="low"
                    className={filter.value === "low" ? "selected" : ""}
                    onClick={() =>
                      setFilter({ type: selectInput, value: "low" })
                    }
                  >
                    Baixa
                  </button>
                </div>
              )}

              {selectInput === "conclusion" && (
                <div className="taskConclusion">
                  <button
                    id="done"
                    className={filter.value === true ? "selected" : ""}
                    onClick={() =>
                      setFilter({ type: selectInput, value: true })
                    }
                  >
                    Concluída
                  </button>

                  <button
                    id="notDone"
                    className={filter.value === false ? "selected" : ""}
                    onClick={() =>
                      setFilter({ type: selectInput, value: false })
                    }
                  >
                    Não Concluída
                  </button>
                </div>
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
