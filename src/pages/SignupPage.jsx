import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [userType, setUserType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !form.password.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
        )
      ) {
        toast.error(
          "A senha deve conter pelo menos uma letra maiúscula e um caractere especial ($, *, &, @ ou #)."
        );
        return;
      }

      if (userType === "user") {
        await api.post("/user/signup", { ...form });
      } else if (userType === "business") {
        await api.post("/business/signup", { ...form });
      }

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Se o servidor retornar um erro 400, exiba a mensagem de erro em um toast
        toast.error(error.response.data.error);
      } else {
        // Trate outros erros aqui
        toast.error("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <div className="mt-10">
      <div className="flex lg:min-w-[384px] justify-center items-center md:border lg:border rounded-lg">
        <div className="w-full max-w-sm p-8">
          <img
            className="max-w-[150px] hidden sm:block mx-auto"
            src={Logo}
            alt="Vagas Daqui"
          />
          <h2 className="mt-8 text-center text-2xl font-semibold leading-9 text-blue-900">
            Criar Conta
          </h2>
          <h3 className="text-center text-1xl text-gray-600">
            Digite seus dados e uma senha
          </h3>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  onChange={handleRadio}
                  checked={userType === "user"}
                  className="text-amber-400"
                />
                <label className="block text-sm text-blue-950 font-semibold">
                  Usuário
                </label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="userType"
                  value="business"
                  onChange={handleRadio}
                  checked={userType === "business"}
                  className="text-amber-400"
                />
                <label className="flex text-sm text-blue-950 font-semibold">
                  Empresa
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg">
              <div className="relative bg-inherit">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="Nome Completo"
                  value={form.name}
                  onChange={handleChange}
                  className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                />
                <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                  Nome Completo
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg">
              <div className="relative bg-inherit">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="E-mail"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                />
                <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                  E-mail
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg">
              <div className="relative bg-inherit">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="phone"
                  placeholder="Telefone"
                  value={form.phone}
                  onChange={handleChange}
                  className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                />
                <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                  Telefone
                </label>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    id="password"
                    name="password"
                    placeholder="Senha"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-blue-950" />
                    ) : (
                      <FaEye className="text-blue-950" />
                    )}
                  </button>
                  <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                    Senha
                  </label>
                </div>
                <div className="mt-2">
                  <p className="text-xs leading-3 text-gray-400">
                    A senha deve conter pelo menos uma letra
                    maiúscula {'('}A-Z{')'}, um número {'('}0-9{')'} e um caractere especial @#$%&.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex  justify-center items-center gap-3 w-2/3">
                <input required type="checkbox" className="form-checkbox" />
                <p className="inline-flex items-center text-xs leading-3">
                  Concordo com os termos de uso e a política de privacidade.
                </p>
              </div>
              <div className="w-1/3">
                <button
                  type="submit"
                  className="w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </form>
          <Toaster />

          <p className="mt-10 text-center text-gray-500 text-xs">
            Problemas com cadastro?{" "}
            <a
              href="https://api.whatsapp.com/send?phone=5547997841432&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20portal%20Vagasdaqui%20e%20a%20minha%20d%C3%BAvida%20%C3%A9:%20"
              target="_blank"
              className="font-semibold leading-6 text-blue-900 hover:text-blue-700"
            >
              Entre em contato conosco.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
