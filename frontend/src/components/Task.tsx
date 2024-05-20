import api from "../services/axios";
import doneIcon from "../assets/done.svg";
import pendingIcon from "../assets/pending.svg";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Task({ task, setTasks }: Props) {
  async function toggleDoneStatus() {
    if (Date.now() - task.updatedAt.getTime() < 2000) {
      return toast.loading(
        "Por favor, espere alguns segundos antes de mudar o estado desta tarefa novamente."
      );
    }

    await api
      .put("/tasks/update", {
        id: task.id,
        done: !task.done,
      })
      .then((response) => {
        setTasks((prevTasks) => [
          ...prevTasks.map((prevTask) => {
            if (prevTask.id === task.id) {
              return response.data;
            }

            return prevTask;
          }),
        ]);
      });
  }

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
        <small className="mt-3">
          Criada em{" "}
          {task.createdAt.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>

        <small>
          {task.done ? "Concluída em " : "Pendente desde "}
          {task.updatedAt.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>

        <div
          className="flex items-center mt-3 cursor-pointer group"
          onClick={toggleDoneStatus}
        >
          <img
            src={task.done ? doneIcon : pendingIcon}
            className="size-5 mr-[6px] md:size-6"
          />
          <p className="text-sm md:text-md group-hover:underline">
            {task.done ? "Tarefa concluída" : "Marcar como concluída"}
          </p>
        </div>
      </div>
    </div>
  );
}
