import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dateFormater from "../util/dateFormater";
import api from "../axios/api";

export default function JobDetailPublic() {
  const [job, setJob] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getJob() {

      const response = await api.get(`/job/${params.id_job}/public`);

      setJob(response.data);
    }

    getJob();
  }, [params.id_job]);

  return (
    <div className="">
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <div>
        <div className="flex gap-3 justify-between">
          <h1 className="text-2xl font-semibold text-blue-900">{job.title}</h1>
          <p className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-[#FFAA00] ring-1 ring-inset ring-green-700/10">
            {job.model}
          </p>
        </div>
        <div className="flex justify-between my-2">
        <p className="text-sm text-gray-600">
          {job.city}, {job.state}
        </p>
        <p className="text-sm text-gray-600">Publicação: {dateFormater(job.createdAt)}</p>
        </div>
        </div>
        <div className="flex border"></div>
        <p className="text-lg mt-3 text-[#FFAA00] font-semibold" >Informações da Vaga</p>
        

        <pre className="mt-4 whitespace-pre-line font-sans text-gray-600">
          {job.description}
        </pre>
        <p className="mt-2 text-gray-600">Salário: {job.salary}</p>
        <p className="mt-2 text-gray-600">
          Status:
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 ${
              job.status === "Fechada" ? "text-red-500" : "text-green-500"
            }`}
          >
            {job.status}
          </span>
        </p>
        
        
        <div className="flex border mt-5"></div>
        <div>
          <h2 className="text-lg mt-3 text-[#FFAA00] font-semibold">Sobre a Empresa</h2>
          <p className="text-sm">{job.business?.name}</p>
          <p className="text-sm">{job.business?.description}</p>
        </div>
        <div className="mt-6">
          <Link
            to="/signup"
            className="bg-blue-900 hover:bg-blue-600 rounded-md text-white px-4 py-2 text-sm"
          >
            Gostou da vaga? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
