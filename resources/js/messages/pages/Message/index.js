import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsCheckAll } from "react-icons/bs";
import { Container } from "./styles";
import api from "../../../services/api";

const Message = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);

  async function loadMessages() {
    const response = await api.get("messages");
    setData(response.data.data);
  }

  useEffect(() => {
    loadMessages();
    const interval = setInterval(() => {
      loadMessages();
    }, 4000);
  }, []);

  const handleLido = useCallback(id => {
    async function lido() {
      const response = await api.put(`messages/${id}`);
      loadMessages();
    }
    lido();
  }, []);

  const onSubmit = useCallback(
    async data => {
      try {
        await api.post(`messages`, data);
        toast.success("Mesagem enviada");
        document.querySelector("input[name=message]").value = "";
        loadMessages();
      } catch (error) {
        toast.error(error.message);
      }
    },
    [history]
  );

  return (
    <>
      <Container>
        <div className="col-12">
          <ul>
            {data.map(item => (
              <li key={item.id} className="d-flex">
                <span>
                  {item.user_envio.name}: {item.message}
                </span>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleLido(item.id)}
                >
                  <BsCheckAll />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group d-flex">
          <input
            type="text"
            name="message"
            className="form-control col-10"
            required
            ref={register({ required: true })}
          />
          <div className="col-2">
            <button className="btn btn-primary " type="submit">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Message;
