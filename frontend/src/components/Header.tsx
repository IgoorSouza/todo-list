import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import profileIcon from "../assets/profile.svg";
import logoutIcon from "../assets/logout.svg";

interface User {
  name: string;
  token: string;
}

interface Props {
  username: string | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthForm: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Header({ username, setUser, setAuthForm }: Props) {
  return (
    <header className="flex justify-between items-center mx-auto">
      <h1 className="font-bold text-xl md:text-3xl">Lista de Tarefas</h1>

      {username ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex">
            <p className="mr-2 text-lg md:text-2xl break-words">
              {username.split(" ")[0]}
            </p>
            <img src={profileIcon} className="size-7 md:size-9" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex w-24 px-3 py-2 mt-1 rounded-lg bg-slate-500 cursor-pointer hover:bg-slate-400 outline-none"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("AuthData");
              }}
            >
              <img src={logoutIcon} className="mr-[6px]" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-col font-bold md:flex-row md:text-lg">
          <button
            className="px-3 py-2 max-md:mb-2 rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90 md:mr-3"
            onClick={() => setAuthForm("login")}
          >
            Entrar
          </button>

          <button
            className="px-3 py-2 rounded-lg bg-[#25a1ff] cursor-pointer hover:opacity-90"
            onClick={() => setAuthForm("register")}
          >
            Criar conta
          </button>
        </div>
      )}
    </header>
  );
}
