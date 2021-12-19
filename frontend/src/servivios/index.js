import axios from "axios";

const baseUrl= () => {
  return "http://localhost:5000";
};

const Verificar = () => {
  if (localStorage.getItem("session") == null) {
    console.log(window.location.pathname);
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  } else {
  
    if (localStorage.getItem("session")) {
      (async function () {
        const respuesta = await fetch(baseUrl() + "/", {
          headers: {
            "access-token": localStorage.getItem("session"),
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        const res = await respuesta.json();
        res.mensaje = res.respuesta
        if (
          res.mensaje !== "Token inválida" &&
          res.mensaje !== "Token no proveída."
        ) {
          if (window.location.pathname === "/") {
            window.location.href = "/Productos";
          }
        } else {
          localStorage.removeItem("session");
          window.location.href = "/";
        }
      })();
    }
  }
};

//ventas

const GetVentas = async () => {
  const res = await axios.get(baseUrl()+ "/ventas", {
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  res.data.respuesta.reverse();
  return res;
};

const PostVentas = async (body) => {
  const res = await axios.post(baseUrl()+ "/ventas", {
    body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const PutVentas = async (body) => {
  const res = await axios.put(baseUrl()+ "/ventas", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const DeleteVentas = async (body) => {
  const res = await axios.delete(baseUrl()+ "/ventas", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

//productos

const GetProductos = async () => {
  const res = await axios.get(baseUrl()+ "/productos", {
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const PostProductos = async () => {
  const res = await axios.get(baseUrl()+ "/productos", {
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const PutProductos = async (body) => {
  const res = await axios.put(baseUrl()+ "/productos", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const DeleteProductos = async (body) => {
  const res = await axios.delete(baseUrl()+ "/productos", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

  return res;
};

//usuarios

const GetuserData = async () => {
  const res = await axios.get(baseUrl() + "/users", {
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const PostUsuarios = async () => {
  const res = await axios.post(baseUrl()+ "/users", {
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const PostUsuariosGoogle = async (body) => {
  const res = await axios.post(baseUrl()+ "/users/google", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const PutUsuarios = async (body) => {
  const res = await axios.put(baseUrl()+ "/users", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

const Deleteusuarios = async (body) => {
  const res = await axios.delete(baseUrl()+ "/users", {
    data: body,
    headers: {
      "access-token": localStorage.getItem("session"),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

  return res;
};

export {
  Verificar,
  PostProductos,
  Deleteusuarios,
  PostUsuarios,
  GetVentas,
  PostVentas,
  GetProductos,
  DeleteProductos,
  DeleteVentas,
  GetuserData,
  PostUsuariosGoogle,
  PutUsuarios,
  PutVentas,
  PutProductos,
  baseUrl,
};
