import close from "../assets/close.svg";

interface Props {
  text: string;
  onSubmit: React.FormEventHandler;
  setAuthForm: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
}

export default function Form({ text, onSubmit, setAuthForm, children }: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col w-[80%] max-w-[500px] p-4 rounded-xl text-white bg-slate-600"
        onSubmit={onSubmit}
      >
        <img
          src={close}
          className="cursor-pointer self-end"
          onClick={() => setAuthForm(null)}
        />

        <h1 className="mb-2 font-bold text-2xl md:text-3xl text-center">
          {text}
        </h1>

        {children}

        <button
          type="submit"
          className="w-1/2 py-2 mx-auto mt-2 rounded-lg font-semibold bg-[#25a1ff] cursor-pointer hover:opacity-90 md:mt-3 md:text-xl"
        >
          {text}
        </button>
      </form>
    </div>
  );
}
