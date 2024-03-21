import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div>
        <h1>Lista de tarefas</h1>
        <button
          onClick={() => dispatch({ type: "toggleAddTaskInterface" })}
        >
          Adicionar tarefa
        </button>
      </div>
    </div>
  );
}
