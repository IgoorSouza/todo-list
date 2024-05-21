import { useEffect, useState } from "react";
import api from "./services/axios";
import toast from "react-hot-toast";
import AuthForm from "./components/Auth/AuthForm";
import Header from "./components/Header";
import Task from "./components/Task/Task";
import TaskForm from "./components/Task/TaskForm";

interface User {
  name: string;
  token: string;
}

interface Tasks {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Tasks[]>([] as Tasks[]);
  const [authForm, setAuthForm] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuthData = localStorage.getItem("AuthData");

    if (getAuthData) {
      const authData = getAuthData && JSON.parse(getAuthData);
      setUser(authData);
      api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
    }
  }, []);

  useEffect(() => {
    async function getTasks() {
      try {
        await api.get("/tasks").then((response) => {
          setTasks(response.data);
          setLoading(false);
        });
      } catch (error) {
        toast.error(
          "Ocorreu um erro ao buscar suas tarefas. Por favor, recarregue a página."
        );
      }
    }

    if (user) getTasks();
  }, [user]);

  if (authForm) {
    return (
      <AuthForm type={authForm} setAuthForm={setAuthForm} setUser={setUser} />
    );
  }

  if (taskForm) {
    return <TaskForm setTasks={setTasks} setTaskForm={setTaskForm} />;
  }

  return (
    <div className="max-w-[1280px] mx-auto h-screen px-[5%] pt-5 text-white">
      <Header
        username={user?.name}
        setUser={setUser}
        setAuthForm={setAuthForm}
      />

      {user ? (
        <>
          <button
            className="self-start px-3 py-2 mt-8 font-bold rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90 md:text-xl"
            onClick={() => setTaskForm(true)}
          >
            Adicionar tarefa
          </button>

          <div className="flex flex-wrap max-sm:justify-center gap-5 py-8">
            {loading ? (
              <h1 className="text-xl md:text-2xl">Carregando tarefas...</h1>
            ) : tasks.length > 0 ? (
              tasks.map((task) => {
                task.createdAt = new Date(task.createdAt);
                task.updatedAt = new Date(task.updatedAt);

                return <Task task={task} setTasks={setTasks} key={task.id} />;
              })
            ) : (
              <h1 className="text-center text-lg md:text-2xl">
                Você ainda não registrou nenhuma tarefa.
              </h1>
            )}
          </div>
        </>
      ) : (
        <h1 className="mt-[8%] text-center text-lg md:text-2xl">
          Por favor, crie uma conta ou faça login para utilizar a lista.
        </h1>
      )}
    </div>
  );
}
