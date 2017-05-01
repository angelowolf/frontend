import axios from 'axios'
import Router from './router'
import { Toast } from 'quasar'

export function vueHttp (tipo, url, callback, postData) {
  let metodo = tipo.toLowerCase()
  if (['get', 'post', 'put', 'options', 'update', 'delete'].indexOf(metodo) >= 0) {
    if (postData === undefined) {
      axios[metodo](url).then(response => {
        callback(response)
      }, response => {
        Toast.create.negative('Error al contactar con la API')
      })
    }
    else {
      axios[metodo](url, postData).then(response => {
        callback(response)
      }, response => {
        Toast.create.negative('Error al contactar con la API')
      })
    }
  }
  else {
    console.log('Método inválido')
  }
}

export function enviarPeticion (tipo, url, postData, onSuccess, onError) {
  let metodo = tipo.toLowerCase()
  if (['post', 'put', 'update', 'delete'].indexOf(metodo) >= 0) {
    axios[metodo](url, postData).then(response => {
      const codigo = parseInt(response.status)
      if (codigo === 200) {
        if (response.data.mensaje !== null) {
          Toast.create.positive(response.data.mensaje)
        }
        onSuccess(response)
      }
      else {
        if (codigo === 220) {
          if (response.data.datos.listaErrores !== null && response.data.datos.listaErrores.length > 0) {
            response.data.datos.listaErrores.map(e => {
              Toast.create.alert(e)
            })
          }
          onError(response)
        }
        else {
          Toast.create.negative(`Ocurrió un error.
            ${codigo === 500 ? response.mensaje : ''}`)
        }
      }
    }, response => {
      if (response.status === 401) {
        Router.push('/')
      }
      else {
        Toast.create.negative('Ocurrió un error al contactar con la API.')
      }
    })
  }
  else {
    console.log('Método inválido')
  }
}
