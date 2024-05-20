import { useState } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Task from "./components/Task";

interface User {
  name: string;
  token: string;
}

const tasks = [
  {
    id: 1,
    title: "Lavar a louça",
    done: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    id: 2,
    title: "Fazer ajustes no site",
    description: "Mudar a cor do fundo",
    done: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
];

export default function App() {
  const [user, setUser] = useState<User | null>({
    name: "Igor",
    token: "",
  });
  const [modal, setModal] = useState<string | null>(null);

  if (modal) {
    return <Modal modal={modal} setModal={setModal} />;
  }

  return (
    <div className="h-screen px-[5%] pt-5 text-white">
      <Header
        username={user?.name}
        setUser={setUser}
        setModal={setModal}
      />

      {user ? (
        <>
          <button
            className="self-start px-3 py-2 mt-8 font-bold rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90 md:text-xl"
            onClick={() => setModal("addTask")}
          >
            Adicionar tarefa
          </button>

          <div className="flex flex-wrap max-sm:justify-center gap-5 py-8">
            {tasks.map((task) => {
              return <Task task={task} key={task.id} />;
            })}
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
