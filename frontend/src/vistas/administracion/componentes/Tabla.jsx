import {  useState } from "react";
import "./estilos/Tabla.css";
export function Tabla(props) {


  let [contenido, setContenido] =  useState("");



  function generarCol(){
    setTimeout(()=>{
      for (let i=0; i< props.contenido.respuesta.length; i++) {
       props.contenido.respuesta[i]
      }
    },3000)
    
  
  }

  return (
    <div className="table-responsive-sm">
      <div>
        <table className="table table-striped table-bordered table-hover ">
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>ROL</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
          {generarCol()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tabla;
