import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import dateFormater from "../util/dateFormater.jsx";

export default function UserCurriculumPage() {
  const [user, setUser] = useState({});
  const [formProfile, setFormProfile] = useState({
    name: "",
    telefone: "",
    curriculo: "",
    email: "",
  });
  const [reload, setReload] = useState(false);

  const id_user = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setFormProfile(response.data); //carrega os campos ja preenchidos
      } catch (error) {
        console.log(error);
      }
    }

    getProfile(); //invocar
  }, [reload]);
  //handlechange do form de dedição do profile
  function handleChangeProfile(e) {
    setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
  }


  //sbmit profile form
  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      const response = await api.put("/user/edit", formProfile);

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div className="my-6 w-96">
    <form onSubmit={handleSubmitProfile}>
      <div className="flex flex-col space-y-2">
        <label className="text-gray-600 font-semibold">Currículo:</label>
        <textarea
          rows={20}
          name="curriculo"
          value={formProfile.curriculo}
          onChange={handleChangeProfile}
          className="w-full p-2 mt-1 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-blue-400 rounded-lg focus:ring focus:ring-blue-300"
      >
        Salvar
      </button>
    </form>
    </div>
  );
}
