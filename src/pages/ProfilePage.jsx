import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import dateFormater from "../util/dateFormater.jsx";
import VagasCandidatadas from "./UserCandidatePage.jsx";
import Curriculo from "./UserCurriculumPage.jsx";
import {
  UserIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(true);
  const [formProfile, setFormProfile] = useState({
    name: "",
    phone: "",
    email: "",
    newPassword: "",
    password: "",
  });
  const [reload, setReload] = useState(false);

  const id_user = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setFormProfile(response.data); //carrega os campos ja preenchidos
      } catch (error) {
        console.log(error);
      }
    }

    getProfile(); //invocar
  }, [reload]);
  //handlechange do form de dedição do profile
  function handleChangeProfile(e) {
    setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  }
  //handle do logout
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  //classe do tabs
  function classNames(...classes) {
    //tabs
    return classes.filter(Boolean).join(" ");
  }

  //sbmit profile form
  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      const response = await api.put("/user/edit", formProfile);

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnapply(id_job) {
    try {
      await api.post(`/job/unapply/${id_job}`);

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex w-full mt-10 border rounded-md">
        {/*computador--->*/}
        <div className="hidden lg:flex w-1/4  p-2 bg-blue-900 rounded-l-md  ">
          <div className="flex  w-full">
            <div className="flex lg:flex-col w-full">
              <h1 className="ml-2 font-semibold text-lg text-white">
                Sua Área Restrita
              </h1>
              <div className="w-[100%] border border-white"></div>
              <div
                className="flex gap-2 lg:hover:cursor-pointer lg:mt-10 hover:bg-white hover:rounded-sm px-4 py-2 w-[100%] text-white hover:text-blue-950"
                onClick={() => setShow(!show)}
              >
                <UserIcon className="w-6 h-6" /> <p>Meus dados</p>
              </div>
              <div className="flex gap-2 lg:hover:cursor-pointer hover:bg-white hover:rounded-sm px-4 py-2 w-[100%] text-white hover:text-blue-950">
                <DocumentTextIcon className="w-6 h-6" />
                <p>Currículo</p>
              </div>
              <div className="flex gap-2 lg:hover:cursor-pointer hover:bg-white hover:rounded-sm px-4 py-2 w-[100%] text-white hover:text-blue-950">
                <CursorArrowRaysIcon className="w-6 h-6" />
                <p>Minhas Candidaturas</p>
              </div>
              <div className="flex gap-2 lg:hover:cursor-pointer hover:bg-white hover:rounded-sm px-4 py-2 w-[100%] text-white hover:text-blue-950">
                <LockClosedIcon className="w-6 h-6" />
                <p>Minha Senha</p>
              </div>
              <div>
                {/*}
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full py-2 px-4 font-semibold text-white bg-amber-500 hover:bg-red-700 rounded-lg focus:ring focus:ring-blue-300"
                >
                  Sair
                </button>
  */}
              </div>
            </div>
            <div></div>
          </div>
        </div>
        {/*<---computador*/}
        {/*mobile--->*/}
        

        {/*<---mobile*/}

        <div className="w-3/4 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1>Olá {user.name}! Bem vindo(a) ao seu perfil.</h1>
              <h2>
                Aqui você poderá acompanhar as suas candidaturas, editar seu
                currículo e informações pessoais.
              </h2>
            </div>
          </div>
          <div className="flex my-6">
            {show && (
              <form onSubmit={handleSubmitProfile} className=" w-full">
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-gray-600 font-semibold -mb-2">
                    Email:
                  </label>
                  <input
                    name="telefone"
                    placeholder={user.email}
                    value={formProfile.email}
                    onChange={handleChangeProfile}
                    className="flex w-full p-2 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-gray-600 font-semibold -mb-2">
                    Nome completo:
                  </label>
                  <input
                    name="name"
                    value={formProfile.name}
                    onChange={handleChangeProfile}
                    className="w-full p-2 mt-1 shadow-sm rounded-md border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-gray-600 font-semibold -mb-2">
                    Telefone:
                  </label>
                  <input
                    name="telefone"
                    placeholder={user.telefone}
                    value={formProfile.telefone}
                    onChange={handleChangeProfile}
                    className="w-full p-2 mt-1 shadow-sm rounded-md  border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-gray-600 font-semibold -mb-2">
                    Senha atual:
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formProfile.password}
                    onChange={handleChangeProfile}
                    className="w-full p-2 mt-1 shadow-sm rounded-md border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <label className="text-gray-600 font-semibold -mb-2">
                    Nova senha:
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formProfile.password}
                    onChange={handleChangeProfile}
                    className="w-full p-2 mt-1 shadow-sm rounded-md border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-blue-700 rounded-lg focus:ring focus:ring-blue-300"
                >
                  Salvar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
