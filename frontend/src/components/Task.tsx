import doneIcon from "../assets/done.svg";
import pendingIcon from "../assets/pending.svg";

interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  createdAt: React.ReactNode;
  updatedAt: React.ReactNode;
}

interface Props {
  task: Task;
}

export default function Task({ task }: Props) {
  return (
    <div
      className={`w-64 flex flex-col p-4 bg-slate-700 rounded-lg break-words md:w-72 ${
        task.done && "opacity-60"
      }`}
      key={task.id}
    >
      <h2 className="font-bold text-xl md:text-2xl">{task.title}</h2>

      {task.description && (
        <p className="md:text-lg mt-1">{task.description}</p>
      )}

      <div className="flex flex-col justify-end h-full">
        <small className="mt-3">Criada em {task.createdAt}</small>
        <small>Última mudança em {task.updatedAt}</small>
        <div className="flex items-center mt-3">
          <img
            src={task.done ? doneIcon : pendingIcon}
            className="size-5 mr-[6px] md:size-6"
          />
          <p className="text-sm md:text-md">
            {task.done ? "Tarefa concluída" : "Marcar como concluída"}
          </p>
        </div>
      </div>
    </div>
  );
}
