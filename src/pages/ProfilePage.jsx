import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import dateFormater from "../util/dateFormater.jsx";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [formProfile, setFormProfile] = useState({
    name: "",
    telefone: "",
    curriculo: "",
    email: "",
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
      await api.post(`/job/unapply/${id_job}`)

      setReload(!reload);
      
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className="mt-5">
      <div className="m-5">
        <div className="">
          <h3>
            Bem vindo,{" "}
            <span className="font-semibold">
              {user.name && user.name.toUpperCase()}
            </span>
          </h3>
        </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-900 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            Perfil
          </Tab>
          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-900 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            Currículo
          </Tab>
          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-900 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            Candidaturas
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className=" flex rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2">
            <form onSubmit={handleSubmitProfile} className="w-2/3">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">Telefone:</label>
                <input
                  name="telefone"
                  placeholder={user.email}
                  value={formProfile.email}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">Nome:</label>
                <input
                  name="name"
                  value={formProfile.name}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">Telefone:</label>
                <input
                  name="telefone"
                  placeholder={user.telefone}
                  value={formProfile.telefone}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md  border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-blue-400 rounded-lg focus:ring focus:ring-blue-300"
              >
                Salvar
              </button>
            </form>
            <div className="flex justify-center items-center m-5 w-1/3">
              <img className="rounded-lg" src={user.profilePicture} />
            </div>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <form onSubmit={handleSubmitProfile}>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">
                  Currículo:
                </label>
                <textarea
                  rows={10}
                  name="curriculo"
                  value={formProfile.curriculo}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-blue-400 rounded-lg focus:ring focus:ring-blue-300"
              >
                Salvar
              </button>
            </form>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Vaga
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Criada
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {user.history_jobs &&
                    user.history_jobs
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((job) => (
                        <tr key={job._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 text-blue-900">
                            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dateFormater(job.createdAt)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {job.status}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {id_user === job.select_candidate && (
                              <p className="text-green-500">Você foi Escolhido!!!</p>
                            )}

                            {id_user !== job.select_candidate && job.status === "ABERTA" && (
                              <button onClick={() => handleUnapply(job._id)} className="text-red-600">Desistir da vaga</button>
                            )}      
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default ProfilePage;
