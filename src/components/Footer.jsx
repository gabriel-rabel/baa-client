import Logo from "../assets/logo.png";

export default function Footer(params) {
  return (
    <footer className="bg-white shadow-md shadow-black w-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 px-5">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img src={Logo} className="max-w-[200px]" alt="VagasDaqui Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a href="/" className="mr-4 md:mr-6 text-blue-950 hover:text-blue-700  ">
                Início
              </a>
            </li>
            <li>
              <a href="/termos" className="text-blue-950 hover:text-blue-700 mr-4 md:mr-6 ">
                Termos de uso e privacidade
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=5547997841432&text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20portal%20Vagasdaqui%20e%20a%20minha%20d%C3%BAvida%20%C3%A9:%20" target="_blank" className=" text-blue-950 hover:text-blue-700">
                Contato
              </a>
            </li>
          </ul>
          <div className="flex">
          <span className="block text-xs text-gray-400 sm:text-center justify-center italic">
            ©2023{" "}
            
              VagasDaqui™{" "}
           
              <a href="https://arthtec.com.br" target="_blank" className="hover:underline hover:text-blue-700">Developed by Gabriel Rabel </a>
          </span>
        </div>
        </div>
        
      </div>
    </footer>
  );
}
