import { habitacionUrl } from '../urls'
import { vueHttp } from './../servicioRest'

const state = {
  habitaciones: []
}

const mutations = {
  SET_HABITACIONES (state, habitaciones) {
    state.habitaciones = habitaciones
  },
  UPDATE_HABITACION (state, habitacion) {
    const indice = state.habitaciones.findIndex(a => parseInt(habitacion.id) === parseInt(a.id))
    state.habitaciones.splice(indice, 1)
    state.habitaciones.splice(indice, 0, habitacion)
  },
  DELETE_HABITACION (state, idHabitacion) {
    const indice = state.habitaciones.findIndex(a => parseInt(idHabitacion) === parseInt(a.id))
    state.habitaciones.splice(indice, 1)
  }
}

const actions = {
  cargarHabitaciones: ({commit}) => {
    vueHttp('get', habitacionUrl, response => {
      commit('SET_HABITACIONES', response.data.datos)
    })
  },
  actualizarHabitacion: ({commit}, habitacion) => {
    commit('UPDATE_HABITACION', habitacion)
  },
  eliminarHabitacion: ({commit}, idHabitacion) => {
    commit('DELETE_HABITACION', idHabitacion)
  }
}

const getters = {
  getHabitaciones (state) {
    return state.habitaciones
  }
}

export default {
  state, mutations, actions, getters
}
