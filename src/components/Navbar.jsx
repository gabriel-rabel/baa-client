import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    {
      isLoggedIn === true && setMobileMenuOpen(false);
    }
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    navigate("/");
  }

  function handleRedirectLogin(e) {
    e.preventDefault();
    toast.error("É necessário estar logado para cadastrar uma vaga!");
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">VagasDaqui - Vagas de Emprego</span>
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-950 hover:text-blue-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/*Menu Computador*/}
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-dm font-semibold leading-6 text-blue-950 hover:text-blue-700"
          >
            Início
          </Link>
          {/* CONDICIONAIS DE USER */}

          {isLoggedIn === false && (
            <button
              onClick={handleRedirectLogin}
              className="text-dm font-semibold leading-6 text-blue-950 hover:text-blue-700"
            >
              Cadastrar Vaga
            </button>
          )}
          {isLoggedIn === true && (
            <>
              {role === "BUSINESS" && (
                <>
                  <Link
                    to="/business/criar-vaga"
                    className="font-semibold leading-6 text-blue-950 hover:text-blue-700"
                  >
                    Cadastrar Vaga
                  </Link>
                  <Link
                    to="/business/jobs-list"
                    className="font-semibold leading-6 text-blue-950 hover:text-blue-700"
                  >
                    Minhas Vagas
                  </Link>
                </>
              )}
            </>
          )}

          <Link
            to="https://api.whatsapp.com/send?phone=5547997841432&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20portal%20Vagasdaqui%20e%20a%20minha%20d%C3%BAvida%20%C3%A9:%20"
            target="_blank"
            className="font-semibold leading-6 text-blue-950 hover:text-blue-700"
          >
            Contato
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="text-dm font-semibold leading-6 text-blue-950 hover:text-blue-700"
              >
                <p>Entrar</p>
              </Link>
              <Link
                to="/signup"
                className=" font-semibold leading-6 text-white bg-blue-900 hover:bg-blue-700 rounded-md px-4 py-2"
              >
                Cadastre-se <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
          {isLoggedIn === true && (
            <>
              {role === "USER" && (
                <>
                  <Link
                    to="/minhas-candidaturas"
                    className="text-blue-950 hover:text-blue-700 px-3 py-2 rounded-md  font-medium"
                  >
                    Minhas Candidaturas
                  </Link>
                  <Link
                    to="/meu-curriculo"
                    className="text-blue-950 hover:text-blue-700 px-3 py-2 rounded-md  font-medium"
                  >
                    Meu Currículo
                  </Link>
                  <Link
                    to="/profile"
                    className="flex gap-1 items-center text-blue-950 hover:text-blue-700  p-2 rounded-md  font-medium"
                  >
                    <UserIcon className="w-4 h-4" />
                    Minha Conta
                  </Link>
                </>
              )}
              <Link
                to="/profile-business"
                className="flex items-center gap-1 font-semibold leading-6 text-blue-950 hover:text-blue-700"
              >
                <UserIcon className="w-4 h-4" />
                Minha Conta
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-900 hover:bg-blue-700 text-white rounded-md p-1 w-20"
              >
                {" "}
                Sair
              </button>
            </>
          )}
        </div>
      </nav>
      {/*<--Menu Computador*/}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">VagasDaqui - Vagas de Emprego</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* MOBILE MENU*/}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col justify-left gap-2 space-y-2 py-6">
                <Link
                  to="/"
                  className=" font-semibold leading-6 text-blue-950 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Início
                </Link>
                {isLoggedIn === true && (
                  <div className="flex">
                    {role === "BUSINESS" && (
                      <div className="flex flex-col gap-4">
                        <Link
                          to="/business/criar-vaga"
                          className=" font-semibold leading-6 text-blue-950 hover:text-blue-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Cadastrar Vaga
                        </Link>
                        <Link
                          to="/business/jobs-list"
                          className="text-dm mb-3 font-semibold leading-6 text-blue-950 hover:text-blue-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Minhas Vagas
                        </Link>
                      </div>
                    )}
                    {role === "USER" && (
                      <div className="flex flex-col gap-4">
                        <Link
                          to="/profile"
                          className=" font-semibold  text-blue-950 hover:text-blue-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Minhas Candidaturas
                        </Link>
                        <Link
                          to="/meu-curriculo"
                          className=" text-blue-950 hover:text-blue-700  rounded-md font-medium"
                        >
                          Meu Currículo
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* login false */}
                {isLoggedIn === false && (
                  <button
                    onClick={handleRedirectLogin}
                    className="self-start  font-semibold text-blue-950 hover:text-blue-700"
                  >
                    Cadastrar Vaga
                  </button>
                )}
                <Link
                  to="https://api.whatsapp.com/send?phone=5547997841432&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20portal%20Vagasdaqui%20e%20a%20minha%20d%C3%BAvida%20%C3%A9:%20"
                  target="_blank"
                  className=" font-semibold text-blue-950 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
              <div className="py-6">
                {isLoggedIn === false && (
                  <div className="flex justify-between">
                    <Link
                      to="/signup"
                      className=" items-center -mx-3 block rounded-lg px-3 underline leading-7 text-gray-600 italic hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cadastre-se
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="justify-center rounded-md bg-blue-900 px-4 py-2   font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                    >
                      Entrar
                    </Link>
                  </div>
                )}
                {isLoggedIn === true && (
                  <div className="flex justify-between">
                    {role === "BUSINESS" && (
                      <Link
                        to="/profile-business"
                        className="flex items-center gap-1  font-semibold leading-6 text-blue-950 hover:text-blue-700 mr-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-4 h-4" /> Minha Conta
                      </Link>
                    )}
                    {role === "USER" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-1  font-semibold leading-6 text-blue-950 hover:text-blue-700 mr-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-4 h-4" /> Minha Conta
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-blue-900 hover:bg-blue-700 text-white rounded-md p-1 w-20"
                    >
                      {" "}
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
}
