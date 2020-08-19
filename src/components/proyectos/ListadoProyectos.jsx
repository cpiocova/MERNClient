import React, { useEffect, useContext } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from './../../context/proyectos/proyectoContext';
import AlertaContext from './../../context/alertas/alertaContext';

const ListadoProyectos = () => {

  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos, mensaje } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {

    // si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }

    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje])

  if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

  return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      {proyectos.map((proyecto, index) => (
        <Proyecto
          key={proyecto._id}
          proyecto={proyecto}
        />
      ))}
    </ul>
  );
}

export default ListadoProyectos;