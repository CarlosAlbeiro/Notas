import React from "react";
// import Swal from "sweetalert2";

function Notas({ estado, contenido, fecha, hora, id, funcion }) {
  let boton;

  console.log(typeof(estado)+"<- estado");
  

  if (estado === 0) {
    boton = (
      <button className="btn btn-primary badge badge-pill" onClick={funcion}>
        <span>Terminar</span>
      </button>
    );
  } else {
    boton = <span className="badge badge-pill bg-success">Finalizado</span>;
  }

  return (
    <div className="col-xs-2 col-sm-4 col-lg-3 col-xl-2 mb-2 ">
      <div className="card">
        <div className="card-header">
          <small className="badge text-bg-secondary">{fecha} - {hora}</small>
        </div>
        <div className="card-body cuerpoNota">{contenido}</div>
        <div className="card-footer">{boton}</div>
      </div>
    </div>
  );
}

export { Notas };
