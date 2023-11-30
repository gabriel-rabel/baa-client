import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jseu from "js-encoding-utils";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importe os ícones de olho aberto e fechado
import api from "../../axios/api";

export default function UserResetPassword() {
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const encodedToken = params.token;
  const encodedTokenString = jseu.encoder.decodeBase64Url(encodedToken);
  const decodedTokenArrayBuffer = new TextEncoder().encode(encodedTokenString);
  const token = new TextDecoder().decode(decodedTokenArrayBuffer);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    async function validateToken() {
      try {
        if (!token) {
          setValidToken(false);
          setIsLoading(false);
          return;
        }

        const response = await api.get(
          `/user/reset-password/valid-token/${token}`
        );

        if (response.status === 200) {
          // Token é válido
          setValidToken(true);
          setIsLoading(false);
        } else if (response.status === 400) {
          // Token não é mais válido
          setValidToken(false);
          setIsLoading(false);
        } else {
          // Outro erro
          setValidToken(false);
          setIsLoading(false);
          setError("Erro de validção. Por favor, tente novamente mais tarde.");
        }
      } catch (error) {
        console.error(error);
        setValidToken(false);
        setIsLoading(false);
        setError("Erro  de validação. Por favor, tente novamente mais tarde.");
      }
    }

    validateToken();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (newPassword === newPassword2) {
        await api.put(`/user/new-password/${token}`, {
          newPassword: newPassword,
        });

        // Redirecionar para a página de login (ou qualquer outra página desejada)
        toast.success("Senha alterada com sucesso!");
        navigate("/login");
      } else {
        alert("As senhas não coincidem");
      }
    } catch (e) {
      alert("Algo deu errado");
    }
  }

  return (
    <div className="mt-10">
      <div className="">
        {error && <p>{error}</p>}

        {!isLoading && !validToken && (
          <div>
            <p>
              Seu link de recuperação de senha não é mais válido, solicite
              outro.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center md:border lg:border rounded-lg">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center items-center">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && validToken && (
          <div className="mt-10">
            <div className="flex lg:min-w-[384px] justify-center items-center md:border lg:border rounded-lg">
              <div className="w-full max-w-sm p-8">
                <img
                  className="max-w-[150px] hidden sm:block mx-auto"
                  src={logo}
                  alt="logo"
                />
                  <h2 className="mt-8 text-center text-2xl font-semibold leading-9 text-blue-900">
                    Recuperar sua senha
                  </h2>
                  <h3 className="text-center text-1xl">
                    Cadastre uma nova senha
                  </h3>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="bg-white rounded-lg">
                    <div className="relative bg-inherit">
                      <input
                        type={showPassword ? "text" : "password"} // Use 'text' ou 'password' com base no estado showPassword
                        id="newPassword"
                        autoComplete="new-password"
                        placeholder="Senha"
                        required={true}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                      <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                        Senha
                      </label>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg">
                    <div className="relative bg-inherit">
                      <input
                        type={showPassword ? "text" : "password"} // Use 'text' ou 'password' com base no estado showPassword
                        id="newPassword2"
                        autoComplete="new-password2"
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                        className="peer py-2 bg-transparent text-sm w-full rounded-md  placeholder-transparent ring-0 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-blue-600"
                        placeholder="Senha"
                      />
                      <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-blue-700 peer-focus:text-xs transition-all">
                        Repetir Senha
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div>
                    <p className="text-xs leading-3 text-gray-400">
                    A senha deve conter pelo menos uma letra
                    maiúscula {'('}A-Z{')'}, um número {'('}0-9{')'} e um caractere especial @#$%&.
                  </p>
                    </div>
                    <div>
                    <button
                      type="submit"
                      className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      Redefinir
                    </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
