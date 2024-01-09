import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link } from "react-router-dom";
import dateFormater from "../util/dateFormater.jsx";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function JobsBusinessList() {
  const [business, setBusiness] = useState({});
  const [reload, setReload] = useState(false);

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

  // Em handleDelete, aceite o ID da vaga como argumento:
  async function handleDelete(job) {
    try {
      await api.delete(`/job/delete/${job}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full m-auto my-6">
      <p className="p-4 text-justify text-blue-900">
        <span className="font-semibold">{business.name}</span>, nesta área,
        oferecemos a você a flexibilidade de editar e excluir suas vagas de
        forma simples e intuitiva. Se surgirem atualizações ou mudanças nas
        informações da vaga, você pode facilmente editar os detalhes para
        garantir que todas as informações estejam precisas e atrativas para os
        candidatos. Além disso, caso uma vaga já tenha sido preenchida ou não
        esteja mais disponível, a opção de exclusão permite remover a vaga
        permanentemente da lista.
      </p>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 lg:rounded-md mt-6">
        <table className="w-full divide-y divide-gray-300 ">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left  font-semibold text-gray-900 sm:pl-6"
              >
                Título da vaga
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left  font-semibold text-gray-900"
              >
                Criação
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left  font-semibold text-gray-900"
              >
                Condição
              </th>
              <th
                scope="col"
                className="pl-10 font-semibold text-gray-900"
              >
                Edição
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {business.offers &&
              business.offers
                .filter(
                  (job) => job.status === "ABERTA" || job.status === "FECHADA"
                )
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((job) => (
                  <tr key={job._id}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 text-blue-900">
                      <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {dateFormater(job.createdAt)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {job.status}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-sm sm:pr-6">
                      {job.status === "ABERTA" && (
                        <div className="flex justify-end gap-5">
                          <Link
                            to={`/business/editar-vaga/${job._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilSquareIcon
                              className="h-5 w-5"
                              title="Editar vaga"
                            />
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir vaga"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
