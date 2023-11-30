import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileBusiness from "./pages/ProfileBusinessPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/ProtectRoute";
import BusinessCreateOffer from "./pages/BusinessCreateOffer";
import JobsPage from "./pages/JobsPage";
import JobsPublicPage from "./pages/JobsPublicPage";
import JobDetailPage from "./pages/JobDetailPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import EditOffer from "./pages/EditOffer";
import JobsBusinessList from "./pages/JobsBusinessList";
import JobDetailPublic from "./pages/JobDetailPublic";
import TermsOfUse from "./pages/TermsOfUsePage";
import UserCandidatePage from "./pages/UserCandidatePage";
import UserCurriculumPage from "./pages/UserCurriculumPage";
import ForgotPassWord from "./pages/login/forgotpassword";
import PasswordResetPage from "./pages/login/UserPasswordReset";
import BusinessResetPassword from "./pages/login/BusinessPasswordReset";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white flex-grow flex flex-col">
        <Toaster />
        <Navbar />
        <div className="max-w-7xl mx-auto flex-grow sm:px-6 lg:px-8  mt-16">
          <Routes>
            /*Rotas não protegidas*/
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassWord />} />
            <Route
              path="/user/reset-password/:token"
              element={<PasswordResetPage />}
            />
            <Route
              path="/business/reset-password/:token"
              element={<BusinessResetPassword/>}
            />
            <Route path="/jobs/public" element={<JobsPublicPage />} />
            <Route path="/jobs/public/:id_job" element={<JobDetailPublic />} />
            <Route path="/termos" element={<TermsOfUse />} />
            /*Rotas Protegidas */
            <Route
              path="/profile"
              element={<ProtectRoute Component={ProfilePage} />}
            />
            <Route
              path="/minhas-candidaturas"
              element={<ProtectRoute Component={UserCandidatePage} />}
            />
            <Route
              path="/meu-curriculo"
              element={<ProtectRoute Component={UserCurriculumPage} />}
            />
            <Route
              path="/profile-business"
              element={<ProtectRoute Component={ProfileBusiness} />}
            />
            <Route
              path="/business/criar-vaga"
              element={<ProtectRoute Component={BusinessCreateOffer} />}
            />
            <Route
              path="/business/editar-vaga/:id_job"
              element={<ProtectRoute Component={EditOffer} />}
            />
            <Route
              path="/business/jobs-list/"
              element={<ProtectRoute Component={JobsBusinessList} />}
            />
            <Route
              path="/jobs"
              element={<ProtectRoute Component={JobsPage} />}
            />
            <Route
              path="/jobs/:id_job"
              element={<ProtectRoute Component={JobDetailPage} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
