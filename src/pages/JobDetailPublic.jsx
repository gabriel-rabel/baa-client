import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobDetailPublic() {
  const [job, setJob] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getJob() {
      const response = await axios.get(
        `https://vagasdaqui.cyclic.cloud/job/${params.id_job}/public`
      );

      setJob(response.data);
    }

    getJob();
  }, [params.id_job]);

  console.log(job);

  return (
    <div>
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
        </div>
        <div className="mt-4">
        <Link to="/signup" className="bg-blue-900 hover:bg-blue-600 rounded-md text-white px-4 py-2 text-sm">Gostou da vaga? Cadastre-se</Link>
        </div>
      </div>
      
    </div>
  );
}
