import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import dateFormater from "../util/dateFormater.jsx";

export default function ProfileBusinessPage() {
  const [business, setBusiness] = useState({});
  const [reload, setReload] = useState(false);
  const [formProfile, setFormProfile] = useState({
    name: "",
    telefone: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/business/profile");
        setBusiness(response.data);
        setFormProfile({ ...formProfile, ...response.data }); //carrega os campos ja preenchidos
      } catch (error) {
        console.log(error);
      }
    }

    getProfile(); //invocar
  }, [reload]);

  function handleChangeProfile(e) {
    setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  }

  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      const response = await api.put("/business/edit", formProfile);
      console.log(response);

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Link
        to="/business/criar-vaga"
        className="bg-indigo-500 p-3 text-center text-white rounded-lg shadow-lg   "
      >
        Crie uma vaga
      </Link>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            Vagas
          </Tab>
          <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            Profile
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          {/*VAGAS*/}
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
                  {business.offers &&
                    business.offers
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
                            {job.status === "ABERTA" && (
                              <Link
                                to={`/business/editar-vaga/${job._id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Editar
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <form onSubmit={handleSubmitProfile}>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">
                  Email:{" "}
                  <span className="font-thin italic">
                    (campo desabilitado para edição)
                  </span>
                </label>
                <input
                  name="email"
                  value={formProfile.email}
                  disabled
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 text-gray-400 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">Nome:</label>
                <input
                  name="name"
                  value={formProfile.name}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1  shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">Telefone:</label>
                <input
                  name="telefone"
                  value={formProfile.telefone}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-semibold">
                  Descrição:
                </label>
                <input
                  name="description"
                  value={formProfile.description}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-oblue-700 rounded-lg focus:ring focus:ring-blue-300"
              >
                Salvar
              </button>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
