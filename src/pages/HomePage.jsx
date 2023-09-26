import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dateFormater from "../util/dateFormater";
import banner from "../assets/banner1.png";
import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function getJobs() {
      const response = await axios.get(
        "https://vagasdaqui.cyclic.cloud/job/all/open/public"
      );
      setJobs(response.data);
    }
    getJobs();
  }, []);
  console.log(jobs);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleModelFilter(e) {
    setSelectedModel(e.target.value);
  }

  return (
    <main className="bg-white">
      <div className="flex justify-center">
        <img src={banner} />
      </div>
      <div className="mx-10">
        <div className="flex flex-col gap-5 bg-white my-5">
          <h2 className="text-xl font-semi-bold self-center">
            Bem-vindo ao novo Portal de Empregos de Navegantes e Região!
          </h2>
          <p>
            Conectamos empresas e profissionais talentosos, oferecendo vagas de
            todos os níveis de experiência. Facilitamos o cadastro de vagas para
            empresas e a busca por oportunidades para profissionais. Junte-se a
            nós e faça parte dessa comunidade de sucesso!
          </p>
        </div>
        <div className="flex gap-3 justify-evenly my-5">
          <div className="flex w-1/2 h-20 bg-blue-600 rounded-md shadow-lg text-white items-center justify-center font-medium text-xl">
            <p>BUSCAR UMA VAGA</p>
          </div>
          <div className="flex w-1/2 h-20 bg-yellow-500 rounded-md shadow-lg text-white items-center justify-center font-medium text-xl">
            <p>CADASTRAR UMA VAGA</p>
          </div>
        </div>

        {/* AQUI VAI O SEARCH BAR E O FILTRO */}
        <div
          className="flex flex-col lg:flex-row justify-end gap-2 mb-2 mt-2"
          id="search"
        >
          <input
            type="text"
            placeholder="Busque por vagas"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={search}
            onChange={handleSearch}
          />

          <select
            className="border border-gray-300 rounded-md px-4 py-2 pr-8"
            onChange={handleModelFilter}
          >
            <option value="">Todos</option>
            <option value="PRESENCIAL">Presencial</option>
            <option value="REMOTO">Remoto</option>
            <option value="HIBRIDO">Híbrido</option>
          </select>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-1">
          {jobs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordenar pelo createdAt
            .filter((job) => {
              return job.title.toLowerCase().includes(search.toLowerCase());
            })
            .filter((job) => {
              if (selectedModel === "") {
                return true;
              }
              return job.model === selectedModel;
            })
            .map((job) => {
              return (
                <Link
                  to={
                    isLoggedIn ? `/jobs/${job._id}` : `/jobs/public/${job._id}`
                  }
                  key={job._id}
                  className="border rounded-sm shadow-sm flex flex-col p-2 bg-white transnform hover:scale-105 transition-transform duration-300 gap-2"
                >
                  <div className="flex justify-between">
                    <h1 className="font-semibold text-blue-900">{job.title}</h1>
                    <h2 className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-red-700/10">
                      {dateFormater(job.createdAt)}
                    </h2>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm">{job.city}</p>
                    <p className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-red-700/10">
                      R$ {job.salary}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="p-5"></div>
    </main>
  );
}
