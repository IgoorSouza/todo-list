import { useState } from "react";
import profile from "./assets/profile.svg";
import done from "./assets/done.svg";
import pending from "./assets/pending.svg";

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

  return (
    <div className="h-screen px-[5%] pt-5 text-white">
      <header className="flex justify-between items-center mx-auto">
        <h1 className="font-bold text-xl md:text-3xl">Lista de Tarefas</h1>

        {user ? (
          <div className="flex items-center text-white">
            <p className="mr-2 text-lg md:text-2xl break-words">
              {user.name.split(" ")[0]}
            </p>
            <img src={profile} className="size-7 md:size-9" />
          </div>
        ) : (
          <div className="flex flex-col font-bold md:flex-row md:text-lg">
            <button className="px-3 py-2 max-md:mb-2 rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90 md:mr-3">
              Entrar
            </button>

            <button className="px-3 py-2 rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90">
              Criar conta
            </button>
          </div>
        )}
      </header>

      {user ? (
        <>
          <button className="self-start px-3 py-2 mt-8 font-bold rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90 md:text-xl">
            Adicionar tarefa
          </button>

          <div className="flex flex-wrap max-sm:justify-center gap-5 py-8">
            {tasks.map((task) => {
              return (
                <div
                  className={`w-64 flex flex-col p-4 bg-slate-700 rounded-lg break-words md:w-72 ${
                    task.done && "opacity-60"
                  }`}
                  key={task.id}
                >
                  <h2 className="font-bold text-xl md:text-2xl">
                    {task.title}
                  </h2>

                  {task.description && (
                    <p className="md:text-lg mt-1">{task.description}</p>
                  )}

                  <div className="flex flex-col justify-end h-full">
                    <small className="mt-3">Criada em {task.createdAt}</small>
                    <small>Última mudança em {task.createdAt}</small>
                    <div className="flex items-center mt-3">
                      <img
                        src={task.done ? done : pending}
                        className="size-5 mr-[6px] md:size-6"
                      />
                      <p className="text-sm md:text-md">
                        {task.done
                          ? "Tarefa concluída"
                          : "Marcar como concluída"}
                      </p>
                    </div>
                  </div>
                </div>
              );
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
