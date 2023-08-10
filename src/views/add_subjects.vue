<template>
    <v-app>
        <v-container>
              <v-text-field       
            outlined     
            clearable
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;"
            label="Subject's Name"
            class="font-weight-bold animate__animated animate__fadeInDown"
            v-model="subjects"
          ></v-text-field>


            <v-checkbox
              class="animate__animated animate__fadeInDown animate__delay-1s"
              v-model="day_checked"
              style="color:rgb(134,180,213); display:block;margin-left:auto;margin-right:auto;width:60%;"
              color="rgb(134,180,213)"
              label="Subject To Be Two Periods In A Row"
            ></v-checkbox>

            <v-checkbox
              class="animate__animated animate__fadeInDown animate__delay-1s"
              v-model="optional_checked"
              style="color:rgb(134,180,213); display:block;margin-left:auto;margin-right:auto;width:60%;"
              color="rgb(134,180,213)"
              label="Optional Subject"
            ></v-checkbox>

            
            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s mt-4"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;"
            label="Choose Days For The Subject"
            v-model="days"
            chips
            multiple
            solo
            :items="items_days">
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

  <v-text-field       
            outlined   
            clearable  
            type='number'
            color="rgb(134,180,213)"
            style="display:block; width:60%;margin-left:auto;margin-right:auto;"
            label='Weight Of Subject'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s"
            v-model="weight_value"
            min=0> </v-text-field>


  <v-text-field       
            outlined  
            type="number"
            clearable   
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;margin-top:3.5em;"
            label='Hours in Week'
            v-model="hour"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-3s"
          ></v-text-field>


                 <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-3s btn"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_row">
         <v-icon left>add</v-icon>
          <span>Add</span>

          </v-btn>

<!-- 
<table v-show="subjects_array !== [] ">

    <tr v-for="(subject,sIndex) in subjects_array" :key='sIndex'>
      <td>
            {{subject.title}}
      </td>

      <td>
      
         <v-btn
         fab
         x-small
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn_delete my-2"
         v-on:click="delete_row(sIndex)">
         <v-icon x-small >clear</v-icon>

          </v-btn>
      </td>

      
    </tr>

</table> -->

  <v-simple-table height="250px" v-if="subjects_array.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            Subject's Name
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Hours in Week
          </th>   
          <th class="text-center animate__animated animate__fadeInDown">
            Weight Of Subject 
          </th>           
          <th class="text-center animate__animated animate__fadeInDown">
            Two Periods In A Row
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Subject is Optional 
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Subject's Days
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject,sIndex) in subjects_array" :key="sIndex" @dblclick="get_info(sIndex)">
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{subject.name}}
                        </v-chip>
                        </td>

                                  <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{subject.hoursInWeek}}
                        </v-chip>
                        </td>

                                  <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{subject.weight}}
                        </v-chip>
                        </td>



                        <td class="text-center">
                         <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
                            dark
                            color="rgb(134,180,213)">
                            {{subject.allowMultiSessionsInDay == 1 ? 'Yes' :  'No'}}</v-chip>
                        </td>

                        <td class="text-center">
                         <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
                            dark
                            color="rgb(134,180,213)">
                            {{subject.optional == 0 ? 'No' :  'Yes'}}</v-chip>
                        </td>


                        <td class="text-center">
                        <v-chip class="animate__animated animate__fadeInDown animate__delay-1s mx-1 my-1"
                           dark
                           color="rgb(134,180,213)"
                           v-for="(dayi,dIndex) in subject.subjectDays" :key="dIndex">
                           {{dayi.name}}</v-chip>
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
         v-on:click="delete_row(sIndex)">
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


         <v-btn v-if="subjects_array.length !== 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn mt-4"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_subjects">
         <v-icon left>save</v-icon>
          <span>Save</span>

          </v-btn>

        </v-container>
    </v-app>
</template>

<script>
import Subject from '@/models/Subject.js'
export default {

    data:()=>({
         subjects_array:[],
         subjects:'',
         hour:'',
         days:[],
         day_checked:false,
         weight_value:0,
         optional_checked:false,
         items_days:[
            {text:'Sunday', value:{id:1,name:'Sunday'}}, 
            {text:'Monday', value:{id:2,name:'Monday'}}, 
            {text:'Tuesday', value:{id:3,name:'Tuesday'}}, 
            {text:'Wednesday', value:{id:4,name:'Wednesday'}}, 
            {text:'Thursday',value:{id:5,name:'Thursday'}}, 
            {text:'Friday', value:{id:6,name:'Friday'}}, 
            {text:'Saturday', value:{id:7,name:'Saturday'}}],
        }),
        methods:{
            remove (item) {
                    this.days.splice(this.days.findIndex( d =>{
                      return d.id == item.value.id;
                    }), 1)
                },
          add_row(){
            this.subjects_array.push(new Subject(-1, this.subjects, 1, this.hour, JSON.parse(JSON.stringify(this.days)), this.day_checked, this.optional_checked, this.weight_value));
           // console.log(this.subjects_array);
          },
          get_info(sIndex){
            this.subjects = this.subjects_array[sIndex].name
            this.day_checked = this.subjects_array[sIndex].allowMultiSessionsInDay
            this.optional_checked = this.subjects_array[sIndex].optional
            this.days = this.subjects_array[sIndex].subjectDays
            this.weight_value = this.subjects_array[sIndex].weight
            this.hour = this.subjects_array[sIndex].hoursInWeek

          },
          async delete_row(sIndex){
             let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
            if(this.subjects_array[sIndex].id == -1){
            this.subjects_array.splice(sIndex,1);
            return
            }
            else{
               let data = await this.$root.deleteRequest('subject','',{id:this.subjects_array[sIndex].id})
               if(data =='OK')
               this.subjects_array.splice(sIndex,1);
            }
          }
      },
          add_subjects:async function(){
          try{
            let data = {
                subjects:this.subjects_array,
                sclassId:this.$root.$data.chosen_class.id,
                yearId:this.$root.$data.defaultYear.id
            };
            data = await this.$root.postRequest('subject','',data)
            this.$root.showSnackBar('Subject Saved')
            this.$emit('add_Subjects')
          }
            catch(error){
              console.log(error,'error');
            }
        },
       async getSubjects(){
            let data = await this.$root.getRequest('subject','classSubjects',{sclassId:this.$root.$data.chosen_class.id})
            this.subjects_array = data;
            console.log(data);
        }
    },
            async mounted(){
            await this.getSubjects();
        }
 }
</script>


<style scoped>

         table{
            overflow-y: auto;
            height: 150px;
            display: block;
            margin-top:2em;
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