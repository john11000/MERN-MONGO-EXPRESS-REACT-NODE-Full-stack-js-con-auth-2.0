import { useState, useEffect } from "react";
import Header from "src/componentes/header/Header";
import NuevoProducto from "src/componentes/NuevoProducto";
import { GetProductos } from "src/servivios";
import Aside from "./componentes/Aside";
import Footer from "./componentes/Footer";
import Table from "./componentes/Table";

export default function Productos() {

  const [isDisable, setIsDisable] = useState(true);
  const [ProductsData, setProductsData] = useState([]);
  const [todosProductos, setTodosProductos] = useState([]);



  const ChangeValues = () => {
    setIsDisable(!isDisable);
  };

  useEffect(()=>{
    (async () => {
      const result = await GetProductos()
      setProductsData(result.data.respuesta)
      setTodosProductos(result.data.respuesta)
    })()
  },[])
    
  return (
    <div id="container animarEntradas">
      <Header />
      <div className="my-5 overflow-auto   container-fluid m-1 align-items-start g-2 row">
        <Table className="overflow-auto" isDisable={isDisable} ProductsData={ProductsData}  setProductsData={setProductsData} GetProductos={GetProductos}/>
        <Aside isDisable={isDisable} setIsDisable={setIsDisable} todosProductos={todosProductos} setProductsData={setProductsData} ProductsData={ProductsData} ></Aside>
    
      </div>
      <NuevoProducto setProductsData={setProductsData} GetProductos={GetProductos} ></NuevoProducto>
     <Footer />
    </div>
  );
}
