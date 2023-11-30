import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import dateFormater from "../util/dateFormater";
import banner from "../assets/banner1.png";
import { AuthContext } from "../contexts/AuthContext";
import { BsBookmarkStarFill } from "react-icons/bs";
import ads1 from "../assets/navgeek.png";
import api from "../axios/api.js";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [numJobsToShow, setNumJobsToShow] = useState(10); // Número inicial de vagas a serem exibidas
  const [totalJobs, setTotalJobs] = useState(0); // Número total de vagas disponíveis
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function getJobs() {

      const response = await api.get(`/job/all/open/public`);

      const jobData = response.data;
      setJobs(jobData);
      setTotalJobs(jobData.length);
    }
    getJobs();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleModelFilter(e) {
    setSelectedModel(e.target.value);
  }

  function loadMoreJobs() {
    setNumJobsToShow(numJobsToShow + 10); // Aumenta o número de vagas a serem exibidas
  }

  return (
    <main className="bg-white">
      <div className="flex justify-center">
        <img src={banner} alt="Banner" />
      </div>
      <section className="">
        <div className="flex flex-col justify-center items-center my-5 ">
          <p className=" text-sm mx-4 lg:mx-0 lg:text-base text-justify lg:font-semibold text-blue-900">
            Conectamos empresas e profissionais talentosos, oferecendo as mais variadas vagas.</p>
          <p className=" text-sm mx-4 lg:mx-0 lg:text-base text-justify lg:font-thin  text-blue-900">
           Facilitamos o
            divulgação para empresas e a busca por oportunidades para
            profissionais.
          </p>
        </div>
        <div className="container">
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-amber-400 mx-4 lg:mx-auto">
                VAGAS EM DESTAQUE
              </h3>
            </div>
          </div>

          <div className="flex  flex-col  lg:grid lg:grid-cols-2 w-full gap-1">
            {jobs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .filter((job) => {
                return job.title.toLowerCase().includes(search.toLowerCase());
              })
              .filter((job) => {
                if (selectedModel === "") {
                  return true;
                }
                return job.model === selectedModel;
              })
              .filter((job) => job.premium === true) // Filtra apenas as vagas premiu

              .map((job) => {
                return (
                  <Link
                    to={
                      isLoggedIn
                        ? `/jobs/${job._id}`
                        : `/jobs/public/${job._id}`
                    }
                    key={job._id}
                    className="border rounded-sm shadow-sm flex flex-col p-2 bg-white transform hover:scale-105 transition-transform duration-200 gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-amber-400">
                          <BsBookmarkStarFill />{" "}
                        </span>
                        <h1 className="text-xs lg:text-sm font-semibold text-blue-900">
                          {job.title}
                        </h1>
                      </div>
                      <h2 className="text-xs lg:text-sm rounded-md bg-green-50 px-2 py-1  text-green-700 ring-1 ring-inset ring-red-700/10">
                        {dateFormater(job.createdAt)}
                      </h2>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-xs lg:text-sm text-blue-900">{job.city}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="container mt-10">
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-amber-400 mx-4 lg:mx-auto">
                ÚLTIMAS VAGAS
              </h3>
            </div>
            <div
              className="flex flex-col lg:flex-row justify-end gap-2"
              id="search"
            >
              <input
                type="text"
                placeholder="Busque por vagas"
                className="text-xs lg:text-sm border border-gray-300 rounded-md px-4"
                value={search}
                onChange={handleSearch}
              />

              <select
                className="text-xs lg:text-sm border border-gray-300 rounded-md px-4 pr-8"
                onChange={handleModelFilter}
              >
                <option value="">Todos</option>
                <option value="PRESENCIAL">Presencial</option>
                <option value="REMOTO">Remoto</option>
                <option value="HÍBRIDO">Híbrido</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-1">
            {jobs
              .slice(0, numJobsToShow) // Aplica o filtro de quantidade de vagas a serem exibidas
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .filter((job) => {
                return job.title.toLowerCase().includes(search.toLowerCase());
              })
              .filter((job) => {
                if (selectedModel === "") {
                  return true;
                }
                return job.model === selectedModel;
              })
              .filter((job) => job.premium === false) // Filtra apenas as vagas que não são premium
              .map((job) => {
                return (
                  <Link
                    to={
                      isLoggedIn
                        ? `/jobs/${job._id}`
                        : `/jobs/public/${job._id}`
                    }
                    key={job._id}
                    className="border rounded-sm shadow-sm flex flex-col p-2 bg-white transform hover:scale-105 transition-transform duration-200 gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h1 className="text-xs lg:text-sm font-semibold text-blue-900">
                          {job.title}
                        </h1>
                      </div>
                      <h2 className="text-xs lg:text-sm rounded-md bg-green-50 px-2 py-1 text-green-700 ring-1 ring-inset ring-red-700/10">
                        {dateFormater(job.createdAt)}
                      </h2>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-xs lg:text-sm text-blue-900">{job.city}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
          <div className="flex justify-center mb-10">
            {numJobsToShow < totalJobs && (
              <button
                onClick={loadMoreJobs}
                className="text-xs lg:text-sm bg-blue-900 hover:bg-blue-700 text-white p-2 mt-4 rounded-md"
              >
                Ver mais vagas...
              </button>
            )}
          </div>
        </div>
        <div id="Publicidade" className="flex justify-center">
          <Link to="https://navgeek.com.br" alt="">
            <div className="flex justify-center items-center my-10 max-w-[800px]">
              <img src={ads1} alt="Banner" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
