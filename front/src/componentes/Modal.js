import React, { useState } from "react";
import guardar from "../img/guardar.png";
import cancelar from "../img/cancelar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";

const Modal = ({ isOpen, cerrarModal, funcion }) => {
  const [addNota, setAddNota] = useState("");

  const escribir_nota = (event) => {
    setAddNota(event.target.value);
  };

  const crearNotas = async () => {
    console.log("Nota ->" + addNota);
    try {
      //Try para encampsular los posibles errores
      const response = await axios.post("http://localhost:3700/crearNota", {
        nota: addNota,
        //Peticion hecha por medio de axios a la url del api
        // Puedes agregar params y headers aquí si es necesario
      });
      console.log("si sirvio");
      console.log(response);
      setAddNota("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota guardada exitosamente.",
        showConfirmButton: false,
        timer: 2500,
      });
      cerrarModal();
      funcion();
    } catch (error) {
      //Encapsulado del error
      console.log("no sirvio");
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Lo siento no pudismos guardar tu nota.",
        showConfirmButton: false,
        timer: 2500,
      });
      cerrarModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Para simular el backdrop
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Crear nota
            </h5>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              rows="4"
              value={addNota}
              onChange={escribir_nota}
              placeholder="Escribe tu nota aquí..."
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={cerrarModal}
            >
              <img src={cancelar} alt="Cancelar" width={25} />
              &nbsp; Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={crearNotas}
            >
              <img src={guardar} alt="Guardar" width={25} />
              &nbsp; Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
