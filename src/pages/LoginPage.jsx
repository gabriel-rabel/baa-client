import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import api from "../axios/api";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importe os ícones de olho aberto e fechado

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
      console.log(response)
      console.log("Fez o login ate aqui")

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
      <div className="flex lg:min-w-[384px] justify-center items-center md:border lg:border rounded-lg">
        <div className="w-full max-w-sm p-8">
          <img
            className="max-w-[150px] hidden sm:block mx-auto"
            src={Logo}
            alt="Vagas Daqui"
          />
          <h2 className="mt-8 text-center text-2xl font-semibold leading-9 text-blue-900">
            Acesse sua conta
          </h2>
          <h3 className="text-center text-1xl text-gray-600">
            Digite seu e-mail e senha
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
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                />
                <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                  Email
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg">
              <div className="relative bg-inherit">
                <input
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Senha"
                  type={showPassword ? "text" : "password"} // Use 'text' ou 'password' com base no estado showPassword
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
                  )}{" "}
                  {/* Mostra o ícone apropriado com base no estado showPassword */}
                </button>
                <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                  Senha
                </label>
              </div>
            </div>


            <div className="flex items-center justify-between">
              <div className="">
                <a
                  href="/signup"
                  className="text-sm text-blue-950 hover:text-blue-700 font-semibold w-1/3"
                >
                  Criar conta
                </a>
              </div>
              <button
                type="submit"
                className="w-1/3 justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
              >
                Entrar
              </button>
            </div>
          </form>
          <Toaster />

          <p className="mt-10 text-center text-gray-500 text-xs">
            Esqueceu sua senha?{" "}
            <a
              href="/forgot-password"
              className="font-semibold leading-6 text-blue-900 hover:text-blue-700"
            >
              Recupere a sua senha aqui.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
