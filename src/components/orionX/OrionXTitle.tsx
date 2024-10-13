import { FiGithub } from "react-icons/fi";

export default function OrionXTitle() {
  return (
    <div className="p-4 w-full bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent text-3xl font-bold flex justify-between items-center">
      <div className="flex items-center">
        <p className="">OrionX </p>
        <p className="px-2 text-sm bg-gradient-to-r from-sky-600 to-blue-700 ml-2 rounded-full text-white font-light">
          Alpha 0.0.1
        </p>
      </div>
      <div className="ml-3 cursor-pointer">
        <a href="https://www.github.com/alenavarroxp">
          <FiGithub size={24} color="white" className="hover:scale-105 transition" />
        </a>
      </div>

    </div>
  );
}
