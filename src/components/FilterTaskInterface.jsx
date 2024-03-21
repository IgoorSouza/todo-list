import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const titleRegex = /\w/;

export default function FilterTasksInterface() {
  const [filter, setFilter] = useState({ type: "title", value: null });
  const textInput = useRef();
  const dispatch = useDispatch();

  const filterTasksInterface = useSelector((state) => {
    return state.allReducers.filterTasksInterfaceReducer;
  });

  function applyFilter() {
    if (filter.type === "title" && titleRegex.test(textInput.current.value)) {
      setFilter({...filter, value: textInput.current.value})
      dispatch({ type: "updateFilter", payload: {...filter, value: textInput.current.value} });
    } else if (filter.value != null) {
      dispatch({ type: "updateFilter", payload: filter });
    }

    dispatch({ type: "toggleFilterTasksInterface" });
  }

  return filterTasksInterface && (
    <div className="filterTasksInterface">
      <div className="filterTasksInterfaceContainer">
        <div className="filterTasksInterfaceHeader">
          <h1>Filtrar Tarefas</h1>
          <button
            id="closeButton"
            onClick={() => dispatch({ type: "toggleFilterTasksInterface" })}>
            X
          </button>
        </div>

        <div className="filterConfig">
          <h3>Filtrar por: </h3>

          <select
            defaultValue={filter.type}
            onChange={(event) => {
              setFilter({ type: event.target.value, value: null });
            }}
          >
            <option value="title"> Título </option>
            <option value="priority"> Prioridade </option>
            <option value="conclusion"> Conclusão </option>
          </select>

          <div className="filterInfo">
            {filter.type === "title" && (
              <input
                name="titleInput"
                type="text"
                autoComplete="off"
                placeholder="Filtrar pelo título..."
                defaultValue={filter.value}
                ref={textInput}
              />
            )}

            {filter.type === "priority" && (
              <div className="taskPriority">
                <button
                  className={filter.value === "high" ? "selected" : null}
                  onClick={() => setFilter({...filter, value: "high"})}
                >
                  Alta
                </button>

                <button
                  className={filter.value === "low" ? "selected" : null}
                  onClick={() => setFilter({...filter, value: "low"})}
                >
                  Baixa
                </button>
              </div>
            )}

            {filter.type === "conclusion" && (
              <div className="taskConclusion">
                <button
                  className={filter.value === true ? "selected" : null}
                  onClick={() =>
                    setFilter({...filter, value: true})
                  }
                >
                  Concluída
                </button>

                <button
                  className={filter.value === false ? "selected" : null}
                  onClick={() =>
                    setFilter({...filter, value: false})
                  }
                >
                  Não Concluída
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="saveButton">
          <button onClick={applyFilter}>Filtrar Tarefas</button>
        </div>
      </div>
    </div>
  );
}