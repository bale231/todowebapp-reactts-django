import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import gsap from "gsap";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {  
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);  

  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [error]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Inserisci username e password.");
      return;
    }
  
    const res = await login(username, password);
  
    if (res.status === 200 && res.message === "login success") {
      setError("");
      navigate("/");
    } else if (res.status === 403) {
      setError("Conferma l'account email prima di proseguire.");
    } else {
      setError("Credenziali errate. Riprova.");
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        ref={formRef}
        className="p-6 rounded-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>

        {error && (
          <div 
            ref={errorRef}
            className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm border border-red-400"
          >
            {error}
          </div>
        )}


        <div className="relative w-full mb-4">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="peer w-full px-4 pt-6 pb-2 border rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Username
          </label>
        </div>

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-4 pt-6 pb-2 pr-10 border rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Password
          </label>
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded border border-blue-600 text-white bg-blue-600 hover:bg-transparent hover:text-blue-600 transition-colors duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-700">
          Non hai un account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}
