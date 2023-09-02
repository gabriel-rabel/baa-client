import { useNavigate } from "react-router-dom";

export default function handleLogout(e) {
    const navigate = useNavigate();
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
 }
