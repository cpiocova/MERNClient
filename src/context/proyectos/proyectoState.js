import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR,
} from "./../../types";

import clienteAxios from "./../../config/axios";

const ProyectoState = (props) => {
	const initialState = {
		proyectos: [],
		formulario: false,
		errorformulario: false,
		proyecto: null,
		mensaje: null,
	};
	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(proyectoReducer, initialState);

	// Serie de funciones para el crud
	const mostrarFormulario = (_) => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	//Obtener los proyectos
	const obtenerProyectos = async (_) => {
		try {
			const resultado = await clienteAxios.get("/api/proyectos");
			dispatch({
				type: OBTENER_PROYECTOS,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const agregarProyecto = async (proyecto) => {
		try {
			const resultado = await clienteAxios.post("/api/proyectos", proyecto);
			dispatch({
				type: AGREGAR_PROYECTO,
				payload: resultado.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const mostrarError = (_) => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};

	const proyectoActual = (proyectoId) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId,
		});
	};

	const eliminarProyecto = async (proyectoId) => {
		try {
			await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoId,
			});
		} catch (error) {
			const alterta = {
				msg: "Hubo un error",
				categoria: "alerta-error",
			};
			dispatch({
				type: PROYECTO_ERROR,
				payload: alterta,
			});
		}
	};

	return (
		<proyectoContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				mensaje: state.mensaje,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto,
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	);
};

export default ProyectoState;
