import { FormEvent } from "react";
import close from "../assets/close.svg";
import Form from "./Form";

interface Props {
  modal: string | null;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Modal({ modal, setModal }: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="absolute flex justify-center items-center w-full h-full">
      <form
        className="flex flex-col w-[80%] max-w-[500px] p-4 rounded-xl text-white bg-slate-600"
        onSubmit={handleSubmit}
      >
        <img
          src={close}
          className="cursor-pointer self-end"
          onClick={() => setModal(null)}
        />

        <h1 className="mb-2 font-bold text-2xl md:text-3xl text-center">
          {modal === "login"
            ? "Entrar"
            : modal === "register"
            ? "Criar conta"
            : "Adicionar tarefa"}
        </h1>

        <Form modal={modal} />

        <button
          type="submit"
          className="w-1/2 py-2 mx-auto mt-2 rounded-lg font-semibold bg-[#25a1ff] cursor-pointer hover:opacity-90 md:mt-3 md:text-xl"
        >
          {modal === "login"
            ? "Entrar"
            : modal === "register"
            ? "Criar conta"
            : "Adicionar tarefa"}
        </button>
      </form>
    </div>
  );
}
