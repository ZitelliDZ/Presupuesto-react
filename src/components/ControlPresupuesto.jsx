import { useState,useEffect } from "react"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const ControlPresupuesto = ({setIsValidPresupuesto,presupuesto,gastos,setGastos,setPresupuesto}) => {

    const [disponible,setDisponible] = useState(0);
    const [gastado,setGastado] = useState(0);

    const [porcentaje,setPorcentaje] = useState(0);
   
    useEffect(() => {
      const totalgastado = gastos.reduce((total, gasto)=>{
        return gasto.cantidad + total;
      },0)
      setGastado(totalgastado);
      setDisponible(presupuesto-totalgastado);

      const nuevoPorcentaje = (( (totalgastado) / presupuesto ) * 100).toFixed(2);

      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
      }, 1000);
    }, [gastos,presupuesto])
    
    
    const formatearCantidad = (Cantidad)=>{
        return Cantidad.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'
        })
    }

    const handleResetApp = () =>{
      const resultado = confirm('Estas seguro que desea Resetear?');
      if (resultado) {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);
      }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
          <CircularProgressbar 
            value={porcentaje}
            styles={buildStyles({
              pathColor: porcentaje>100? '#DC2626' :'#3B82F6',
              trailColor: '#F5F5F5',
              textColor:porcentaje>100? '#DC2626' :'#3B82F6',
            })}
            text={`${porcentaje}% Gastado`}

          />
        </div>
        <div className="contenido-presupuesto">
          <button type="button" onClick={handleResetApp} className="reset-app">
            Resetear App
          </button>
            <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
            <p className={`${disponible < 0 ? 'negativo':''}`}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
            <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto