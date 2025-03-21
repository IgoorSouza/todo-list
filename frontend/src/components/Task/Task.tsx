import { useState } from "react";
import api from "../../services/axios";
import toast from "react-hot-toast";
import doneIcon from "../../assets/done.svg";
import pendingIcon from "../../assets/pending.svg";
import deleteIcon from "../../assets/delete.svg";

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
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  async function toggleDoneStatus() {
    try {
      await api
        .put(`/tasks/${task.id}/conclude`, {
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
    } catch (error) {
      toast.error(
        "Erro ao mudar o estado da aplicação. Recarregue a página e tente novamente."
      );
    }
  }

  async function deleteTask(taskId: number) {
    try {
      await api.delete(`/tasks/${taskId}/delete`).then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((prevTask) => prevTask.id !== taskId)
        );
      });
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao remover a tarefa. Recarregue a página e tente novamente."
      );
    }
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
        <p className="mt-1 leading-5 md:text-lg md:leading-6">
          {task.description}
        </p>
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

        <div className="flex justify-between items-center mt-3 cursor-pointer">
          <div className="flex items-center group" onClick={toggleDoneStatus}>
            <img
              src={task.done ? doneIcon : pendingIcon}
              className="size-5 mr-[6px] md:size-6"
            />
            <p className="text-sm md:text-md group-hover:underline">
              {task.done ? "Tarefa concluída" : "Marcar como concluída"}
            </p>
          </div>

          <img
            src={deleteIcon}
            className="size-5 cursor-pointer md:size-6"
            onClick={() => {
              setDeleteConfirmation(!deleteConfirmation);

              if (!deleteConfirmation) {
                setTimeout(() => {
                  setDeleteConfirmation(false);
                }, 8000);
              }
            }}
          />
        </div>

        {deleteConfirmation && (
          <div className="mt-2 text-center text-sm md:text-md">
            <p>Deseja remover essa tarefa?</p>

            <button
              className="px-3 py-1 mt-1 mr-2 rounded-lg bg-red-500"
              onClick={() => deleteTask(task.id)}
            >
              Sim
            </button>
            <button
              className="px-3 py-1 mt-1 rounded-lg bg-[#25a1ff]"
              onClick={() => setDeleteConfirmation(false)}
            >
              Não
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
