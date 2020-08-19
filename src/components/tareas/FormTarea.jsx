import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from './../../context/tareas/tareaContext';

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);

  const [tarea, guardarTarea] = useState({
    nombre: ''
  });

  const { nombre } = tarea;

  const { proyecto } = proyectosContext;
  const { tareaseleccionada, agregarTarea, validarTarea, errortarea, obtenerTareas, actualizarTarea } = tareasContext;

  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada)
    } else {
      guardarTarea({
        nombre: ''
      })
    }

  }, [tareaseleccionada])


  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const handleChangeTarea = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    })
  }



  const onSubmitTarea = e => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === '') {
      validarTarea();
      return;
    }

    // Revisar si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      // agregar al state
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      tareaseleccionada.proyecto = proyectoActual._id;
      actualizarTarea(tarea);
    }

    //Obtener y filtar las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //reiniciar form
    guardarTarea({
      nombre: ''
    })
  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmitTarea}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChangeTarea}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  );
}

export default FormTarea;