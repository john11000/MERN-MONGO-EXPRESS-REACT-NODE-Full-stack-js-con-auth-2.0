import "./carrito.css";
import Header from "src/componentes/header/Header";
import AsideC from "./componentes/AsideC";
import TableC from "./componentes/TableC";
import NuevaVenta from "src/componentes/NuevaVenta";
import { useEffect, useState } from "react";
import { GetVentas , PostVentas, GetProductos} from "src/servivios";

function Carrito() {
  const [editar, setEditar]=useState(false);
  const [dataVentas,setDataVentas] = useState([])
  const [todasVentas,setTodasVentas] = useState([])
  const [GetProductosData,setProductosData] = useState([])
  const [GetProductosDataAll,setGetProductosAll] = useState([])
const [isVentaSucces, setisVentaSucces] = useState(false);


  
  
  useEffect(()=>{
   
    (async () => {
      const result = await GetVentas()
      const resultProducts = await GetProductos()
      
      setDataVentas(result.data.respuesta)
      setTodasVentas(result.data.respuesta)
      setProductosData(resultProducts.data.respuesta)
      console.log(result.data.respuesta)
      setGetProductosAll(resultProducts.data.respuesta)
    })()

  },[])

  
  return (
    <div className="contenedor animarEntradas">
      <Header />
      <div className="my-5   container-fluid m-1 align-items-start g-2 row">
        <TableC setisVentaSucces={setisVentaSucces} dataVentas={dataVentas}  editar={editar} todasVentas={todasVentas}   setEditar={setEditar} setTodasVentas={setTodasVentas} setDataVentas ={setDataVentas}/>
        <AsideC editar={editar} todasVentas={todasVentas}  setEditar={setEditar} dataVentas={dataVentas}  setDataVentas={setDataVentas}></AsideC>
        <NuevaVenta setisVentaSucces={setisVentaSucces} GetProductosDataAll={GetProductosDataAll} GetProductosData={GetProductosData} setProductosData={setProductosData} PostVentas={PostVentas}  setTodasVentas={setTodasVentas} setDataVentas ={setDataVentas} GetVentas={GetVentas} setDataVentas={setDataVentas}></NuevaVenta>
      </div>
    </div>
  );
}

export default Carrito;
