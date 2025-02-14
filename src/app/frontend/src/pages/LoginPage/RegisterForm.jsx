import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function RegisterForm({ toggleRegister }) {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="container">
      <h2>Registrar</h2>
      <p>
        Sistema de acompanhamento de gatos e adoções exclusivo para voluntários
        da SOS Gatinhos do Parque
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Digite seu Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Digite sua Senha"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Registrar</button>
        <span>
          Já possui uma conta ?
          <a onClick={() => toggleRegister()}> Entrar</a>
        </span>
      </form>
    </div>
  );
}

export default RegisterForm;
