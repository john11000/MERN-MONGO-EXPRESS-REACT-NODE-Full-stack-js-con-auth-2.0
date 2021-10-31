
export default function AsideC({editar, setEditar, dataVentas, todasVentas,  setDataVentas}){

  const filtrarDatos = (e)=>{
    setDataVentas(todasVentas)
    console.log(e.code)
    if(e.target.value.trim()=="" ||dataVentas.lenght==0  ){
        setDataVentas(todasVentas)
   }else{
      setDataVentas( dataVentas.filter(f=>f._id.includes(e.target.value) || f.nombre_cliente.includes(e.target.value) || f.vendedor_id.includes(e.target.value) ||f.estado.includes(e.target.value)|| f.fecha.includes(e.target.value)))
    }

  }
    return(  <aside className="bg-dark animarEntradas p-4 mx-auto col-12 col-md-2 order-1  ">
    <p className="h1 text-white text-center ">Barra de busqueda</p>
    <form className="row mx-auto">
      <input
        type="text"
        className="form-control col-12 text-center p-2 mt-2"
        placeholder="Que desea buscar?"
        onChange={filtrarDatos}
        
      />
      <input type="button"  className="btn btn-primary col-12 " value="Buscar" />
    </form>

    <div className="topnav" />
    <div className="row mx-auto my-2 g-2"> 

    <button className="btn btn-warning col-12 col-md-6 " type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" >
       Añadir
    </button>
    <button className="btn btn-primary col-12 col-md-6" type="button" onClick={()=>setEditar(!editar)}>
      Modificar
    </button>

    </div>

  </aside>);
}