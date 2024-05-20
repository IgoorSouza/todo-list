import Input from "./Input";

interface Props {
  modal: string | null;
}

export default function Form({ modal }: Props) {
  if (modal === "register" || modal === "login") {
    return (
      <>
        {modal === "register" && (
          <Input label="Nome" type="text" required={true} />
        )}

        <Input label="Email" type="email" required={true} />
        <Input label="Senha" type="password" required={true} />
      </>
    );
  }

  return <div></div>;
}
