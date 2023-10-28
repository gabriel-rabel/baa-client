import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import dateFormater from "../util/dateFormater.jsx";


export default function UserCandidatePage(params) {


const [user, setUser] = useState({});
const [formProfile, setFormProfile] = useState({
    name: "",
    telefone: "",
    curriculo: "",
    email: "",
  });
  const [reload, setReload] = useState(false);

  const id_user = localStorage.getItem("userId");


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

  

  async function handleUnapply(id_job) {
    try {
      await api.post(`/job/unapply/${id_job}`)

      setReload(!reload);
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className="my-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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

  )
    
};
