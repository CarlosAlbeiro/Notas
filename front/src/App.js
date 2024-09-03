import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import anadir from "./img/anadir.png";
import { Notas } from "./componentes/Notas";
import { Modal } from "./componentes/Modal";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

function App() {
  const [modal, setModal] = useState(false);
  const [notas_bd, setNotas_bd] = useState([]);
  const [estadoBtn, setEstadoBtn] = useState("");

  const finalizarNota = async (id) => {
    try {
      //Try para encampsular los posibles errores
      const response = await axios.post(
        "http://localhost:3700/finalizarNota" ||
          "http://localhost:3700/finalizarNota",
        {
          //Peticion hecha por medio de axios a la url del api
          id: id,
          // Puedes agregar params y headers aquí si es necesario
        }
      );
      console.log("si sirvio");
      console.log(response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota finalizada es id es: " + id,
        showConfirmButton: false,
        timer: 2500,
      });
      peticion_notas();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No pudimos finalizar la nota: " + id,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const abrirModal = () => {
    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
  };

  const peticion_notas = async () => {
    let notas = [];

    try {
      //Try para encampsular los posibles errores
      const response = await axios.get(
        "http://localhost:3700/listarNota" ||
          "http://localhost:3700/listarNota",
        {
          //Peticion hecha por medio de axios a la url del api
          // Puedes agregar params y headers aquí si es necesario
        }
      );
      console.log("si sirvio");
      console.log(response);

      for (let i = 0; i < response.data.length; i++) {
        let fecha = format(
          new Date(response.data[i].fecha_creacion),
          "dd/MM/yyyy"
        );
        let hora = format(
          new Date(response.data[i].fecha_creacion),
          "hh:mm:ss a"
        );
        let contenido = [
          response.data[i].estado,
          response.data[i].nota,
          fecha,
          hora,
          response.data[i].id,
        ];
        notas.push(contenido);
      }
      setEstadoBtn("");
    } catch (error) {
      //Encapsulado del error
      console.log("no sirvio");
      console.error(error);
      let contenido = [null, null, null];
      notas.push(contenido);
      setEstadoBtn("disabled");
    }

    setNotas_bd(notas);
    console.log(notas);
  };

  useEffect(() => {
    peticion_notas(); // Llama la función al montar el componente

    const intervalId = setInterval(peticion_notas, 10000); // Llama cada 30 segundos

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  let claseBtn = "btn btn-primary add " + estadoBtn + "";

  return (
    <div className="App d-flex justify-content-center align-content-center p-3 ">
      <div className="card text-center w-100">
        <div className="card-header">
          <div className="row justify-content-center align-content-center">
            <div className="col-12 col-sm-4">
              <b>Sistema de notas rapidas</b>
            </div>
          </div>
          <div className="row justify-content-center align-content-center">
            <div className="col-12 col-sm-4 ">
              <button
                className={claseBtn}
                onClick={abrirModal}
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <img src={anadir} alt="Cancelar" width={25} />
                &nbsp; Nueva Nota
              </button>
            </div>
          </div>
        </div>
        <div className="card-body h-100 row cuerpo m-1">
          {notas_bd.map((item) =>
            item[0] == null ? (
              <div className="col-xs-12 col-sm-12 col-lg-12 col-xl-12 mb-2 ">
                <div className="card">
                  <div className="card-body cuerpoNota">
                    <h1>Sin notas</h1>
                  </div>
                </div>
              </div>
            ) : (
              <Notas
                estado={item[0]}
                contenido={item[1]}
                fecha={item[2]}
                hora={item[3]}
                id={item[4]}
                funcion={() => {
                  finalizarNota(item[4]);
                }}
              />
            )
          )}
        </div>
        <div className="card-footer text-muted">
          <small>dev.cagg@gmail.com</small>
        </div>
      </div>
      <Modal isOpen={modal} cerrarModal={cerrarModal} funcion={()=>{peticion_notas()}}/>
    </div>
  );
}

export default App;
