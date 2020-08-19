import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
} from "./../../types";

import clienteAxios from "./../../config/axios";

const TareaState = (props) => {
	const initialState = {
		tareasproyecto: [],
		errortarea: false,
		tareaseleccionada: null,
	};

	// dispatch y state
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	const obtenerTareas = async (proyecto) => {
		try {
			const resultado = await clienteAxios.get("/api/tareas", {
				params: { proyecto },
			});
			dispatch({
				type: TAREAS_PROYECTO,
				payload: resultado.data.tareas,
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const agregarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.post("/api/tareas", tarea);
			console.log(resultado.data);
			dispatch({
				type: AGREGAR_TAREA,
				payload: resultado.data.tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const validarTarea = (_) => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	const eliminarTarea = async (tareaId, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${tareaId}`, {
				params: { proyecto },
			});
			dispatch({
				type: ELIMINAR_TAREA,
				payload: tareaId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const actualizarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea
			);
			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: resultado.data.tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const guardarTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				guardarTareaActual,
				actualizarTarea,
			}}
		>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
