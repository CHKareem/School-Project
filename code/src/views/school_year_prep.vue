
<template>
<v-app>

<v-container>

<!-- <v-layout row wrap>
<v-flex xsnumber mdnumber></v-flex>
</v-layout> -->
<h3 class="text-center my-3 
animate__animated animate__fadeInDown"
style="color:rgb(134,180,213); ">
School Year Preparation</h3>

  <v-text-field       
            outlined  
            clearable   
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;margin-top:3.5em;"
            label='School Year'
            v-model="year"
            class="font-weight-bold animate__animated animate__fadeInDown"
          ></v-text-field>

                 <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_year">
         <v-icon left>add</v-icon>
          <span>Add Year</span>

          </v-btn>

                   <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;margin-bottom:2em;"
            label="Choose Year"
            v-model="$root.$data.defaultYear"
            @change="yearSelected"
            :items="years">
            </v-select>


  <v-text-field       
            outlined   
            clearable  
            type='number'
            color="rgb(134,180,213)"
            style="display:block; width:60%;margin-left:auto;margin-right:auto;"
            label='Number of semesters'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            v-model="semesters"
            :min="gotSemesterLenght">           
            
          </v-text-field>

<table style="margin-left:auto;margin-right:auto;" class="my-4">
  <tbody>
    <tr v-for="(semester,sIndex) in semestersObjects" :key='sIndex'>
      <td>
        <span style="color:rgb(134,180,213); ">{{semester.name}}</span>
      </td>
      
      <td>
        <v-menu
            v-model="semester.showFrom"
            :close-on-content-click="false"
            nudge-right="20"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template
            v-slot:activator="{on,attrs}">
            <v-text-field      
            v-model="semester.from"    
            color="rgb(134,180,213)"
            readonly
            v-bind="attrs"
            v-on="on"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label='From'
            class="font-weight-bold animate__animated animate__fadeInDown"
          ></v-text-field>
          </template>

          <v-date-picker
          v-model="semester.from"
          @input="semester.showFrom = false">
          </v-date-picker>
          </v-menu>

      </td>

      <td>
         <v-menu
            v-model="semester.showTo"
            :close-on-content-click="false"
            nudge-right="20"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template
            v-slot:activator="{on,attrs}">
            <v-text-field      
            v-model="semester.to"    
            color="rgb(134,180,213)"
            readonly
            v-bind="attrs"
            v-on="on"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label='To'
            class="font-weight-bold animate__animated animate__fadeInDown"
          ></v-text-field>
          </template>

          <v-date-picker
          v-model="semester.to"
          @input="semester.showTo = false">
          </v-date-picker>
          </v-menu>

      </td>


    </tr>
  </tbody>
</table>

            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;"
            label="Choose Weekend"
            v-model="weekend"
            chips
            multiple
            solo
            :items="items_weekend">

          <template v-slot:selection="{ attrs, item, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click:close="remove(item)">
        {{item.text}}
      </v-chip>
    </template>

            </v-select>

<h4 class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s my-5"
 style="display:block;margin-left:auto;margin-right:auto;width:90%;color:rgb(134,180,213);">Official Holidays</h4>

  <v-text-field       
            clearable
            outlined     
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label='Holiday Name'
            v-model="name"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-3s"
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
         class="animate__animated animate__fadeInUp animate__delay-4s btn"
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
         class="animate__animated animate__fadeInUp animate__delay-2s btn my-4"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
          v-on:click="send_year">
          <v-icon left>save</v-icon>
        <span>Save</span>
          </v-btn>

</v-container>

</v-app>
</template>


<script>
import {transmits2} from '../main.js'
import holiday from '@/models/holiday.js'

