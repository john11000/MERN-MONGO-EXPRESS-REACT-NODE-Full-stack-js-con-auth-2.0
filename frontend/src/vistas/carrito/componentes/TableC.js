
import { DeleteVentas, PutVentas } from "src/servivios";

export default function TableC({
  dataVentas,
  editar,
  setEditar,
  todasVentas ,
  setTodasVentas,
  setDataVentas,
  GetProductosData,
  setProductosData,
  GetProductosDataAll,
  setisVentaSucces
}) {



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
     <span class="h4"> El producto con ID</span>
        <span class="h4 text-success">${e.target.id}</span>
        <hr>
       <strong> ha cambiado su ${cambio} a ${e.target.value}</strong>
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



  const updateState = async (e) => {
    const respuestaFromServer = await PutVentas({
      estado: e.target.value,
      id: e.target.id,
    });
    

    const ventaEstado =  dataVentas.map((v=>{
     
      if(v._id== e.target.id){

        return v.estado = e.target.value
      
      }
    }))

    if(respuestaFromServer.data.respuesta.modifiedCount==1){
      renderMsgBox(e, "Estado")

    }
  };
  const deleteProducto = (id) => {
    (async () => {
       await DeleteVentas({ id });
      setTodasVentas(todasVentas.filter((d) => d._id !== id));
      setDataVentas(dataVentas.filter((d) => d._id !== id));
    })();
  };
  const arrSelect = ["en proceso", "entregado", "no entregado"];
  const renderOption = arrSelect.map((option) => {
    return <option key={option}>{option}</option>;
  });

  const total = (ar) => {
    let totalres = 0;
    ar.map((d) => {
      totalres += parseInt(d.valorU) * parseInt(d.cantidad);
    });
    return totalres;
  };
  const setVentas = dataVentas.map((v, i) => {
    return (
      <tr key={i} className="animarEntradas">
        <td>{v._id}</td>
        <td>
          <div className="accordion accordion-flush animarEntradas" id={i}>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#p${i}p`}
                  aria-expanded="false"
                  aria-controls={`p${i}p`}
                >
                  {v.productos.length} productos
                </button>
              </h2>
              <div
                id={`p${i}p`}
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <table className="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>cantidad</th>
                        <th>valor U</th>
                      </tr>
                    </thead>
                    <tbody>
                      {v.productos.map((pro) => (
                        <tr key={pro.id}>
                          <td>{pro.id}</td>
                          <td>{pro.nombre}</td>
                          <td>{pro.cantidad}</td>
                          <td>{pro.valorU}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td> {total(v.productos)}</td>

        <td>{v.fecha}</td>
     
        <td>{v.cliente_documento}</td>
        <td>{v.nombre_cliente}</td>
        {editar ? (
          <td>
            <select
              className="form-control form-select text-center"
              defaultValue={v.estado}
              id={v._id}
              onChange={updateState}
            >
              {renderOption}
            </select>
          </td>
        ) : (
          <td>{v.estado}</td>
        )}

        <td>{v.vendedor_id}</td>
        <td>
          <svg
            onClick={() => {
              deleteProducto(v._id);
            }}
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
    );
  });

  return (

    <section className="content animarEntradas tas col-12 col-md-10 order-2 order-md-1">
      <div className="notificaciones "></div>
  
      <table className="table table-dark table-striped table-hover p-2 text-center">
        <thead>
          <tr>
            <th>id</th>
            <th>productos</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Cliente id</th>
            <th>Cliente</th>
            <th>Estado de venta</th>
            <th>Vendedor</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>{setVentas}</tbody>
      </table>
    </section>
  );
}
