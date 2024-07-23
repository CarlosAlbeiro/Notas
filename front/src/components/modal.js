import React, { useState } from "react";
import axios from "axios"; //Permite hacer peticiones
import Swal from "sweetalert2"

const Modal = ({ isOpen, onClose }) => {
  const [addNota, setAddNota] = useState('');
  const escribir_nota =(event)=>{
    setAddNota(event.target.value)
  }
  const crear_Notas = async () => {
    console.log("Nota ->"+addNota)
    try {
        //Try para encampsular los posibles errores
        const response = await axios.post("http://localhost:3700/crearNota", {
            nota:addNota
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
          timer: 2500
        });
        onClose();
  
      } catch (error) {
        //Encapsulado del error
        console.log("no sirvio");
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Lo siento no pudismos guardar tu nota.",
          showConfirmButton: false,
          timer: 2500
        });
        onClose();
      }
    //Funcion landa, anonima o flecha asincrona para hacer la peticiopn a la url del api en express
    // e.preventDefault(); // Previene la recarga de la página
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6 z-10">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-semibold">Agregar Nota</h3>
          
          <button onClick={onClose} className="text-black">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={addNota}
            onChange={escribir_nota}
            placeholder="Escribe tu nota aqui..."
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={crear_Notas}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
