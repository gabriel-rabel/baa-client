import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function JobDetailPage() {
  const params = useParams();
  const { isLoggedIn, role } = useContext(AuthContext);

  const [alreadyApply, setAlreadyApply] = useState(false);

  const id = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [job, setJob] = useState({});

  useEffect(() => {
    async function getJob() {
      const response = await api.get(`/job/${params.id_job}`);
      setJob(response.data);
      //confere se o candidato ja esta dentro da array de candidatos a vaga.
      const job = response.data.candidates.find((candidate) => {
        return candidate._id === id;
      });

      if (job) {
        setAlreadyApply(true);
      } else {
        setAlreadyApply(false);
      }
    }

    getJob();
  }, []);

  async function handleApply(e) {
    //nao precisa e e.prevent defaul pq nao esta dentro de um form
    try {
      await api.post(`/job/apply/${params.id_job}`);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleApprove(id_user) {
    try {
      await api.post(`/job/approved-candidate/${params.id_job}/${id_user}`);
      navigate("/profile-business");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <h1 className="text-2xl font-semibold">{job.title}</h1>
        <div className="border"></div>
        <p className="text-sm">
          Local: {job.city}, {job.state}
        </p>
        <p className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
          {job.model}
        </p>
        <pre className="mt-4 whitespace-pre-line font-sans">
          {job.description}
        </pre>
        <p className="mt-2">Salário: R$ {job.salary}</p>
        <p className="mt-2">
          Status:
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 ${
              job.status === "Fechada" ? "text-red-500" : "text-green-500"
            }`}
          >
            {job.status}
          </span>
        </p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Empresa</h2>
          <p className="text-sm">{job.business?.name}</p>
          <p className="text-sm">{job.business?.description}</p>
          <p className="text-sm">
            Contato: {job.business?.email}, {job.business?.telefone}
          </p>
        </div>

        {role === "USER" && alreadyApply === false && (
          <button
            onClick={handleApply}
            className="mt-4 bg-blue-900 lg:hover:bg-blue-700 rounded-lg py-2 px-4 text-white"
          >
            Me cadidatar
          </button>
        )}
        {role === "USER" && alreadyApply === true && (
          <button
            className="rounded-lg text-xs bg-gray-200 text-gray-500 py-2 px-2"
            disabled
          >
            Você já se candidatou a esta vaga!
          </button>
        )}
      </div>

      {id === job.business?._id && (
        <div className="border rounded-lg shadow-sm p-4 bg-white">
          <h2 className="text-2xl font-semibold">Candidatos</h2>
          <div className="border"></div>
          {job.select_candidate && (
            <h1>Candidato Selecionado: {job.select_candidate.name}</h1>
          )}
          <div className="border mb-2"></div>
          {job.candidates?.map((candidate) => {
            return (
              <Disclosure key={candidate._id}>
                <Disclosure.Button className="flex justify-between w-full p-2 rounded-lg bg-gray-100 items-center">
                  <p>{candidate.name}</p>
                  <p>{candidate.email}</p>
                  <p>{candidate.telefone}</p>
                  {!job.select_candidate && (
                    <div
                      onClick={() => handleApprove(candidate._id)}
                      className="font-semibold text-blue-900"
                    >
                      Selecionar candidato
                    </div>
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="px-8 bg-gray-50">
                  {candidate.curriculo ? (
                    <pre className="mt-2 whitespace-pre-line font-sans">
                      {candidate.curriculo}
                    </pre>
                  ) : (
                    "Candidato não tem curriculo na plataforma."
                  )}
                </Disclosure.Panel>
              </Disclosure>
            );
          })}
        </div>
      )}
    </>
  );
}
