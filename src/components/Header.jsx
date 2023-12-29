import PropTypes from 'prop-types'

export default function Header(props) {
  return (
    <div className="header">
      <div>
        <h1>Lista de tarefas</h1>
        <button id="addTask" onClick={props.toggleAddTaskInterface}>
          Adicionar tarefa
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  toggleAddTaskInterface: PropTypes.func.isRequired
}