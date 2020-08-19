import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from './../../context/alertas/alertaContext';
import AuthContext from './../../context/auth/authContext';

const Login = (props) => {

  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    email: '',
    password: ''
  });

  const { email, password } = usuario;

  //En caso de que password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history])

  const onChangeSesion = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitSesion = e => {
    e.preventDefault();

    // Validar que no hayan campos vacíos
    if (email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    // Pasarlo al action
    iniciarSesion({ email, password })

  }

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`} > {alerta.msg}</div >) : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form
          onSubmit={onSubmitSesion}
        >
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
}

export default Login;