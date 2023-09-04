import { useState } from "react";
import api from "../axios/api.js"
import { useNavigate } from "react-router-dom";


export default function BusinessCreateOffer() {

    const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    city: "",
    state: "",
    model: "REMOTO",
  });

  function handleChange(e) {
    setJob({ ...job, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/job/create", job);

      setJob({
        title: "",
        description: "",
        salary: "",
        city: "",
        state: "",
        model: "",
      });

      navigate("/profile-business");

    } catch (error) {
      console.log(error);
    }
  }

  console.log(job);

  return (
    <div>
      <h1 className="text-blue-600 font-bold text-2xl mb-6"></h1>
      <div className="bg-blue-400 text-white rounded-lg p-5">
        <p>Atenção, ao cadastrar a vaga, se atente as informações inseridas, pois as mesmas serão de responsabilidade total da empresa contratante.</p>

      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-semibold">Título:</label>
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-semibold">Description:</label>
          <textarea
            rows="6"
            name="description"
            placeholder="Digite aqui a sua oferta de vaga. É opcional a inserção de dados para contato, como telefone ou e-mail para envio de curriculos."
            value={job.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold">Salário:</label>
            <input
              name="salary"
              value={job.salary}
              placeholder="A combinar"
              onChange={handleChange}
              className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold">Cidade:</label>
            <input
              name="city"
              value={job.city}
              onChange={handleChange}
              className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold">Estado:</label>
            <input
              name="state"
              value={job.state}
              onChange={handleChange}
              className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 mb-2">
            <label className="text-gray-600 font-semibold">
              Modelo de trabalho:
            </label>
            <select
              name="model"
              onChange={handleChange}
              className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-orange-300 focus:outline-none"
            >
              <option value="REMOTO">Remoto</option>
              <option value="PRESENCIAL">Presencial</option>
              <option value="HIBRIDO">Híbrido</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 py-2 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-400 rounded-lg focus:ring focus:ring-blue-300"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}


