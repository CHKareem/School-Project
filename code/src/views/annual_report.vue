<template>
<v-app>

<v-container>

            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;margin-top:3.5em;"
            label="Choose Year"
            v-model="year"
            :items="years">
            {{years.text}}
            </v-select>

            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;margin-top:3.5em;"
            label="Display By"
            v-model="display"
            :items="displays">
            {{displays.text}}
            </v-select>




<v-row style="margin-top:4em;margin-bottom:5em;">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          :weekdays="weekdays"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>





    <h4 class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s my-5"
 style="display:block;margin-left:auto;margin-right:auto;width:90%;color:rgb(134,180,213);">Official Holidays</h4>

  <v-text-field       
            clearable
            outlined     
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label='Holiday Name'
            v-model="name"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s"
          ></v-text-field>

            <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            nudge-right="20"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template
            v-slot:activator="{on,attrs}">
            <v-text-field   
            clearable   
            v-model="date"    
            color="rgb(134,180,213)"
            readonly
            v-bind="attrs"
            v-on="on"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label='Holiday Date'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-3s"
          ></v-text-field>
          </template>

          <v-date-picker
          v-model="date"
          @input="menu2 = false">
          </v-date-picker>
          </v-menu>

          
            <v-textarea  
            clearable     
            outlined  
            auto-grow
            no-resize   
            color="rgb(134,180,213)"
            v-model="description"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label='Holiday Description'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-4s"
          ></v-textarea>

                          <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-4s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_holiday">
         <v-icon left>add</v-icon>
          <span>Add</span>
          </v-btn>



  <v-simple-table height="250px" v-if="holiday_array.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            Holiday's Name
          </th>

                    <th class="text-center animate__animated animate__fadeInDown">
            Holiday's Date
          </th>

                    <th class="text-center animate__animated animate__fadeInDown">
            Holiday's Description
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(holiday,hIndex) in holiday_array" :key='hIndex'
        >
                
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{holiday.name}}
                        </v-chip>
                        </td>

                                  <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{holiday.date}}
                        </v-chip>
                        </td>

                                  <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{holiday.description}}
                        </v-chip>
                        </td>



                <td>

        <v-tooltip right color="red">
      <template v-slot:activator="{ on, attrs }">
          <v-btn
         fab
         x-small
         text
         outlined
         v-bind="attrs"
         v-on="on"
         class="animate__animated animate__fadeInUp animate__delay-2s btn_delete my-2"
         v-on:click="delete_row(hIndex)">
         <v-icon x-small >clear</v-icon>
         </v-btn>
         </template>
      <span>Delete</span>
    </v-tooltip>
                </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>



       <v-btn v-if="holiday_array.length != 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-2s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
          v-on:click="send_holiday">
        <span>Save</span>
          </v-btn>

          <h3 class="text-center my-5 animate__animated animate__fadeInUp animate__delay-5s">Total Number of School Days: <span style="color:rgb(134,180,213);">5</span></h3>
          <h3 class="text-center my-5 animate__animated animate__fadeInUp animate__delay-5s">Number of Weekends: <span style="color:rgb(134,180,213);">5</span></h3>
          <h3 class="text-center my-5 animate__animated animate__fadeInUp animate__delay-5s">Number of Official Holidays: <span style="color:rgb(134,180,213);">5</span></h3>
</v-container>

</v-app>
</template>


<script>

export default{
data:()=>({
picker:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
menu2:false,
weekdays:[0,1, 2, 3, 4, 5,6],
date:'',
name:'',
description:'',
year:'',
display:'',
years:[],
displays:[],
holiday_array:[],
 focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
}),
    methods: {
            add_holiday(){
        this.holiday_array.push({name:this.name, date:this.date, description:this.description});
      },
      delete_row(hIndex){
        this.holiday_array.splice(hIndex,1);
      },
  send_holiday:async function(){
          try{
            let data = {
              holidays:this.holiday_array
            };
            data = await this.$root.postRequest('','',data)
          }
            catch(error){
              console.log(error,'error');
            }
        },
         viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  async mounted(){
      let data = await this.$root.getRequest('','',{})
      this.years = data.map( sc => {
        return {text:sc.name,value:sc}
      });

      let data1 = await this.$root.getRequest('','',{})
      this.displays = data1.map( sc1 => {
        return {text:sc1.name,value:sc1}
      });
  }

}
</script>

<style scoped>

        .btn{
          color: white;
          background: linear-gradient(to right, rgb(134,180,213) 50%, rgb(38,38,38) 50%);
          background-size: 200% 100%;
          background-position: right bottom;
          transition: all .5s ease-out;
        }

        .btn:hover{
          background-position: left bottom;
        }

                .btn_delete{
          color: white;
          background: linear-gradient(to right, red 50%, rgb(38,38,38) 50%);
          background-size: 200% 100%;
          background-position: right bottom;
          transition: all .5s ease-out;
        }

        .btn_delete:hover{
          background-position: left bottom;
        }

</style>