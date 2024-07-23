import React, { useEffect, useState } from "react";
import axios from "axios"; //Permite hacer peticiones
import { format } from "date-fns";
import { Modal } from "./modal.js";

const contentClass = "text-sm text-card-foreground overflow-auto";

const MainCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }
  
  const [notas_bd, setNotas_bd] = useState([]);

  const peticion_notas = async () => {
    let notas = [];
    //Funcion landa, anonima o flecha asincrona para hacer la peticiopn a la url del api en express
    // e.preventDefault(); // Previene la recarga de la página

    try {
      //Try para encampsular los posibles errores
      const response = await axios.get("http://localhost:3700/listarNota", {
        //Peticion hecha por medio de axios a la url del api
        // Puedes agregar params y headers aquí si es necesario
      });
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
        let contenido = [response.data[i].nota, fecha, hora];
        notas.push(contenido);
      }
    } catch (error) {
      //Encapsulado del error
      console.log("no sirvio");
      console.error(error);
      let contenido = [null, null, null];
      notas.push(contenido);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="grid w-full bg-card shadow-lg rounded-lg overflow-hidden  justify-items-center">
        <div className="p-4 grid grid-cols-1 sm:grind-colds-2 fixed bg-white">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Notas rapidas carlos
          </h2>
          <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-80 p-1 text-white font-bold rounded-full inline-flex items-center justify-center"
           onClick={openModal}>
            Agregar nota
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 scroll-auto mt-20">
          {notas_bd.map((item) =>
            item[0] == null ? (
              <h1 class="rounded overflow-hidden shadow-lg m-3 p-1 center">Sin notas</h1>
            ) : (
              <Card
                title="Card"
                contenido={item[0]}
                fecha={item[1]}
                hora={item[2]}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ contenido, fecha, hora }) => {
  return (
    <div class="rounded overflow-auto shadow-lg mt-5 p-1 h-20">
      <small class=" inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
        {fecha}
        <br></br>
        {hora}
      </small>
      <p className={contentClass}>{contenido}</p>
    </div>
  );
};

export { MainCard };
