import Logo from "../assets/logo.png"

export default function Footer(params) {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 mt-5">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 px-5">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img
              src={Logo}
              className="max-w-[200px]"
              alt="VagasDaqui Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Vagas
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Currículos
              </a>
            </li>
            <li>
              <a href="/termos" className="mr-4 hover:underline md:mr-6 ">
                Termos de uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="/" className="hover:underline">
            VagasDaqui™
          </a>
          . All Rights Reserved. Developed by Gabriel Rabel
        </span>
      </div>
    </footer>
  );
}
