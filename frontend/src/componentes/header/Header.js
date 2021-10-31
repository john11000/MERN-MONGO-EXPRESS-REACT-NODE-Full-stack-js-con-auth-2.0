import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../imagenes/logo_calzadoMintic.png";
import { GetuserData } from "../../servivios";
export default function Header() {



  const [dataUsuario, setDataUsuario] = useState([{nombre:"",fotoUrl:"", roles:""}]);



  function logout() {
    localStorage.removeItem("session");
    window.location.reload();
  }

  useEffect( async() => {
      const userdata = await GetuserData();
      console.log(userdata.data);
      setDataUsuario(userdata.data.respuesta);
      if(window.location.pathname=="/Administration" && userdata.data.respuesta.roles.toLowerCase()!=="Admin".toLocaleLowerCase()){
        window.location.href="/Carrito"
        alert("forbidden")

      }
 
   
  }, []);

  return (
    <div className="container-fluid mx-0 bg-dark text-white g-0 animarEntradas p-3">
      <div className="row">
        <div className="col-3 col-md-1">
          <img
            src={logo}
            className="rounded float-start img-fluid"
            alt="logo"
          />
        </div>
        <div className="col-4 col-md-6 text-center contenedor_titulo">
          <h1 className="h4 text-center ">CALZADO MINTIC<span>&#160;</span></h1>
        </div>
        <div className="d-flex align-items-center justify-content-end col-4">
          <form className="w-50 me-2 align-items-center">
            <input
              type="search"
              className="form-control text-center"
              placeholder={dataUsuario.nombre}
              aria-label="Search"
              disabled
            />
          </form>
          <div className="flex-shrink-0 dropdown ">
            <a
              href="#a"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >

              <img
                src={dataUsuario.fotoUrl} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn-0.emojis.wiki/emoji-pics/apple/pensive-face-apple.png"}}
                alt="mdo"
                width="35"
                height="35"
                className="rounded-circle"
              />
            </a>
            <ul
            className="dropdown-menu text-small shadow overflow-hidden  mx-auto col-4"
            aria-labelledby="dropdownNavLink"
          >
             <li  className="dropdown-item id_usuario overflow-hidden  text-white bg-dark">
              {dataUsuario._id}
            </li>
            <li className="dropdown-item  text-white bg-dark">
             soy  {dataUsuario.roles}
            </li>
            <li onClick={logout} className="dropdown-item">
              Cerrar sessión
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {dataUsuario.roles =="admin"
        ?     <Link className="dropdown-item" to="/Administration">
        Administración
      </Link>
        :     <li  className="dropdown-item"  onClick={()=>alert(`el usuario ${dataUsuario.nombre} con id ${dataUsuario._id}, documento ${dataUsuario.documento} es un ${dataUsuario.roles} y no puede acceder a administración`)}  >
        Administración
      </li>
      }
            <li >
          
            </li>
            <li>
              <Link className="dropdown-item" to="/Productos">
                Productos
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/Carrito">
                Ventas
              </Link>
            </li>
          </ul>
          </div>
        </div>

       
      </div>
      <hr/>
    </div>
  );
}
