import React, { useContext, useEffect } from 'react';
import AuthContext from './../../context/auth/authContext';


const Barra = () => {

  //Extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      <p className="nombre-usuario">Hola <span>{usuario && usuario.nombre}</span></p>
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >Cerrar Sesión</button>
      </nav>
    </header>
  );
}

export default Barra;