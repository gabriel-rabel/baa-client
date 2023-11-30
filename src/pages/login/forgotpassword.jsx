import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import api from "../../axios/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [countdown, setCountdown] = useState(15);

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userType === "user") {
        await api.post(`/user/forgot-password`, {
          email,
        });

        // Enviou o email de recuperação de senha com sucesso para o usuário
        toast.success(
          "Email enviado com o link para resetar a senha para user"
        );
        setShowSuccessMessage(true); // Mostrar a mensagem de sucesso
      } else if (userType === "business") {
        await api.post(`/business/forgot-password`, {
          email,
        });
        // Enviou o email de recuperação de senha com sucesso para a empresa
        toast.success(
          "Email enviado com o link para resetar a senha pra business"
        );
        setShowSuccessMessage(true); // Mostrar a mensagem de sucesso
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showSuccessMessage && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showSuccessMessage, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      // Redirecionar para a página de login após 15 segundos
      // Substitua "/" pelo URL da sua página de login
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <div className="mt-10">
      <div className="flex lg:min-w-[384px] justify-center items-center md:border lg:border rounded-lg">
        <div className="w-full max-w-sm p-8">
          <img
            className="max-w-[150px] hidden sm:block mx-auto"
            src={logo}
            alt="Vagas Daqui"
          />
          {showSuccessMessage ? (
            <div className="flex  flex-col mt-10 w-full gap-8">
              <p className="text-center text-xl text-blue-950 leading-6">
                Pedido realizado com sucesso! Se você possuir cadastro conosco, receberá um e-mail de recuperação. Verifique sua caixa de entrada e
                sua pasta de spam.
              </p>
              <p className="text-center text-1xl">
                Em breve você será redirecionado para a página de inicial em{" "}
                <span className="text-red-700 text-base font-semibold">
                  {countdown}
                </span>{" "}
                segundos...
              </p>
            </div>
          ) : (
            <div>
              <h2 className="mt-8 text-center text-2xl font-semibold leading-9 text-blue-900">
                Recupere sua senha
              </h2>
              <h3 className="text-center text-1xl text-gray-600">
                Digite seu e-mail de recuperação
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
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                      placeholder="Email"
                    />
                    <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                      E-mail
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative  flex justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Redefinir senha
                  </button>
                </div>
              </form>
              <div className="mt-10">
                <p className="text-sm font-thin italic text-gray-400">
                  *Verifique sua caixa de entrada e sua pasta de spam. Caso
                  e-mail não chegue, verifique os dados inseridos e tente
                  novamente.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
