import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import api from "../axios/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response;

      if (userType === "user") {
        response = await api.post("/user/login", form);
      }

      if (userType === "business") {
        response = await api.post("/business/login", form);
      }

      const token = response.data.token;
      const userId = response.data.user._id;
      const userRole = response.data.user.role;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);

      if (userType === "user") navigate("/profile");
      if (userType === "business") navigate("/profile-business");
    } catch (error) {
      toast.error("Erro: Senha ou usuário inválido!");
    }
  }

  return (
    <div className="mt-10">
      <div className="flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-sm bg-white p-8">
          <img
            className="max-w-[200px] hidden sm:block mx-auto"
            src={Logo}
            alt="Vagas Daqui"
          />
          <h2 className="mt-8 text-center text-2xl font-semibold leading-9 text-blue-900">
            Acesse sua conta
          </h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Usuário
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  onChange={handleRadio}
                  checked={userType === "user"}
                  className="ml-2"
                />
              </label>

              <label className="block text-sm font-medium leading-6 text-gray-900">
                Empresa
                <input
                  type="radio"
                  name="userType"
                  value="business"
                  onChange={handleRadio}
                  checked={userType === "business"}
                  className="ml-2"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-900"
              >
                Email
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
              >
                Entrar
              </button>
            </div>
          </form>
          <Toaster />

          <p className="mt-10 text-center text-gray-500 text-xs">
            Problemas com login?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-blue-900 hover:text-blue-700"
            >
              Entre em contato com a gente.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
