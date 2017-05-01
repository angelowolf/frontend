import { tipoHabitacionUrl } from '../urls'
import { vueHttp } from './../servicioRest'

const state = {
  tipoHabitaciones: []
}

const mutations = {
  SET_TIPOHABITACIONES (state, tipoHabitaciones) {
    state.tipoHabitaciones = tipoHabitaciones
  },
  UPDATE_TIPOHABITACION (state, tipoHabitacion) {
    const indice = state.tipoHabitaciones.findIndex(a => parseInt(tipoHabitacion.id) === parseInt(a.id))
    state.tipoHabitaciones.splice(indice, 1)
    state.tipoHabitaciones.splice(indice, 0, tipoHabitacion)
  },
  DELETE_TIPOHABITACION (state, idTipoHabitacion) {
    const indice = state.tipoHabitaciones.findIndex(a => parseInt(idTipoHabitacion) === parseInt(a.id))
    state.tipoHabitaciones.splice(indice, 1)
  }
}

const actions = {
  cargarTipoHabitaciones: ({commit}) => {
    vueHttp('get', tipoHabitacionUrl, response => {
      commit('SET_TIPOHABITACIONES', response.data.datos)
    })
  },
  actualizarTipoHabitacion: ({commit}, tipoHabitacion) => {
    commit('UPDATE_TIPOHABITACION', tipoHabitacion)
  },
  eliminarTipoHabitacion: ({commit}, idTipoHabitacion) => {
    commit('DELETE_TIPOHABITACION', idTipoHabitacion)
  }
}

const getters = {
  getTipoHabitaciones (state) {
    return state.tipoHabitaciones
  }
}

export default {
  state, mutations, actions, getters
}
