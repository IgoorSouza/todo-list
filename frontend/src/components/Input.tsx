import show from "../assets/show.svg";
import hide from "../assets/hide.svg";
import { useState } from "react";

interface Props {
  label: string;
  type: string;
  required?: boolean;
}

export default function Input({ label, type, required }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (type === "password") {
    return (
      <div className="flex flex-col mb-2">
        <label htmlFor="password" className="md:text-lg">
          Senha
        </label>
        <div className="flex justify-between rounded-md overflow-hidden bg-slate-400">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-[85%] p-1 outline-none text-slate-600 md:w-[90%] md:p-2"
          />
          <div className="flex justify-center items-center w-[15%] md:w-[10%]">
            <img
              src={showPassword ? show : hide}
              className="w-2/3"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={label} className="md:text-lg">
        {label}
      </label>
      <input
        id={label}
        type={type}
        required={required}
        className="p-1 rounded-md outline-none text-slate-600 md:p-2"
      />
    </div>
  );
}
