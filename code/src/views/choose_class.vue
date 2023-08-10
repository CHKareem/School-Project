<template>
    <v-app>
        <v-container>
          <fieldset
          class="animate__animated animate__fadeInUp">
            <legend><span class="mx-2">Add Class</span></legend>

            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;"
            label="Choose Teacher"
            v-model="teacher"
            :items="items_teachers">
            </v-select>



            <v-text-field       
            outlined     
            clearable
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;margin-top:3.5em;"
            label="Class Name"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            v-model="class_name"
          ></v-text-field>

            <v-checkbox
              class="animate__animated animate__fadeInDown animate__delay-2s"
              v-model="optinal_checked"
              style="color:rgb(134,180,213); display:block;margin-left:auto;margin-right:auto;width:60%;"
              color="rgb(134,180,213)"
              label="Contains Optional Subjects"
            ></v-checkbox>


                 <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-2s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_class">
         <v-icon left>add</v-icon>
          <span>Add</span>

          </v-btn>

            <v-simple-table height="250px" v-if="classes.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            Class Name
          </th>

          <th class="text-center animate__animated animate__fadeInDown">
            Supervisor
          </th>

          <th class="text-center animate__animated animate__fadeInDown">
            Opotional Subjects
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classarr,cIndex) in classes" :key='cIndex'
        >
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{classarr.name}}
                        </v-chip>
                        </td>

             <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{classarr.SupervisorTeacher? classarr.SupervisorTeacher.fullname:getTeacherName(classarr.adminUserId)}}
                        </v-chip>
                        </td>

                <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{classarr.containsOptionalSubjects == 0 ? 'No' : 'Yes'}}
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
         v-on:click="delete_class(cIndex)">
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


         <v-btn v-if="classes.length != 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="send_class">
         <v-icon left>save</v-icon>
          <span>Save</span>

          </v-btn>


          </fieldset>



       <fieldset
       class="animate__animated animate__fadeInDown">
         <legend><span class="mx-2">Choose Class</span></legend>
                   <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;margin-top:3.5em;"
            label="Choose Class"
            v-model="Class"
            :items="vSelectClasses">
            </v-select>

                          <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         @click="choose_class">
         <v-icon left>add_box</v-icon>
          <span>Choose</span>
          </v-btn>
          </fieldset>


        </v-container>
    </v-app>
</template>

<script>

import SClass from '@/models/SClass.js'
export default {

  data: () => ({
   Class:'',  
   optinal_checked:false,
   classes:[],
   class_name:'',
   teacher:'',
   items_teachers:[],
  }),
  methods:{
          getTeacherName(supervisorId){
            let teacher = this.items_teachers.find(t=> t.value.id == supervisorId)
            return teacher != null?teacher.text:''
          },
          add_class(){
            this.classes.push(new SClass(-1, this.class_name, this.teacher.id, this.optinal_checked));
          },  
          async delete_class(cIndex){
            let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
            if(this.classes[cIndex].id == -1){
            this.classes.splice(cIndex,1);
            return
            }
            else{
               let data = await this.$root.deleteRequest('class','',{id:this.classes[cIndex].id})
               if(data =='OK')
               this.classes.splice(cIndex,1);
            }
       }

          },
          choose_class(){
            this.$root.$data.chosen_class = this.Class
            this.$root.showSnackBar(` ${this.Class.name} Selected`)
            this.$emit('class_chosen')
          },
          send_class:async function(){
                      try{
                        let data = {
                            classes:this.classes
                        };
                        data = await this.$root.postRequest('class','newClasses',data)
                        this.$root.showSnackBar('Classes Saved')
                        this.classes=data
                }
                  catch(error){
                    console.log(error,'error');
                }
          },
          async getClasses(){
            let data = await this.$root.getRequest('class','',{})
            this.classes = data;
          },
            async getTeachers(){
            let data1 = await this.$root.getRequest('teacher','',{})
                  this.items_teachers = data1.map( teacher_arr=>{
                  return {text:teacher_arr.fullname,value:teacher_arr}
                })
          }
  },
  computed:{
    vSelectClasses(){
      return this.classes.map( school_class => {
              return {text:school_class.name,value:school_class}
            }).filter( school_class=> school_class.value.id !== -1)
    }
  },
  async mounted(){
      await this.getClasses()
      await this.getTeachers()
  }
}
</script>


<style scoped>
        fieldset{
          border-color: rgb(134,180,213);
          margin-bottom: 4em;
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