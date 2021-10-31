import { useState } from "react";

export default function NuevoProducto({GetProductos, setProductsData}) {
  
  const [nombre, setNombre]= useState()
  const [descripcion, setDescripcion]= useState()
  const [valorUnitario, setValorUnitario]= useState()
  const [estado, setEstado]= useState()


  const ChangeNombre =(e)=>{
    setNombre(e.target.value);

  }

  const Changedescripcion =(e)=>{
    setDescripcion(e.target.value);

  }

  const ChangevalorUnitario =(e)=>{
    setValorUnitario(e.target.value);

  }

  const Changeestado =(e)=>{
    setEstado(e.target.value);

  }

  const senData =(e)=>{
    e.preventDefault()
    console.log(nombre)
    console.log(descripcion)
    console.log(valorUnitario)
    console.log(estado)
    

    const url = "https://b-mintic.herokuapp.com/productos";

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ nombre,descripcion, valorUnitario , estado :estado ==="Disponible" ? true : false }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();

        if(json.respuesta==="prodducto ha sido agregado."){
   
          (async () => {
            const result = await GetProductos()
            setProductsData(result.data.respuesta)
          })()
          document.querySelector(".c").click()

          setTimeout(()=>{
            alert(json.respuesta)

          },500)
        }
       
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();


  }

  


  
  return (
    <>
      <div
        className="modal fade animarEntradas"
        id="exampleM2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Añadir Nuevo Producto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="formulario" onSubmit={senData}>
               
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Nombre del producto:
                  </label>
                  <input
                  onChange={ChangeNombre}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    required
                  />
                </div>
              
              
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    descripcion:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                  onChange={Changedescripcion}
                  required

                  ></textarea>
                </div>

                             
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                     Valor unitario:
                  </label>
                  <input
                    type="number"
                  onChange={ChangevalorUnitario}

                    className="form-control"
                    id="recipient-name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Estado del Producto:
                  </label>
                  <select required className="form-select" onChange={Changeestado} defaultValue={""}>
                    <option disabled value="">Selecion el estado</option>
                    <option>Disponible</option>
                    <option>No disponible</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger c"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="submit"
                form="formulario" className="btn btn-success">
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  
 



}