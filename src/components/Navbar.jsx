import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

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
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-dm font-semibold leading-6 text-gray-900"
          >
            Início
          </Link>
          {/* CONDICIONAIS DE USER */}

          {isLoggedIn === false && (
            <Link
              to="/login"
              className="text-dm font-semibold leading-6 text-gray-900"
            >
              Cadastrar Vaga
            </Link>
          )}
          {isLoggedIn === true && (
            <>
              {role === "BUSINESS" && (
                <>
                  <Link
                    to="/business/criar-vaga"
                    className="text-dm font-semibold leading-6 text-gray-900"
                  >
                    Cadastrar Vaga
                  </Link>
                  <Link
                    to="/business/jobs-list"
                    className="text-dm font-semibold leading-6 text-gray-900"
                  >
                    Minhas Vagas
                  </Link>
                </>
              )}
            </>
          )}

          <Link
            to="https://api.whatsapp.com/send?phone=5547997841432&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20portal%20Vagasdaqui%20e%20a%20minha%20d%C3%BAvida%20%C3%A9:%20" target="_blank"
            className="text-dm font-semibold leading-6 text-gray-900"
          >
            Contato
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <p>Entrar</p>
              </Link>
              <Link
                to="/signup"
                className="text-sm font-semibold leading-6 text-white bg-blue-900 rounded-md px-4 py-2"
              >
                Cadastre-se <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
          {isLoggedIn === true && (
            <>
              {role === "BUSINESS" && (
                <Link
                  to="/profile-business"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Perfil
                </Link>
              )}
              {role === "USER" && (
                <>
                
                <Link
                  to="/minhas-candidaturas"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Minhas Candidaturas
                </Link>
                <Link
                to="/meu-curriculo"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Meu CurrÍculo
              </Link>
              <Link
                  to="/profile"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Perfil
                </Link>
                </>
              )}
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
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Início
                </Link>
                {isLoggedIn === true && (
                  <div className="flex flex-row">
                    {role === "BUSINESS" && (
                      <div className="flex flex-col gap-4">
                        <Link
                          to="/business/criar-vaga"
                          className="text-dm font-semibold leading-6 text-blue-900"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Cadastrar Vaga
                        </Link>
                        <Link
                          to="/business/jobs-list"
                          className="text-dm font-semibold leading-6 text-blue-900"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Minhas Vagas
                        </Link>
                      </div>
                    )}
                    {role === "USER" && (
                      <Link
                        to="/profile"
                        className="text-dm font-semibold leading-6 text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Minhas Candidaturas
                      </Link>
                    )}
                  </div>
                )}

                {/* login false */}
                {isLoggedIn === false && (
                  <>
                    <Link
                      to="/login"
                      className="text-dm font-semibold leading-6 text-blue-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cadastrar uma Vaga
                    </Link>
                  </>
                )}
                <Link
                  to="https://api.whatsapp.com/send?phone=5547997841432&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20portal%20Vagasdaqui%20e%20a%20minha%20d%C3%BAvida%20%C3%A9:%20" target="_blank"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
              <div className="py-6">
                {isLoggedIn === false && (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-semibold leading-6 text-white bg-blue-900 rounded-md px-4 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Entrar <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="-mx-3 block rounded-lg px-3 py-2.5 underline leading-7 text-gray-600 italic hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cadastre-se
                    </Link>
                  </>
                )}
                {isLoggedIn === true && (
                  <>
                    {role === "BUSINESS" && (
                      <Link
                        to="/profile-business"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Perfil
                      </Link>
                    )}
                    {role === "USER" && (
                      <Link
                        to="/profile"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Perfil
                      </Link>
                    )}
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
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
}
