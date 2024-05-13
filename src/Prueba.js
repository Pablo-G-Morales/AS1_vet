import { useState } from "react";
import {
  RiMailCheckFill,
  RiKey2Fill,
  RiEyeFill,
  RiEyeOffFill,
  RiUserAddFill,
} from "react-icons/ri";
import { toast } from "react-toastify";

const Prueba = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // evitamos que manden formularios vacios
    if ([email, password].includes("")) {
      toast.error("Todos los campos son obligatorios", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white px-8 pt-6 pb-8 mb-4 shadow-md rounded-lg w-full md:w-96">
        <div className="mb-10">
          <h1 className="text-3xl uppercase font-bold text-center">
            Crear Cuenta
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-5">
          {/* Nombres */}
          <div className="relative">
            <RiUserAddFill className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
              placeholder="Nombres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Apellidos */}
          <div className="relative">
            <RiUserAddFill className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
              placeholder="Apellido"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="relative">
            <RiMailCheckFill className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="relative">
            <RiKey2Fill className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
              placeholder="Constraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <RiEyeOffFill
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            ) : (
              <RiEyeFill
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            )}
          </div>
          <div className="relative">
            <RiKey2Fill className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
              placeholder="Confirmar Constraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <RiEyeOffFill
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            ) : (
              <RiEyeFill
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            )}
          </div>
          <div>
            <button className="mt-6 bg-sky-600 text-white py-2 px-7 rounded-lg w-full uppercase hover:scale-105 transition-all">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prueba;