import "./App.css";
import { useEffect, useState } from "react";
import Header from "src/componentes/header/Header";
import { PutUsuarios } from "src/servivios";
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
function Administracion() {
  const [data, setData] = useState([]);
  const [isDisable, setIsDisable] = useState(true);
  const [dataFromServer, setDataFromServer] = useState(
    "no ha habido ningun cambio"
  );
  const [date, setddate] = useState(Date());

  const [dataUsuarios, setdataUsuarios] = useState([]);
  const [dataUsuariosAll, setdataUsuariosAll] = useState([]);
  const [editData, setEditData] = useState([]);

  const filtrarDatos = (e) => {
    setdataUsuarios(dataUsuariosAll);
    if (e.target.value.trim() == "" || dataUsuarios.lenght == 0) {
      setdataUsuarios(dataUsuariosAll);
    } else {
      setdataUsuarios(
        dataUsuarios.filter(
          (f) =>
            f.documento.includes(e.target.value) ||
            f.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };


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
     <span class="h4"> El usaurio con ID</span>
        <span class="h4 text-success">${e.target.name}</span>
        <hr>
       <strong> ha cambiado su ${cambio} a ${e.target.value}</strong>
        <hr>
        ${dataFromServer}
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

  

  const saveChanges = (e) => {
    if (e.target.id == "estado") {
      (async () => {
        const res = await PutUsuarios({
          id_usuario: e.target.name,
          estado: e.target.value,
        });
        console.log(res.data)
        if(res.data.respuesta.modifiedCount==1){

          console.log(res);
          setDataFromServer(
            ` los datos  han sido modificado`
          );
          renderMsgBox(e,"estado")
        
        }else{
          setDataFromServer(
            `... modificado`
          );
        }
     
      })();
    } else {
      (async () => {
        const res = await PutUsuarios({
          id_usuario: e.target.name,
          role: e.target.value,
        });
        if(res.data.respuesta.modifiedCount==1){
          console.log(res);
          setDataFromServer(
            ` los datos  han sido modificado`
            
          );
          renderMsgBox(e,"rol")

        }else{
          setDataFromServer(
            `... modificado`
          );
        }
      })();
    }

    console.log();

    // if(e.target.id=="estado"){
    //   const dato = array.map(n=>{
    //     if(n._id==e.target.name){
    //      return n.estado=e.target.value
    //     }
    //   })
    // }else{
    //   const dato = array.map(n=>{
    //     if(n._id==e.target.name){
    //      return n.role=e.target.value
    //     }
    //   })
    // }
  };

  useEffect(() => {
    const url = "https://b-mintic.herokuapp.com/administracion/obtener";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.respuesta);
        setdataUsuarios(json.respuesta);
        setdataUsuariosAll(json.respuesta);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const ChangeValues = () => {
    setIsDisable(!isDisable);
  };

  const SaveData = () => {
    (async () => {
      const res = await PutUsuarios({});
      console.log(res.data.respuesta);
    })();
  };

  return (
    <div className="App animarEntradas">
      <div className="notificaciones "></div>

      <Header />

      <input
        type="search"
        placeholder="put something here"
        onChange={filtrarDatos}
        className="form-control mx-auto w-50 my-3"
      ></input>
      <div className="tabla-usuario d-flex justify-content-end">
        <div className="container-fluid row g-1 ">
          <div className="col-12 col-md-8 my-5 mx-auto order-last order-md-first ">
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
                    {dataUsuarios.map((user, i) => (
                      <tr className="bg-info" key={i}>
                        <td>{user.documento}</td>
                        <td>{user.nombre}</td>

                        <td>
                          <select
                            onChange={saveChanges}
                            className="form-control form-select"
                            disabled={isDisable}
                            defaultValue={user.role}
                            name={user._id}
                            id="role"
                          >
                            <option className="form-control" value={user.role}>
                              {user.role}
                            </option>
                            <option className="form-control" value="admin">
                              Admin
                            </option>
                            <option className="form-control" value="vendedor">
                              Vendedor
                            </option>
                          </select>
                        </td>
                        <td>
                          <select
                            className="form-control form-select"
                            defaultValue={user.estado}
                            disabled={isDisable}
                            onChange={saveChanges}
                            name={user._id}
                            id="estado"
                          >
                            <option
                              className="form-control"
                              value={user.estado}
                            >
                              {user.estado}
                            </option>
                            <option className="form-control" value="autorizado">
                              autorizado
                            </option>
                            <option
                              className="form-control"
                              value="no autorizado"
                            >
                              no autorizado
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="row container mx-auto my-5">
        <button
          id="btnSearch"
          className="btn mx-2 btn-primary btn-md center-block col-sm-10 mx-auto my-1 col-md-5 g-md-2 m-2 g-1"
          onClick={ChangeValues}
        >
          Modificar
        </button>


   
      </div>
    </div>
  );
}

export default Administracion;
