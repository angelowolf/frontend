<template>
  <div class="layout-padding">
    <form @submit.prevent="submit(ready)" @keydown="clienteSistemaNuevo.errors.clear($event.target.name)" novalidate>

      <q-stepper @finish="submit(true)" next-label="Siguiente" ref="stepper">
        <q-step title="Defina los datos del Cliente y el Tipo de Servicio">
          <div class="list bg-white">
            <div class="list-label">Datos del Cliente</div>
            <div class="item three-lines">
              <i class="item-primary">perm_identity</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.nombre"
                    class="full-width"
                    required
                    name="nombre"
                    v-error="{ form: clienteSistemaNuevo, campo: 'nombre' }"
                  >
                  <label for="nombre">Nombre del Cliente</label>
                </div>
                <form-help nombre="nombre" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <hr>
            <div class="list-label">Tipo de Servicio</div>
            <div class="item" v-for="tcs in getTipoClienteSistema">
              <div class="item-primary">
                <q-radio v-model="clienteSistemaNuevo.tipoServicio" :val="tcs.clave"></q-radio>
              </div>
              <div class="item-content">
                {{tcs.valor}}
              </div>
            </div>
          </div>
        </q-step>
        <q-step title="Registre los datos del titular de la cuenta" finish-label="Listo" back-label="Atrás" next-label="Siguiente">
          <div class="list bg-white">
            <div class="list-label">Información del Titular</div>
            <div class="item three-lines">
              <i class="item-primary">perm_contact_calendar</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.nombre"
                    class="full-width"
                    required
                    name="titular.nombre"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.nombre' }"
                  >
                  <label for="titular.nombre">Nombre del Titular</label>
                </div>
              </div>
            </div>
            <div class="item three-lines">
              <i class="item-primary">perm_contact_calendar</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.apellido"
                    class="full-width"
                    required
                    name="titular.apellido"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.apellido' }"
                  >
                  <label for="titular.apellido">Apellido del Titular</label>
                </div>
              </div>
            </div>
            <div class="list-label">Tipo de Documento</div>
            <div class="item" v-for="td in getTipoDocumento">
              <div class="item-primary">
                <q-radio v-model="clienteSistemaNuevo.titular.tipoDocumento" :val="td.clave"></q-radio>
              </div>
              <div class="item-content">
                {{td.valor}}
              </div>
            </div>
            <div class="item three-lines">
              <i class="item-primary">reorder</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.numeroDocumento"
                    required
                    name="titular.numeroDocumento"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.numeroDocumento' }"
                  >
                  <label for="titular.numeroDocumento">N° de documento del Titular</label>
                </div>
              </div>
            </div>
            <div class="item three-lines">
              <i class="item-primary">mail_outline</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="email"
                    v-model="clienteSistemaNuevo.titular.email"
                    class="full-width"
                    required
                    name="titular.email"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.email' }"
                  >
                  <label for="titular.email">Email del Titular</label>
                </div>
              </div>
            </div>
            <div class="item three-lines">
              <i class="item-primary">contact_phone</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.telefonoUno"
                    class="full-width"
                    required
                    name="titular.telefonoUno"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.telefonoUno' }"
                  >
                  <label for="titular.telefonoUno">Teléfono 1 del Titular</label>
                </div>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">contact_phone</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.telefonoDos"
                    class="full-width"
                    required
                    name="titular.telefonoDos"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.telefonoDos' }"
                  >
                  <label for="titular.telefonoDos">Teléfono 2 del Titular</label>
                </div>
              </div>
            </div>
          </div>
        </q-step>
        <q-step title="Registre los datos de la cuenta bancaria del titular" back-label="Atrás" next-label="Siguiente">
          <div class="list bg-white">
            <div class="list-label">Información de Cuenta Bancaria</div>
            <div class="item three-lines">
            <i class="item-primary">account_balance</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.banco"
                    class="full-width"
                    name="titular.banco"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.banco' }"
                  >
                  <label for="titular.banco">Banco</label>
                </div>
                <form-help nombre="titular.banco" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">account_balance</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.numeroBanco"
                    class="full-width"
                    name="titular.numeroBanco"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.numeroBanco' }"
                  >
                  <label for="titular.numeroBanco">N° de Cuenta Bancaria</label>
                </div>
                <form-help nombre="titular.numeroBanco" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">credit_card</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.titular.marcaTarjeta"
                    class="full-width"
                    name="titular.marcaTarjeta"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.marcaTarjeta' }"
                  >
                  <label for="titular.marcaTarjeta">Marca de Tarjeta</label>
                </div>
                <form-help nombre="titular.marcaTarjeta" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">credit_card</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="number"
                    v-model="clienteSistemaNuevo.titular.numeroTarjeta"
                    class="full-width"
                    name="titular.numeroTarjeta"
                    v-error="{ form: clienteSistemaNuevo, campo: 'titular.numeroTarjeta' }"
                  >
                  <label for="titular.numeroTarjeta">N° de Tarjeta</label>
                </div>
                <form-help nombre="titular.numeroTarjeta" :form="clienteSistemaNuevo"/>
              </div>
            </div>
          </div>
        </q-step>
        <q-step title="Ingrese los datos del usuario para el nuevo cliente" :ready="true" back-label="Atrás" finish-label="Listo">
          <div class="list bg-white">
            <div class="list-label">Información del Usuario</div>
            <div class="item three-lines">
            <i class="item-primary">perm_identity</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.usuarios[0].nombre"
                    class="full-width"
                    name="usuarios[0].nombre"
                    v-error="{ form: clienteSistemaNuevo, campo: 'usuarios[0].nombre' }"
                  >
                  <label for="usuarios[0].nombre">Nombre</label>
                </div>
                <form-help nombre="usuarios[0].nombre" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">perm_identity</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.usuarios[0].apellido"
                    class="full-width"
                    required
                    name="usuarios[0].apellido"
                    v-error="{ form: clienteSistemaNuevo, campo: 'usuarios[0].apellido' }"
                  >
                  <label for="usuarios[0].apellido">Apellido</label>
                </div>
                <form-help nombre="usuarios[0].apellido" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">account_box</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="text"
                    v-model="clienteSistemaNuevo.usuarios[0].usuario"
                    class="full-width"
                    required
                    name="usuarios[0].usuario"
                    v-error="{ form: clienteSistemaNuevo, campo: 'usuarios[0].usuario' }"
                  >
                  <label for="usuarios[0].usuario">Nombre de usuario</label>
                </div>
                <form-help nombre="usuarios[0].usuario" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">lock</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="clave"
                    v-model="clienteSistemaNuevo.usuarios[0].clave"
                    class="full-width"
                    required
                    name="usuarios[0].clave"
                    v-error="{ form: clienteSistemaNuevo, campo: 'usuarios[0].clave' }"
                  >
                  <label for="usuarios[0].clave">Contraseña</label>
                </div>
                <form-help nombre="usuarios[0].clave" :form="clienteSistemaNuevo"/>
              </div>
            </div>
            <div class="item three-lines">
            <i class="item-primary">mail_outline</i>
              <div class="item-content">
                <div class="stacked-label">
                  <input
                    type="email"
                    v-model="clienteSistemaNuevo.usuarios[0].email"
                    class="full-width"
                    required
                    name="usuarios[0].email"
                    v-error="{ form: clienteSistemaNuevo, campo: 'usuarios[0].email' }"
                  >
                  <label for="usuarios[0].email">Email</label>
                </div>
                <form-help nombre="usuarios[0].email" :form="clienteSistemaNuevo"/>
              </div>
            </div>
          </div>
        </q-step>
      </q-stepper>
    </form>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { clienteSistemaUrl } from '../../../configs/urls'
  import Form from '../../util/Form'
  import { vueHttp, enviarPeticion } from './../../../configs/servicioRest'

  export default {
    name: 'FormTipoHabitacion',
    props: ['id'],
    computed: {
      ...mapGetters([ 'getTipoDocumento', 'getTipoClienteSistema' ])
    },
    data () {
      return {
        ready: false,
        clienteSistemaNuevo: new Form({
          id: 0,
          nombre: '',
          titular: {
            id: 0,
            nombre: '',
            apellido: '',
            numeroDocumento: '',
            tipoDocumento: '',
            email: '',
            telefonoUno: '',
            telefonoDos: '',
            marcaTarjeta: '',
            numeroTarjeta: '',
            banco: '',
            numeroBanco: ''
          },
          tipoServicio: '',
          usuarios: [
            {
              nombre: '',
              apellido: '',
              usuario: '',
              email: '',
              clave: '',
              grupos: [
                { id: 2, nombre: 'cliente_admin' }
              ]
            }
          ]
        }),
        modoEditar: false
      }
    },
    methods: {
      ...mapActions([
        'cargarClientesSistema'
      ]),
      submit (ready) {
        if (ready) {
          enviarPeticion('post', clienteSistemaUrl, this.clienteSistemaNuevo.data(), response => {
            this.$router.push('/clientesistema')
            this.cargarClientesSistema()
          },
          response => {
            this.clienteSistemaNuevo.errors.record(response.data.datos.listaValidaciones)
          })
        }
      }
    },
    beforeMount () {
      if (this.id !== undefined) {
        vueHttp('get', clienteSistemaUrl + this.id, response => {
          this.clienteSistemaNuevo = new Form(response.data.datos)
        })
        this.modoEditar = true
      }
    }
  }
</script>
