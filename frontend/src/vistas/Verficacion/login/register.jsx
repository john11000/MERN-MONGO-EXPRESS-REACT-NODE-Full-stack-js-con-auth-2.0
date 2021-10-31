import React from "react";
import loginImg from "../login.svg";

export class Register extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      nombre : "",
      correo: "",
      contraseña: "",
      respuesta: "",
      role : "",
      tipo_documento: "",
      documento : "",
    };
    this.registrar = this.registrar.bind(this);
    this.changeCorreo = this.changeCorreo.bind(this);
    this.changeContraseña = this.changeContraseña.bind(this);
    this.changeNombre = this.changeNombre.bind(this);
    this.changeRole = this.changeContraseña.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changetipoD = this.changetipoD.bind(this);
    this.changeDocumento = this.changeDocumento.bind(this);

  }

  handleChange(event) {
    this.setState({role: event.target.value});
  }
changeCorreo(e){
  this.setState({correo : e.target.value});
}
changeNombre(e){
  this.setState({nombre : e.target.value});
}




changetipoD(e){
  this.setState({tipo_documento : e.target.value});

}

changeDocumento(e){
  this.setState({documento : e.target.value});
}




changeContraseña(e){
  this.setState({contraseña : e.target.value});

}

  registrar(e) {
 

    e.preventDefault();
    fetch("https://b-mintic.herokuapp.com/users/", {
      method: "POST",
      body: JSON.stringify({ email: this.state.correo, contraseña  :this.state.contraseña, role:this.state.role, nombre:this.state.nombre , documento : this.state.documento , tipoD : this.state.tipo_documento }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        alert(response.respuesta)
        
       
      });
  }


  render() {
    return (
      <form className="base-container" onSubmit={this.registrar}>
        <div className="header">¿No tienes una cuenta?</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="">
            <select  onChange={this.changetipoD} className="p-1 bg-primary text-white col-12"  required>
            <option value="" className="text-center bg-black">tipo de documento</option>
              <option className="text-center" value="Admin">CC</option>
              <option className="text-center" value="Cliente">TI</option>

            </select>
            <div className="form-group col-5 m-0">
              <label htmlFor="documento"   >documento</label>
              <input type="number" onChange={this.changeDocumento} name="documento" placeholder="Ingresa tu documento"  required/>
            </div>
         
            
            </div>
          
            <div className="form-group">
              <label htmlFor="Nombre completo">Nombre Completo</label>
              <input type="text" onChange={this.changeNombre} name="Ingresa tu nombre y apellido" placeholder="Ingresa tu nombre y apellido"  required/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" onChange={this.changeCorreo} placeholder="Ingresa tu e-mail" required />
            </div>
            <div className="form-group">
              <label htmlFor="Contraseña">Contraseña</label>
              <input type="password" name="Contraseña" onChange={this.changeContraseña} placeholder="Ingresa tu contraseña" required />
            </div>

            <select   onChange={this.handleChange} className="form-group bg-primary text-white form-select"  required>
              <option value="" className="text-center bg-black">Elegir Rol</option>
              <option value="Admin">Admin</option>
              <option value="Vendedor">Vendedor</option>

            </select>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn btn-success form-group p-2">
            Regístrarse
          </button>
        </div>
      </form>
    );
  }
}
