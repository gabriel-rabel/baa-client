import { useEffect, useState } from "react";
import api from "../axios/api.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOffer() {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); // Estado para mostrar/ocultar o texto
  const [showPremiumText, setShowPremiumText] = useState(false); // Estado para mostrar/ocultar o texto

  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    city: "",
    state: "",
    model: "",
    open_apply: null,
    premium: null,


  });

  const params = useParams();

  useEffect(() => {
    async function getJob() {
      const response = await api.get(`/job/${params.id_job}`);
      setJob(response.data);
    }

    getJob();
  }, [params.id_job]);

  function handleChange(e) {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });

    // Se o campo "premium" for alterado, mostre o texto se o valor for "true"
    if (name === "premium" && value === true) {
      setShowPremiumText(true);
    } else {
      setShowPremiumText(false);
    }
  }

  function handleCityChange(e) {
    setSelectedCity(e.target.value);
    setJob({ ...job, city: e.target.value });
  }

  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/job/edit/${params.id_job}`, job);

      setJob({
        title: "",
        description: "",
        salary: "",
        city: "",
        state: "",
        model: "",
        open_apply: null,
        premium: null,
      });

      navigate(`/jobs/${params.id_job}`);
    } catch (error) {
      console.log(error);
    }
  }

  //Delete Buttom
  async function handleDelete(e) {
    e.preventDefault();

    try {
      await api.delete(`/job/delete/${params.id_job}`);

      navigate("/profile-business");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(job);

  return (
    <div className="flex flex-col lg:max-w-screen-xl">
      <div className="bg-blue-900 text-white rounded-lg p-5 mt-6 flex flex-col font-thin">
        <p className="text-sm leading-normal">
          Parabéns, você está prestes a promover uma vaga de emprego. Preencha
          os dados abaixo e siga as instruções.
        </p>
        <p className="text-sm leading-normal">
          Atenção, ao cadastrar a vaga, se atente às informações inseridas, pois
          as mesmas serão de responsabilidade total da empresa contratante.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl mt-5 bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 border"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-blue-900 font-semibold">
            Será uma vaga em DESTAQUE?
          </label>
          <p className="text-sm text-gray-500 italic font-thin">
            Ao marcar <span className="font-normal">"SIM"</span> a sua vaga será classificada como destaque pelo prazo contratado. Ex: 7 dias, 15 dias, 30 dias.
            As vagas em DESTAQUE são exibidas na página inicial do nosso portal, aumentando a visibilidade da sua vaga, também mantemos as vagas em DESTAQUE no topo da lista da página de vagas pelo período contratado.
          </p>
          {showPremiumText && (
            <p className="text-sm text-blue-600 font-normal">
              Ao marcar "Sim", você estará optando por tornar sua vaga em vaga de DESTAQUE. Escolha o plano que melhor se encaixa para você e sua empresa. Após isso fala a transferência dos valores preferencialmente. Após a confirmação faremos a atualização da sua vaga para DESTAQUE.
              CC: 0000-0000-0000-0000
              Nome: Artec Sistemas

              Preferencialmente Pix: 790.627.412-15
            </p>
          )}
          <p className="text-sm text-gray-500 italic font-thin">
            
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="premium_true"
              name="premium"
              value={true}
              checked={job.premium === true}
              onChange={handleChange}
              className="text-blue-600"
            />
            <label htmlFor="premium_true"className="text-sm">Sim</label>
            <input
              type="radio"
              id="premium_false"
              name="premium"
              value={false}
              checked={job.premium === false}
              onChange={handleChange}
              className="text-[#FFAA00]"
            />
            <label htmlFor="premium_false" className="text-sm">Não</label>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-semibold text-sm -mb-2 mt-2">Título:</label>
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full p-2 mt-1 text-sm shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-semibold text-sm -mb-2 mt-2">
            Descrição:
          </label>
          <textarea
            rows="6"
            name="description"
            placeholder="Digite aqui a sua oferta de vaga. É opcional a inserção de dados para contato, como telefone ou e-mail para envio de currículos."
            value={job.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 text-sm shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold text-sm -mb-2 mt-2">
              Salário:
            </label>
            <input
              name="salary"
              value={job.salary}
              onChange={handleChange}
              className="w-full text-sm shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold text-sm -mb-2 mt-2">
              Cidade:
            </label>
            <input
              name="city"
              value={job.city}
              onChange={handleChange}
              className="w-full p-2  text-sm shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 font-semibold text-sm -mb-2 mt-2">
              Estado:
            </label>
            <input
              name="state"
              value={job.state}
              onChange={handleChange}
              className="w-full p-2 text-sm  shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 mb-2">
            <label className="text-gray-600 font-semibold text-sm -mb-2 mt-2">
              Modelo de trabalho:
            </label>
            <select
              name="model"
              onChange={handleChange}
              className="w-full p-2  text-sm  shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-orange-300 focus:outline-none"
            >
              <option value="REMOTO">Remoto</option>
              <option value="PRESENCIAL">Presencial</option>
              <option value="HIBRIDO">Híbrido</option>
            </select>
          </div>
        </div>
        <div className="flex  justify-between">
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-2 py-2 px-4 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-600 rounded-lg focus:ring focus:ring-blue-300"
          >
            Salvar Edição
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className="mt-2 py-2 px-4  text-sm font-semibold text-red-500 border border-red-500  hover:bg-red-500 hover:text-white rounded-lg focus:ring focus:ring-blue-300"
          >
            Excluir Vaga
          </button>
        </div>
      </form>
    </div>
  );
}
