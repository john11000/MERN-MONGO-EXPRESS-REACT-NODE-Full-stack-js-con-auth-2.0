import React, { useState } from "react";
import loginImg from "../login.svg";

if (localStorage.getItem("session")) {
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      contraseña: "",
      respuesta: "",
      msgData : "",
      msg :false
    };
    this.loguear = this.loguear.bind(this);
    this.changeCorreo = this.changeCorreo.bind(this);
    this.changeContraseña = this.changeContraseña.bind(this);
  }
  changeCorreo(e) {
    this.setState({ correo: e.target.value });
  }

  changeContraseña(e) {
    this.setState({ contraseña: e.target.value });
  }

  renderMsg(){
    if(this.state.msg){
      
    }
  }

  loguear(e) {
    e.preventDefault();
    var yHeaders = new Headers();
    yHeaders.append("Content-Type", "application/json")

    fetch("https://b-mintic.herokuapp.com/validate/user", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.correo,
        contraseña: this.state.contraseña,
      }),
      headers:yHeaders,
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response.estado != 0) {
          localStorage.setItem("session", response.respuesta);
          window.location.reload();
        } else {
    this.setState({ msgData:response.respuesta });
    this.setState({ msg:true });

        }
      });
  }

  render() {
    return (
      <form
        className="base-container"
        onSubmit={this.loguear}
        ref={this.props.containerRef}
      >
        <div className="header">¿Ya tienes una cuenta?</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="Correo Electrónico">Correo Electrónico</label>
              <input
                type="email"
                name="Correo Electrónico"
                placeholder="Ingresa tu e-mail"
                onChange={this.changeCorreo}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Contraseña">Contraseña</label>
              <input
                type="password"
                name="Contraseña"
                placeholder="Ingresa tu contraseña"
                onChange={this.changeContraseña}
                required
              />
              <p className="bg-dark text-white text-center">
                {this.state.respuesta}
              </p>
              <button type="submit" className="btn btn-success">
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
     
            {this.state.msg && (
                 <div
                 className="alert alert-danger  "
               >
          <strong>Error : </strong>{this.state.msgData}
          </div>
              
            )}
        
 
        <div className="footer"></div>
      </form>
    );
  }
}
