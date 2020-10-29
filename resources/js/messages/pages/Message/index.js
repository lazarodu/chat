import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <div className="col-12">
          <ul>
            {data.map(item => (
              <li key={item.id}>
                {item.user_envio.name}: {item.message}
              </li>
            ))}
          </ul>
        </div>
      </Container>
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
  );
};

export default Message;
