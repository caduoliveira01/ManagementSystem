import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [active, setActive] = useState(true);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redireciona para a home se estiver logado
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#25252b]">
      {/* Container animado */}
      <div
        className="relative h-[30rem] w-[25rem] rounded-2xl overflow-hidden 
          before:content-[''] before:absolute before:inset-0 before:bg-[repeating-conic-gradient(from_var(--a),#ff2770_0%,#ff2770_5%)] before:shadow-[0_15px_50px_#000] before:rounded-2xl before:animate-rotating
          after:content-[''] after:absolute after:inset-1 after:bg-[#2d2d39] after:rounded-[15px] after:border-[5px] after:border-[#25252b]"
      >
        {/* Gradiente secundário animado */}
        <div className="absolute inset-0 bg-[repeating-conic-gradient(from_var(--a),#45f3ff_0%,#45f3ff_5%)] shadow-[0_15px_50px_#000] rounded-2xl animate-rotating animation-delay-[-1s]"></div>

        {/* Conteúdo do formulário */}
        <div className="absolute inset-[40px] flex justify-center items-center flex-col rounded-xl bg-black/20 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] border-b-2 border-white/50 z-[1000] p-10">
          <div className="w-full px-10 space-y-5">
            {active ? <Signup /> : <Login />}
            <div className="text-center text-sm text-gray-300">
              {active ? "Already have an account?" : "Don't have an account?"}
              <Button
                variant="ghost"
                onClick={() => setActive(!active)}
                className="ml-2 text-[#45f3ff] hover:underline p-0 h-auto"
              >
                {active ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
