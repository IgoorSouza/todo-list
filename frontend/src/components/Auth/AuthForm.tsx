import { useState } from "react";
import api from "../../services/axios";
import toast from "react-hot-toast";
import Form from "../Form";
import AuthInput from "./AuthInput";
import { AxiosError } from "axios";

interface User {
  name: string;
  token: string;
}

interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface Props {
  type: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthForm: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AuthForm({ type, setUser, setAuthForm }: Props) {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  async function login(event?: React.FormEvent) {
    event && event.preventDefault();

    try {
      await api.post("/users/login", userData).then((response) => {
        setUser(response.data);
        setAuthForm(null);

        localStorage.setItem("AuthData", JSON.stringify(response.data));
        api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

        toast.success("Login realizado com sucesso!");
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return toast.error("Senha incorreta.");
      }

      if (error instanceof AxiosError && error.response?.status === 404) {
        return toast.error(
          "Não existem usuários correspondentes ao email informado."
        );
      }

      toast.error(
        "Erro ao realizar login. Recarregue a página e tente novamente."
      );
    }
  }

  async function register(event: React.FormEvent) {
    event.preventDefault();

    try {
      await api.post("/users/create", userData).then(() => {
        toast.success("Conta criada com sucesso!");
        login();
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return toast.error(
          "O email informado já foi utilizado por outro usuário."
        );
      }

      toast.error(
        "Erro ao criar conta. Recarregue a página e tente novamente."
      );
    }
  }

  return (
    <Form
      text={type === "register" ? "Criar conta" : "Entrar"}
      onSubmit={type === "register" ? register : login}
      setAuthForm={setAuthForm}
    >
      {type === "register" && (
        <AuthInput
          label="Nome"
          type="text"
          required={true}
          setUserData={setUserData}
        />
      )}
      <AuthInput
        label="Email"
        type="email"
        required={true}
        setUserData={setUserData}
      />
      <AuthInput
        label="Senha"
        type="password"
        required={true}
        setUserData={setUserData}
      />
    </Form>
  );
}
