import { useState, useEffect } from "react";
import api from "../axios/api.js";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import dateFormater from "../util/dateFormater.jsx";

function ProfilePage() {
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
  //handle do logout
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  //classe do tabs
  function classNames(...classes) {
    //tabs
    return classes.filter(Boolean).join(" ");
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

  async function handleUnapply(id_job) {
    try {
      await api.post(`/job/unapply/${id_job}`)

      setReload(!reload);
      
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className="flex my-6">
      <form onSubmit={handleSubmitProfile} className="w-2/3">
              <div className="flex flex-col space-y-2 mt-4">
                <label className="text-gray-600 font-semibold -mb-2">Email:</label>
                <input
                  name="telefone"
                  placeholder={user.email}
                  value={formProfile.email}
                  onChange={handleChangeProfile}
                  className="flex w-full p-2 shadow-sm rounded-md bg-gray-100 border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <label className="text-gray-600 font-semibold -mb-2">Nome completo:</label>
                <input
                  name="name"
                  value={formProfile.name}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <label className="text-gray-600 font-semibold -mb-2">Telefone:</label>
                <input
                  name="telefone"
                  placeholder={user.telefone}
                  value={formProfile.telefone}
                  onChange={handleChangeProfile}
                  className="w-full p-2 mt-1 shadow-sm rounded-md  border border-gray-400 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full py-2 px-4 font-semibold text-white bg-blue-900 hover:bg-blue-400 rounded-lg focus:ring focus:ring-blue-300"
              >
                Salvar
              </button>
            </form>
            <div className="flex justify-center items-center m-5 w-1/3">
              <img className="rounded-lg" src={user.profilePicture} />
            </div>
      
    </div>
  );
}

export default ProfilePage;
