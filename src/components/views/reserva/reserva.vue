<template>
<section>
  <div ref="calendar" id="calendar"></div>
  <q-modal ref="basicModal" class="maximized">
    <reserva-form v-if="mostrar" @cerrarModal="$refs.basicModal.close()" :nuevaReserva="nuevaReserva"></reserva-form>    
  </q-modal>
</section>
</template>

<script>
  import $ from 'jquery'
  require('fullcalendar-scheduler')
  import { fullCalendarHabitacion, fullCalendarReserva } from './../../../configs/urls'
  import { mapState, mapGetters } from 'vuex'
  import Form from './../../util/Form'
  import ReservaForm from './reservaForm'

  export default {

    components: {
      ReservaForm
    },
    props: {
      /* events: {
        default () {
          return [
            {
              title: 'Event1',
              start: '2017-01-04 12:00:00',
              end: '2017-01-06 12:00:00',
              resourceId: 'A'
            },
            {
              title: 'Event2',
              start: '2017-01-05 12:00:00',
              end: '2017-01-08 12:00:00',
              resourceId: 'B'
            }
           ]
        }
      }, */
      eventSources: {
        default () {
          return [{
            url: fullCalendarReserva,
            type: 'GET', /*
            data: {
                custom_param1: 'something',
                custom_param2: 'somethingelse'
            }, */
            error: () => {
              console.log('there was an error while fetching events!')
            },
//            color: 'yellow', // a non-ajax option
//            textColor: 'black', // a non-ajax option
            beforeSend: xhr => {
              xhr.setRequestHeader('Authorization', 'Bearer ' + this.$store.state.auth.token)
            }
          }]
        }
      },

      resources: {
        default () {
          return {
            url: fullCalendarHabitacion,
            type: 'GET',
            beforeSend: xhr => {
              xhr.setRequestHeader('Authorization', 'Bearer ' + this.$store.state.auth.token)
            }
          }
          /* [
            {
              id: 'A',
              title: 'Habitacion 1',
              groupId: 1
            },
            {
              id: 'B',
              title: 'Habitacion 2',
              groupId: 1
            },
            {
              id: 'C',
              title: 'Habitacion 3',
              groupId: 2
            }
          ] */
        }
      },

      editable: {
        default () {
          return true
        }
      },

      selectable: {
        default () {
          return true
        }
      },

      selectHelper: {
        default () {
          return true
        }
      },

      header: {
        default () {
          return {
            left: 'prev,next today',
            center: 'title',
            right: 'timelineWeek,timelineMonth'
          }
        }
      },

      defaultView: {
        default () {
          return 'timelineMonth'
        }
      },

      sync: {
        default () {
          return false
        }
      }
    },

    data () {
      return {
        mostrar: false,
        eventClicked: {},
        nuevaReserva: new Form({
          start: null,
          end: null,
          habitacion: {
            id: 0
          }
        })
      }
    },

    computed: {
      ...mapState({
        reservaStore: state => state.reservaStore,
        tipoDocumentoStore: state => state.tipoDocumentoStore
      }),
      ...mapGetters([
        'getHabitaciones',
        'getTiposDocumento'
      ]),
      toggleModal () {
        return this.mostrar
      }
    },

    methods: {
      cancel () {
        this.mostrar = false
      },
      success (reserva) {
        this.mostrar = false
      }
    },

    mounted () {
      const cal = $(this.$el)
      const self = this

      self.getHabitaciones.length < 1 && self.$store.dispatch('cargarHabitaciones')
      self.getTiposDocumento.length < 1 && self.$store.dispatch('cargarTiposDocumento')

      cal.fullCalendar({
        header: this.header,
        defaultView: this.defaultView,
        editable: this.editable,
        selectable: this.selectable,
        selectHelper: this.selectHelper,
        selectOverlap: false,
        aspectRatio: 2,
        timeFormat: 'HH:mm',
        events: self.events,
        eventSources: self.eventSources,
        resources: self.resources,
        locale: 'es',
        slotDuration: '12:00:00',
        snapDuration: '12:00:00',
        resourceAreaWidth: '15%',
        resourceLabelText: 'Habitaciones',
        slotLabelFormat: [
          'ddd D'
        ],
        eventOverlap: false,
        resourceGroupField: 'groupId',
        resourceGroupText: (groupValue) => {
          switch (groupValue) {
            case 1: return 'Simples'
            default: return 'Dobles'
          }
        },

        resourceRender: (resourceObj, labelTds, bodyTds) => {
          // labelTds.css('background', 'blue')
          // resourceObj.eventColor = 'rgb(255,0,0)'
        },

        eventRender (event, element) {
          if (this.sync) {
            self.events = cal.fullCalendar('clientEvents')
          }
        },

        eventDestroy (event) {
          if (this.sync) {
            self.events = cal.fullCalendar('clientEvents')
          }
        },

        eventClick (event) {
          $(self.$el).trigger('event-selected', event)
        },

        eventDrop (event) {
          $(self.$el).trigger('event-drop', event)
        },

        eventResize (event) {
          $(self.$el).trigger('event-resize', event)
        },
        /* select (start, end, jsEvent) {
          $(self.$el).trigger('event-created', {
            start,
            end,
            allDay: !start.hasTime() && !end.hasTime()
          })
        } */
        select (start, end, jsEvent, view, resource) {
          // self.$store.dispatch('buscarHabitacion', resource.id)
          self.nuevaReserva.start = start
          self.nuevaReserva.end = end
          self.nuevaReserva.habitacion.id = resource.id
          self.$refs.basicModal.open()
          self.mostrar = true
        },

        eventDragStop (event, jsEvent, ui, view) {
          console.log(event)
        }
      })
    },

    watch: {
      events: {
        deep: true,
        handler (val) {
          $(this.$el).fullCalendar('rerenderEvents')
        }
      }
    },

    events: {
      'remove-event' (event) {
        $(this.$el).fullCalendar('removeEvents', event.id)
      },
      'rerender-events' (event) {
        $(this.$el).fullCalendar('rerenderEvents')
      },
      'refetch-events' (event) {
        $(this.$el).fullCalendar('refetchEvents')
      },
      'render-event' (event) {
        $(this.$el).fullCalendar('renderEvent', event)
      },
      'reload-events' () {
        $(this.$el).fullCalendar('removeEvents')
        $(this.$el).fullCalendar('addEventSource', this.events)
      },
      'rebuild-sources' () {
        $(this.$el).fullCalendar('removeEvents')
        this.eventSources.map(event => {
          $(this.$el).fullCalendar('addEventSource', event)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '~fullcalendar/dist/fullcalendar.min.css';
  @import '~fullcalendar-scheduler/dist/scheduler.min.css';

  .fc-event-container {
    height: 30px !important;
  }

  .fc-event {
    line-height: 1.6;
  }
</style>
