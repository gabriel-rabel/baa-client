import React, { useEffect, useState } from "react";
import api from "../axios/api.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsBookmarkStarFill } from "react-icons/bs";

export default function BusinessCreateOffer() {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showPremiumText, setShowPremiumText] = useState(false); // Estado para mostrar/ocultar o texto

  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "A combinar",
    city: "",
    state: "SC",
    model: "PRESECIAL",
    open_apply: "false",
    premium: "false",
  });



  function handleChange(e) {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });

    // Se o campo "premium" for alterado, mostre o texto se o valor for "true"
    if (name === "premium" && value === "true") {
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
      await api.post("/job/create", job);

      setJob({
        title: "",
        description: "",
        salary: "",
        city: "",
        state: "",
        model: "",
        open_apply: "",
        premium: "",
      });

      navigate("/profile-business");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const stateData = response.data;
        setStates(stateData);
      })
      .catch((error) => {
        console.error("Erro ao buscar estados: ", error);
      });
  }, []);

  useEffect(() => {
    if (job.state) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${job.state}/municipios`
        )
        .then((response) => {
          const cityData = response.data;
          setCities(cityData);
        })
        .catch((error) => {
          console.error("Erro ao buscar cidades: ", error);
        });
    }
  }, [job.state]);

  return (
    <div className="flex flex-col lg:max-w-screen-xl">
      <div className="bg-blue-900 text-white rounded-lg p-5 mt-6 flex flex-col font-thin">
        <p className=" text-sm leading-normal">Parabéns, você esta prestes a promover uma vaga de emprego. Preencha os dados abaixo e siga as instruções.</p>
        <p className=" text-sm leading-normal">
          Atenção, ao cadastrar a vaga, se atente às informações inseridas, pois
          as mesmas serão de responsabilidade total da empresa contratante.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl mt-5 border bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
      >
        
        <div className="flex flex-col space-y-2">
          <label className="flex text-blue-900 font-semibold">
          <BsBookmarkStarFill className="text-amber-400 mt-1 "/><p>Será uma vaga em {" "}DESTAQUE?</p>
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
              value="true"
              checked={job.premium === "true"}
              onChange={handleChange}
              className="text-amber-400"
            />
            <label htmlFor="open_apply_true" className="text-sm">Sim</label>
            <input
              type="radio"
              id="premium_false"
              name="premium"
              value="false"
              checked={job.premium === "false"}
              onChange={handleChange}
              className="text-amber-400"
            />
            <label htmlFor="open_apply_false" className="text-sm">Não</label>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-3">
          <label className="text-blue-900 font-semibold text-sm -mb-2">Título:</label>
          <input
            name="title"
            placeholder="Ex: Administrador de Empresas"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full text-sm p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2 mt-3">
          <label className="text-blue-900 font-semibold -mb-2 text-sm">Descrição:</label>
          <textarea
            rows="10"
            name="description"
            placeholder="Digite aqui a sua oferta de vaga. Recomendamos sempre adicionar os campos 'Descrição, Requisitos e Benefícios'. Lembre-se ainda de adicionar os dados para contato caso tenha optado por não habilitar candidaturas pelo nosso site."
            value={job.description}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 text-sm shadow-sm rounded-md placeholder-gray-500 bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-5 ">
          <div className="flex flex-col space-y-2 lg:w-1/4 mt-3">
            <label className="text-blue-900 font-semibold -mb-2 text-sm">Salário:</label>
            <input
              name="salary"
              value={job.salary}
              placeholder="R$ ou a combinar"
              onChange={handleChange}
              required
              className="w-full p-2  text-sm shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 lg:w-1/4 mt-3">
            <label className="text-blue-900 font-semibold -mb-2 text-sm">Estado:</label>
            <select
              name="state"
              value={job.state}
              onChange={handleChange}
              required
              className="w-full text-sm p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="" className="text-sm">Selecione um estado</option>
              {states.map((state) => (
                <option key={state.id} value={state.sigla}>
                  {state.sigla}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2 lg:w-1/4 mt-3">
            <label className="text-blue-900 font-semibold -mb-2 text-sm">Cidade:</label>
            <select
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              required
              className="w-full text-sm p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="" className="text-sm">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2 mb-2 lg:w-1/4 mt-3">
            <label className="text-blue-900 text-sm font-semibold -mb-2">
              Modelo de trabalho:
            </label>
            <select
              name="model"
              onChange={handleChange}
              required
              className="w-full text-sm p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-orange-300 focus:outline-none"
            >
              <option value="PRESENCIAL">Presencial</option>
              <option value="REMOTO">Remoto</option>
              <option value="HIBRIDO">Híbrido</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-5">
          <label className="text-blue-900 font-semibold">
            Fazer o processo seletivo através do nosso portal?
          </label>
          <p className="text-sm text-gray-500 italic font-thin leading-normal">
            Ao marcar <span className="font-normal">"Não"</span>, o candidato não
            conseguirá se inscrever para a vaga através do seu perfil em nosso
            portal, portanto é necessário que você adicione os dados para
            contato no campo "Descrição" da vaga. Ex: Email, telefone ou link
            para cadastro.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="open_apply_true"
              name="open_apply"
              value="true"
              checked={job.open_apply === "true"}
              onChange={handleChange}
              className="text-amber-400"
            />
            <label htmlFor="open_apply_true" className="text-sm ">Sim</label>
            <input
              type="radio"
              id="open_apply_false"
              name="open_apply"
              value="false"
              checked={job.open_apply === "false"}
              onChange={handleChange}
              className="text-amber-400 flex -mr-8"
            />
            <label htmlFor="open_apply_false" className="text-sm">Não</label>
          </div>
        </div>
        

        <button
          type="submit"
          className="w-full shadow my-5 py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-blue-700 rounded-lg focus-ring focus-ring-blue-300"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