export default{
data:()=>({
picker:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
menu2:false,
semesters:0,
gotSemesterLenght:0,
date:'',
name:'',
description:'',
holiday_array:[],
year:'',
years:[],
weekend:[],
items_weekend:[
  {text:'Sunday', value:{id:1,name:'Sunday'}}, 
  {text:'Monday', value:{id:2,name:'Monday'}}, 
  {text:'Tuesday', value:{id:3,name:'Tuesday'}}, 
  {text:'Wednesday', value:{id:4,name:'Wednesday'}}, 
  {text:'Thursday',value:{id:5,name:'Thursday'}}, 
  {text:'Friday', value:{id:6,name:'Friday'}}, 
  {text:'Saturday', value:{id:7,name:'Saturday'}}],
semestersObjects:[],
}),
    methods: {
       remove (item) {
        this.weekend.splice(this.weekend.findIndex( w =>{
          return w.id == item.value.id;
        }), 1)
              // let data = await this.$root.deleteRequest('year','deleteWeekend',{dayName:item.value.name,yearId:this.$root.$data.defaultYear.id})
              //  if(data =='OK')
              //  this.weekend.splice(item.value.id,1);
      },
            add_holiday(){
        this.holiday_array.push(new holiday(-1, this.name, this.date, this.description));
      },
     async delete_row(hIndex){
        //this.holiday_array.splice(hIndex,1);
            let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
            if(this.holiday_array[hIndex].id == -1){
            this.holiday_array.splice(hIndex,1);
            return
            }
            else{
               let data = await this.$root.deleteRequest('year','deleteHoliday',{id:this.holiday_array[hIndex].id})
               if(data =='OK')
               this.holiday_array.splice(hIndex,1);
            }
        }
      },
  send_year:async function(){
          try{
            let data = {
              year:this.$root.$data.defaultYear,
              semesters:this.semestersObjects,
              weekends:this.weekend,
              holidays:this.holiday_array
            };
            data = await this.$root.postRequest('year','',data)
            this.$root.showSnackBar('Settings Has Been Saved')
            await this.getYearHolidays()
          }
            catch(error){
              console.log(error,'error');
            }
        },
        async add_year(){
                    try{
            let data = {
              year_name:this.year,
            };
            data = await this.$root.postRequest('year','SaveOnlyYear',data)
            this.$root.showSnackBar(`${this.year} Saved`)
            await this.getYears()
          }
            catch(error){
              console.log(error,'error');
            }
        },
        async getYears(){
           let data = await this.$root.getRequest('year','getAllYears',{})
           this.years = data.map(y=>{
             return {text:y.name,value:y}
           })
        },
        async getYearHolidays(){
          let data1 = await this.$root.getRequest('year','getHolidays',{yearId:this.$root.$data.defaultYear.id})
          this.holiday_array = data1
        },
        async yearSelected(){
          await this.getYearHolidays()
          await this.getWeekends()
          await this.getSemesters()
        },
         async getWeekends(){
          let data = await this.$root.getRequest('year','getYearWeekends',{yearId : this.$root.$data.defaultYear.id})
          this.weekend = data.map(w=>{
            return {id:w.id,name:w.name}
          })
        },
        async getSemesters(){          
          let data = await this.$root.getRequest('year','getSemesters',{yearId : this.$root.$data.defaultYear.id})
          this.semesters = data.length
          this.gotSemesterLenght = data.length
          this.semestersObjects = data.map(so =>{
            return {name:so.name,from:so.date_from,to:so.date_to,showTo:false,showFrom:false}
          })
        },
},
async mounted(){
  await this.getYears()
  await this.getYearHolidays()
  await this.getWeekends()
  await this.getSemesters()
},
watch:{
  async semesters(newValue,old){
      let count = newValue
         // if(this.semestersObjects.length!==0 && old !== 0){
      this.semestersObjects.splice(0)
      for(let i = 0 ; i<count ; i++){
        this.semestersObjects.push({name:`semester ${i+1}`,from:'',to:'',showTo:false,showFrom:false})
      }

      if(newValue == this.gotSemesterLenght) await this.getSemesters()
   // }
  }
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

        .gone-enter-from{
          opacity: 0;
          transform: scale(0.6);
        }

        .gone-enter-to{
          opacity: 1;
          transform: scale(1);
        }

        .gone-enter-active{
          transition: all 0.4s ease;
        }

        .gone-leave-from{
          opacity: 1;
          transform: scale(1);
        }

        .gone-leave-to{
          opacity: 0;
          transform: scale(0.6);
        }

        .gone-leave-active{
          transition: all 0.4s ease;
        }

</style>