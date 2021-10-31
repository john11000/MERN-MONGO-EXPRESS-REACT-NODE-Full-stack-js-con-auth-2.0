import { useState } from "react";

export default function NuevaVenta({
  PostVentas,
  GetVentas,
  setDataVentas,
  GetProductosData,
  setProductosData,
  GetProductosDataAll,
  setisVentaSucces
}) {
  const [cliente_documento, setcliente_documento] = useState();
  const [nombre_cliente, setnombre_cliente] = useState();
  const [estado, setEstado] = useState();
  const [ProductosSelecionados, setProductosSelecionados] = useState([]);
  const [vendedor_id, setvendedor_id] = useState();

  const buscarProducto = (e) => {
    setProductosData(GetProductosDataAll.filter(f=>f.estado !=="false"));
    console.log(GetProductosData.length);
    if (e.target.value.trim() === "" || GetProductosData.length === 0) {
      setProductosData(GetProductosDataAll);
    } else {
      setProductosData(
        GetProductosData.filter(
          (f) =>
         (  f.estado==="true" && f._id.includes(e.target.value)) ||( f.estado==="true" &&  f.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
        )
      );
    }
  };

  const ChangeCD = (e) => {
    setcliente_documento(e.target.value);
  };

  const ChangeN = (e) => {
    setnombre_cliente(e.target.value);
  };


  const Changeestado = (e) => {
    setEstado(e.target.value);
  };


  const Changevid = (e) => {
    setvendedor_id(e.target.value);
  };

  const cantidadProducto = (e) => {
    console.log(e);
    let array = ProductosSelecionados;

  console.log(array)

    if (e.key === "Enter") {
      const producto = GetProductosDataAll.filter(f=>f._id===e.target.id)
      array.push({
        id: e.target.id,
        cantidad: e.target.value,
        nombre: e.target.name,
        valorU: producto[0].valorUnitario
      });
      array = array.filter((f) => f.id !== e.target.id);
      setProductosData(GetProductosData.filter((f) => f._id !== e.target.id && f.estado ==="true"));
    }
  };

  const sendData = (e) => {
   e.preventDefault()
    const fechaActual = Date.now();

    const url = "https://b-mintic.herokuapp.com/ventas";

    const fetchData = async () => {
      if(ProductosSelecionados.length ===0){
        return alert("para guardar un producto dar en enter cuando ponga la cantidad, los productos estan vacios.")

      }
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            
            estado,
            fecha: fechaActual,
            cliente_documento,
            nombre_cliente,
            vendedor_id,
            productos : ProductosSelecionados
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json.respuesta)
     
      
        if(json.respuesta==="una venta ha sido agregado."){
          (async () => {
            const result = await GetVentas();
            setDataVentas(result.data.respuesta);
          renderMsgBox(e={id:result.data.respuesta[0]._id, value:"asa"},"agregado")
          document.querySelector("#datosFormulario").reset()
          setProductosData([])

            
          })();
          document.querySelector(".btnClose").click();
          setisVentaSucces(true)

        }

        if (json.respuesta === "prodducto ha sido agregado.") {
          window.location.reload();
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };
  const renderMsgBox =   (id,cambio) => {
    document.querySelector(".notificaciones").innerHTML = `  <div class="position-fixed  msgBox  p-3  ">
    <div
      id="liveToast"
      class="toast msg-box-alert mgsBox  "
      role="alert"
      aria-live="assertive"
      data-bs-autohide="true"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">art dev</strong>
        <small> respuesta del servidor</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">
     <span class="h4"> una venta  con ID</span>
        <span class="h4 text-success">${id.id}</span>
        <hr>
       <strong> ha sido agregada </strong>
        <hr>
        se ha modificado con exito
        <hr>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>
        Cambios realizados el 
        ${Date().toLocaleString()}

      </div>
    </div>
  </div>`
    document.querySelector("#liveToast").classList.toggle("show");
    window.location.href="#liveToast"
    setTimeout(()=>{
      document.querySelector(".notificaciones").innerHTML =""
    },3000)
  }
  const renderResultados = GetProductosData.filter(f=>f.estado==="true").slice(0, 5).map((p,i) => {
   
    return (
      <li key={p._id} className="list-group-item bg-dark text-white ">
        {p._id} - <strong>{p.nombre.toUpperCase()}</strong>
        <input
          type="number"
          className="form-control"
          placeholder="cantidad"
          id={p._id}
          data={p.valorUnitario}
          nickname={p.valorUnitario}
          name={p.nombre.toUpperCase()}
          onKeyDown={cantidadProducto}
        ></input>
      </li>
    );
  });

  const renderselecionados = ProductosSelecionados.map((p) => {
    console.log(p.id)
    return (
      <tr  key={p}
        
        >
        <td onClick={(e)=>{
   let arr =GetProductosData
   arr.push(ProductosSelecionados.filter(f=>f.id === e.target.id))
setProductosData(GetProductosDataAll)
     
     
         ProductosSelecionados.filter(f=>f.id !== e.target.id)
      
      document.querySelector(".dataTableSelected").innerHTML =""
   
      return renderselecionados
        
       
      }} >{p.id}</td>
        <td>{p.nombre}</td>
        <td>{p.cantidad}</td>
        <td>{p.valorU}</td>
      </tr>
    );
  });

 

  return (
    <>
    <div className="notificaciones"></div>
      <div
        className="modal fade animarEntradas"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable ">
          <div className="modal-content bg-black text-center text-white">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Añadir Nueva Venta
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={sendData} id="datosFormulario">
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Id del cliente:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="recipient-name"
                    onChange={ChangeCD}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Nombre del cliente:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={ChangeN}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Nombre del vendedor:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    required
                    onChange={Changevid}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Estado de la Venta:
                  </label>

                  <select className="form-select" onChange={Changeestado} defaultValue={""} required>
                    <option disabled value="">selecione el estado</option>
                    <option>Pendiente</option>
                    <option>Entregado</option>
                    <option>En proceso</option>
                    
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text " className="col-form-label">
                    Productos:
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="producto a agregar"
                    onChange={buscarProducto}
                  ></input>
                </div>
              
                <div className="mb-3">  <ul className="list-group">{renderResultados}</ul></div>
          
                  <table className="table overflow-auto table-dark table-striped text-center mh-50 ">
                  <thead>
                    <tr >
                      <th>id</th>
                      <th>nombre</th>
                      <th>cantidad</th>
                      <th>Valor unitario</th>
                    </tr>
                  </thead>
                  <tbody className="dataTableSelected">{renderselecionados}</tbody>
                </table>
                
                </form>
            
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btnClose"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                form="datosFormulario"
                className="btn btn-success"
               
              >
                Añadir
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}