import user from '../../../imagenes/usuario.png';
import './estilos/perfil.css';

export function Perfil() {
    return(
        <div className="perfil  mt-2 container-fluid">
            <div className="user_img-">
                <img src={user} className="user mt-2" alt="user" />
            </div>
            <div className="nom_user mt-3">
                <h6>
                        LIGHTWOOUD
                </h6>
                <h6>ID: 1003456789</h6>
                <h6>ROL: ADMINISTRADOR</h6>
            </div>
            <div className="container mx-0 my-5 row d-flex justify-content-center mx-auto">
                <button type="button " className="btn btn-warning col-5 me-2 me-md-0  py-2 my-2 col-md-12">Editar</button>
                <button type="button " className="btn btn-danger col-5 ms-2  ms-md-0  py-2  my-2 col-md-12">Salir</button>
            </div>
    
        </div>
    );
    
}

export default Perfil;