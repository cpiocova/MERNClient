import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from './../../context/alertas/alertaContext';
import AuthContext from './../../context/auth/authContext';


const NuevaCuenta = (props) => {

  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history])


  //State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChangeSesion = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitSesion = e => {
    e.preventDefault();

    // Validar que no hayan campos vacíos
    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    // Password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
      return;

    }

    // Los 2 passwords sean iguales
    if (password !== confirmar) {
      mostrarAlerta('Los passwords no son iguales', 'alerta-error');
      return
    }

    // Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    })
  }

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`} > {alerta.msg}</div >) : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>
        <form
          onSubmit={onSubmitSesion}
        >
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Tu Nombre"
              onChange={onChangeSesion}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Tu Email"
              onChange={onChangeSesion}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Tu Password"
              onChange={onChangeSesion}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              value={confirmar}
              placeholder="Repite tu Password"
              onChange={onChangeSesion}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
          Volver a Iniciar  Sesión
        </Link>
      </div>
    </div>
  );
}

export default NuevaCuenta;