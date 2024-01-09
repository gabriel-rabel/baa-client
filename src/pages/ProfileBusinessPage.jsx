import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link } from "react-router-dom";
import dateFormater from "../util/dateFormater.jsx";

export default function ProfileBusinessPage() {
  const [business, setBusiness] = useState({});
  const [reload, setReload] = useState(false);
  const [formProfile, setFormProfile] = useState({
    name: "",
    phone: "",
    cnpj: "",
    logo: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      cep: "",
      complement: "",
      city: "",
      state: "",
    },
    email: "",
    description: "",
  });

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

  // function handleChangeProfile(e) {
  //   setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  // }

  function handleChangeProfile(e) {
    const { name, value } = e.target;

    // Copie o estado atual
    const updatedFormProfile = { ...formProfile };

    // Se o campo pertence ao endereço, atualize-o no campo de endereço
    if (name.startsWith("address.")) {
      const addressField = name.replace("address.", ""); // Remove "address." do nome
      updatedFormProfile.address[addressField] = value;
    } else {
      // Se não for um campo de endereço, atualize diretamente no estado
      updatedFormProfile[name] = value;
    }

    // Defina o estado atualizado
    setFormProfile(updatedFormProfile);
  }

  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      const response = await api.put("/business/edit", formProfile);

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col m-5 gap-5">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* left side perfil */}
        <div className="flex flex-col  justify-center rounded-md  lg:w-1/4  p-3 border">
          {/*<div className="flex justify-center p-5">
            <img
              src={formProfile.logo}
              className="flex lg:ml-5 w-40 h-40 rounded-full"
              alt="profile"
            />
  </div>*/}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-medium text-blue-900">{formProfile.name}</h1>
            <p className="italic font-thin text-gray-500 text-sm">
              {formProfile.email}
            </p>
            <p className="italic font-thin text-gray-500 text-sm">
              {formProfile.phone}
            </p>

            <p className="italic font-thin text-gray-500 text-sm">
              {formProfile.address.city}, {formProfile.address.state}
            </p>
            <p className="italic font-thin text-gray-500 text-sm">
              Membro desde: {dateFormater(formProfile.createdAt)}
            </p>
          </div>
        </div>
        {/* left side perfil */}
        {/* right side perfil */}
        <div className="flex flex-col rounded-md  lg:w-3/4 border">
          <div>
            <div className="bg-blue-900 p-2 rounded-t-md ">
              <h1 className="text-lg text-white">Sobre</h1>
            </div>
            <div className="flex items-center m-6">
              <p className="text-gray-500 font-thin text-justify">
                {formProfile.description}
              </p>
            </div>
          </div>
          <div className="flex-row gap-5 mb-10 w-full justify-around hidden lg:flex">
            <div>
              <button className="rounded p-3 bg-blue-900 text-white">
                Cadastrar Vaga
              </button>
            </div>
            <div>
              <button className="rounded p-3 bg-[#FFAA00] text-white">
                Minhas Vagas
              </button>
            </div>
          </div>
        </div>
        {/* right side perfil */}
      </div>

      <div className="rounded-md border ">
        <div className="bg-blue-900 p-2 rounded-t-md ">
          <h1 className="text-lg text-white">Editar Perfil</h1>
        </div>
        <form onSubmit={handleSubmitProfile} className="m-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-col lg:w-2/4">
              <label className="text-gray-600 font-semibold">Nome:</label>
              <input
                name="name"
                value={formProfile.name}
                onChange={handleChangeProfile}
                className="w-full  shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col lg:w-1/4">
              <label className="text-gray-600 font-semibold">CNPJ:</label>
              <input
                name="cnpj"
                value={formProfile.cnpj}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col lg:w-1/4">
              <label className="text-gray-600 font-semibold">Telefone:</label>
              <input
                name="phone"
                value={formProfile.phone}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-col lg:w-2/4">
              <label className="text-gray-600 font-semibold">Rua:</label>
              <input
                name="address.street"
                value={formProfile.address.street}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col lg:w-1/4">
              <label className="text-gray-600 font-semibold">Número:</label>
              <input
                name="address.number"
                value={formProfile.address.number}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col lg:w-1/4">
              <label className="text-gray-600 font-semibold">Bairro:</label>
              <input
                name="address.neighborhood"
                value={formProfile.address.neighborhood}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-col lg:w-2/5">
              <label className="text-gray-600 font-semibold">
                Complemento:
              </label>
              <input
                name="address.complement"
                value={formProfile.address.complement}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col lg:w-1/5">
              <label className="text-gray-600 font-semibold">Cidade:</label>
              <input
                name="address.city"
                value={formProfile.address.city}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col lg:w-1/5">
              <label className="text-gray-600 font-semibold">Estado:</label>
              <input
                name="address.state"
                value={formProfile.address.state}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">CEP:</label>
              <input
                name="address.cep"
                value={formProfile.address.cep}
                onChange={handleChangeProfile}
                className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold">Descrição:</label>
            <textarea
              name="description"
              rows="6"
              value={formProfile.description}
              onChange={handleChangeProfile}
              className="w-full shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className=" mt-2 w-40 py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-oblue-700 rounded-lg focus:ring focus:ring-blue-300"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
