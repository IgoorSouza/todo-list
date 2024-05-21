import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/axios";
import Form from "../Form";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  setTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Tasks {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskData {
  title: string;
  description?: string;
}

export default function TaskForm({ setTasks, setTaskForm }: Props) {
  const [taskData, setTaskData] = useState<TaskData>({} as TaskData);

  async function createTask(event: React.FormEvent) {
    event.preventDefault();

    try {
      await api.post("/tasks/create", taskData).then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTaskForm(false);
      });
    } catch (error) {
      toast.error(
        "Erro ao criar tarefa. Recarregue a página e tente novamente."
      );
    }
  }

  return (
    <Form
      text="Adicionar tarefa"
      onSubmit={createTask}
      setTaskForm={setTaskForm}
    >
      <div className="flex flex-col mb-2">
        <label htmlFor="title" className="md:text-lg">
          Título
        </label>
        <input
          id="title"
          type="text"
          required={true}
          className="p-1 rounded-md outline-none text-slate-600 md:p-2"
          onChange={(event) =>
            setTaskData((prevTaskData) => ({
              ...prevTaskData,
              title: event.target.value,
            }))
          }
        />
      </div>

      <label className="md:text-lg">Descrição (opcional)</label>
      <textarea
        className="p-1 mb-2 rounded-md outline-none resize-none text-slate-600 md:p-2"
        onChange={(event) =>
          setTaskData((prevTaskData) => ({
            ...prevTaskData,
            description: event.target.value,
          }))
        }
      />
    </Form>
  );
}
