import { useState, useEffect } from "react"
const Filtro = ({filtro,setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
        <form action="">
            <div className="campo">
                <label htmlFor="">Filtrar Datos</label>
                <select name="filtro" id="filtro" value={filtro} onChange={e=>setFiltro(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="otros">Otros</option>
                </select>
            
            </div>
        </form>
    </div>
  )
}

export default Filtro