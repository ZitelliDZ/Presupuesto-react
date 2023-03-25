import { useState,useEffect } from 'react';
import CerraBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ({setGastoEditar,setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar}) => {


    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [])
    
    const [mensaje,setMensaje] = useState('');

    const [nombre,setNombre] = useState('');
    const [cantidad,setCantidad] = useState('');
    const [categoria,setCategoria] = useState('');
    const [fecha,setFecha] = useState('');
    const [id,setId] = useState('');
    
    const handleSubmit = (e)=>{
        e.preventDefault();
         if ([nombre,cantidad,categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
         }

         guardarGasto({nombre,cantidad,categoria,id,fecha});
         
    }

    const ocultarModal = ()=>{
        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
           
        }, 500);
        setGastoEditar({});
    }


  return (
    <div className="modal" >
        <div className="cerrar-modal" >
            <img src={CerraBtn} alt="cerrar modal" 
                onClick={ocultarModal}
            />
        </div>

        <form action="" className={`formulario ${animarModal? "animar":"cerrar"}`} onSubmit={handleSubmit}>
            <legend>{gastoEditar.nombre ? 'Editar Gasto':'Nuevo Gasto'}</legend>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}


            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input type="text" id="nombre" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder='Añade el Nombre del Gasto' />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad Gasto</label>
                <input type="number" id="cantidad" value={cantidad} onChange={e =>{setCantidad(Number(e.target.value))}} placeholder='Añade la Cantidad del Gasto' />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria Gasto</label>
                <select name="categoria" value={categoria} onChange={e=>setCategoria(e.target.value)} id="categoria">
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="otros">Otros</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre ? 'Editar Gasto':'Añadir Gasto'} />

        </form>
    </div>
  )
}

export default Modal