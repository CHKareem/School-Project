<template>
    <v-app>
        <v-container>

<table>
  <tr v-for="(day,index) in final_items_day" :key="index"> 
    <td>     <v-checkbox
    class="animate__animated animate__fadeInDown"
              v-model="day.checked"
              color="rgb(134,180,213)"
              :label="day.name"
            ></v-checkbox>

            </td>

    <td>

 <v-menu
        :ref='`menu_start${index}`'
        v-model="day.show_menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="day.time_from"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-show="day.checked !== false"
          class="animate__animated animate__fadeInDown animate__delay-1s"
            v-model="day.time_from"
            label="Start at"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
        format="24hr"
          v-if="day.show_menu"
          v-model="day.time_from"
          full-width
          @click:minute="$refs[`menu_start${index}`][0].save(day.time_from)"
        ></v-time-picker>
      </v-menu>

    </td>

    <td>

       <v-menu
        :ref='`menu_end${index}`'
        v-model="day.show_menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="day.time_to"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-show="day.checked !== false"
            class="animate__animated animate__fadeInDown animate__delay-2s"
            v-model="day.time_to"
            label="End at"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
        format="24hr"
          v-if="day.show_menu1"
          v-model="day.time_to"
          full-width
          @click:minute="$refs[`menu_end${index}`][0].save(day.time_to)"
        ></v-time-picker>
      </v-menu>

    </td>
  </tr>
</table>

         <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn mt-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_class_time">
         <v-icon left>save</v-icon>
          <span>Save</span>
          </v-btn>


        </v-container>
    </v-app>
</template>

<script>

export default{
data:()=>({
        items_day:[
          {id:1,name:'Sunday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        , {id:2,name:'Monday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        , {id:3,name:'Tuesday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        , {id:4,name:'Wednesday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        , {id:5,name:'Thursday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        , {id:6,name:'Friday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        , {id:7,name:'Saturday',checked:false,show_menu:false,show_menu1:false,time_from:null,time_to:null}
        ],
        year_weekends:[],
        final_items_day:[],
   }),
   methods:{
     add_class_time:async function(){
          try{
            let data = {
              days: this.final_items_day,
              yearId:this.$root.$data.defaultYear.id,
              sclassId:this.$root.$data.chosen_class.id
            };
            data = await this.$root.postRequest('class','saveClassTime',data)
            this.$root.showSnackBar('Saved Successfully')
            //this.$emit('add_Class_Time')
          }
            catch(error){
              console.log(error,'error');
            }
        },
        async getWeekends(){
                let data = await this.$root.getRequest('year','getYearWeekends',{yearId : this.$root.$data.defaultYear.id})
            this.year_weekends = data;
      this.final_items_day = this.items_day.filter(
      d => !this.year_weekends.find( yw=>(yw.dayId === d.id)))
        }
   },
          async mounted(){
            await this.getWeekends()
        },

}
</script>


<style scoped>

          table{
            margin-left: auto;
            margin-right: auto;
            width: 100%;
          }

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

</style>