export default function Aside({setIsDisable,isDisable, setProductsData, ProductsData , todosProductos}) {
  
  const filtrarDatos = (e)=>{
    setProductsData(todosProductos)
    if(e.target.value.trim()==="" ||ProductsData.lenght===0  ){
      setProductsData(todosProductos)
   }else{
    setProductsData( ProductsData.filter(f=>f._id.includes(e.target.value) || f.nombre.includes(e.target.value) ))
    }

  }
  return (
    <aside className="col-12 col-md-3 bg-dark text-center animarEntradas text-white mx-0 p-2 bordered ">
    <p className="h6 text-center mx-auto my-3">BUSCAR ARTICULO</p>
    <form className=" mx-auto">
      <input
        type="text"
        className="form-control mx-auto text-center"
        placeholder="Put something here to search"
        onChange={filtrarDatos}
      />
      <input
        type="submit"
        className="btn btn-primary mx-auto mt-2"
        value="Buscar"
      />
    </form>
    <div className="Botones my-3">
      <button className="btn btn-primary  col-12 my-2" onClick={()=>{ setIsDisable(!isDisable)}}>Editar</button>
      <button
        className="btn btn-warning col-12  my-2"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleM2"
       
      >
        Añadir
      </button>
      
    </div>
  </aside>
  );
}
