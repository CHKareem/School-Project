<template>
    <v-app>
        <v-container>
       
                   <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;"
            label="Choose Teacher"
            v-model="teacher"
            :items="items_teachers">
            </v-select>

            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s mt-5"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;"
            label="Choose Subjects"
            v-model="subjects"
            chips
            multiple
            solo
            :items="items_subjects">
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

                          <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn mt-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_row">
         <v-icon left>add</v-icon>
          <span>Add</span>
          </v-btn>



          <!-- <table>
            <tr v-for="(teach,aIndex) in item_add" :key="aIndex">
              
              <td>

                {{teach.name}}
              </td>

              <td>
                <h3 v-for="(s,index) in teach.sub" :key="index">
                {{s.name}}
                </h3>
              </td>

             <td>

         <v-btn
         fab
         x-small
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn_delete my-2"
         v-on:click="delete_row(aIndex)">
         <v-icon x-small >clear</v-icon>
         </v-btn>
         
              </td>

            </tr>
          </table> -->


  <v-simple-table height="250px" v-if="item_add.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left animate__animated animate__fadeInDown">
            Teacher Name
          </th>
          <th class="text-left animate__animated animate__fadeInDown">
            Subjects
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(teach,aIndex) in item_add" :key="aIndex"
        >
          <td>
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
            {{teach.fullname}}
                        </v-chip>
                        </td>

          <td>
            <v-chip
            class="mx-2 animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)"
             v-for="(s,index) in teach.sub" :key="index">
                {{s.name}}
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
         v-on:click="delete_row(aIndex)">
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



         <v-btn v-if="item_add.length != 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn my-4"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_teachers">
         <v-icon left>save</v-icon>
          <span>Save</span>

          </v-btn>



        </v-container>
    </v-app>
</template>

<script>
import teacherSubject from '@/models/teacherSubject.js'

export default {

  data: () => ({
   teacher:'',
  //  items_teacher:['user1', 'user2', 'user3', 'user4'],  
  items_teachers:[], 
   subjects:[],
  //  items_subjects:['science', 'arabic', 'numeric science', 'history'],
  items_subjects:[],

  item_add:[],

  }),  
    methods: {
      remove (item) {
        this.subjects.splice(this.subjects.findIndex( w =>{
          return w.id == item.value.id;
        }), 1)
      },         
       add_row(){
           //this.item_add.push({id:this.teacher.id,fullname:this.teacher.fullname, sub:JSON.parse(JSON.stringify(this.subjects))});
           this.item_add.push(new teacherSubject(this.teacher.id, this.teacher.fullname, JSON.parse(JSON.stringify(this.subjects))))
          },
          async delete_row(aIndex){
           // this.item_add.splice(aIndex,1);
           let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
            if(this.item_add[aIndex].id == -1){
            this.item_add.splice(aIndex,1);
            return
            }
            else{
               let data = await this.$root.deleteRequest('teacher','deleteTeacherSubject',{id:this.item_add[aIndex].id})
               if(data =='OK')
               this.item_add.splice(aIndex,1);
            }
          }
          },
          add_teachers:async function(){
          try{
            let data = {
              teachers_subjects:this.item_add,
              yearId:this.$root.$data.defaultYear.id,
              sclassId:this.$root.$data.chosen_class.id
            };
            data = await this.$root.postRequest('teacher','addTeachersSubjects',data)
            this.$root.showSnackBar('Saved Successfully')
            this.$emit('add_Teacher_Subject')
          }
            catch(error){
              console.log(error,'error');
            }
        },
        async getTeachers(){
        let data = await this.$root.getRequest('teacher','',{})
      this.items_teachers = data.map( teacher_arr=>{
        return {text:teacher_arr.fullname,value:teacher_arr}
      })
        },
        async getSubjects(){
        let data1 = await this.$root.getRequest('subject','classSubjects',{sclassId:this.$root.$data.chosen_class.id})
      this.items_subjects = data1.map(subject_arr=>{
        return {text:subject_arr.name,value:subject_arr}
      })
        },
        async getTeachersSubjects(){
           let data3 = await this.$root.getRequest('class','classTeachers',{yearId:this.$root.$data.defaultYear.id,sclassId:this.$root.$data.chosen_class.id})
           this.item_add = data3
        },
  },
  async mounted(){
    await this.getTeachers()
    await this.getSubjects()
    await this.getTeachersSubjects()
  },
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