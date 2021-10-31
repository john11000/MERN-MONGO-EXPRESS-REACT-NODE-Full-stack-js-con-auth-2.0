import { DeleteProductos, PutProductos } from "src/servivios";

export default function Table({ isDisable, setProductsData, ProductsData, GetProductos }) {

  

const deleteProducto = (id)=>{
      (async () => {
        const resultados = await DeleteProductos({id}) 
        const result = await GetProductos()
        setProductsData(result.data.respuesta)
        if(resultados.data.respuesta.deletedCount==1){
          let e={target:{id, value: "eliminado"}}
          renderMsgBox(e, "estado")
            
          }
        
          
      })()
}

const cambiarEstado =(e)=>{
  (async()=>{
    const respuesta = await PutProductos({id: e.target.id,  estado: e.target.value})
    console.log(respuesta)
    if(respuesta.data.respuesta.modifiedCount===1){
      
    renderMsgBox(e, "estado")
      
    }
  })()


}


const renderMsgBox =   (e,cambio) => {
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
   <span class="h4"> El producto  con ID</span>
      <span class="h4 text-success">${e.target.id}</span>
      <hr>
     <strong> ha cambiado su ${cambio} a ${e.target.value }</strong>
      <hr>
          Han habido cambios en los productos
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

const cambiarValorUnitario =(e)=>{
  if(e.code==="Enter"){
    (async()=>{
      const respuesta = await PutProductos({id: e.target.id,  valorUnitario: e.target.value})
      if(respuesta.data.respuesta.modifiedCount===1){
      
        renderMsgBox(e, "valor unitario")
          
        }
    })()
  }
  }

  const cambiarDescripcion =(e)=>{
    if(e.code==="Enter"){
      (async()=>{
        const respuesta = await PutProductos({id: e.target.id, descripcion : e.target.value})
        if(respuesta.data.respuesta.modifiedCount===1){
      
          renderMsgBox(e, "descripcion")
            
          }
      })()
    }
   
    }




  return (
    <section className="animarEntradas  col-12 col-md-9 order-2 ">
      <div className="notificaciones"></div>
      <table className="table  table-dark table-striped table-hover p-2 text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>nombre</th>
            <th>Descripción</th>
            <th>Valor unitario</th>
            <th>Estado</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          {ProductsData.map((p) => (
            <tr key={p._id} className="animarEntradas">
              <td>{p._id}</td>
              <td>{p.nombre}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder={p.descripcion}
                  disabled={isDisable}
                  id={p._id}
                  onKeyDown={cambiarDescripcion}
                ></input>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder={p.valorUnitario}
                  disabled={isDisable}
                  id={p._id}

                  onKeyDown={cambiarValorUnitario}
                ></input> 
              </td>
              <td>
                {p.estado == true ? (
                  <select
                
                    className="form-control form-select"
                    disabled={isDisable}
                    defaultValue={'true'}

                  >
                    <option   value="true" >Disponible</option>
                    <option value="false">No Disponible</option>
                  </select>
                ) : (
                  <select
                    className="form-control form-select"
                    disabled={isDisable}
                    defaultValue={p.estado}
                    onChange={cambiarEstado}
                    id={p._id}

                  >
                      <option   value="true" >Disponible</option>
                    <option value="false">No Disponible</option>
                  </select>
                )}
              </td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  className="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                </svg>

                <svg
                onClick={()=>{deleteProducto(p._id)}}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  className="bi bi-trash  my-2 mx-auto text-red"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
