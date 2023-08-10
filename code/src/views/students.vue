<template>
<v-app>
    <v-container>


<v-card style="margin-top:3.5em; margin-bottom:2em;">
    <v-card-title>
      <v-text-field
      class="animate__animated animate__fadeInDown"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
    <v-data-table
       class="animate__animated animate__fadeInDown mb-5"
      :headers="headers"
      v-model="student"
      show-select
      item-key="id"
      :items="usersss"
      :search="search"
    >
        <template v-slot:item.gender="{item}">
          <span>{{item.gender == 0?'Male':'Female'}}</span>
        </template>
        <template v-slot:item.roleId="{item}">
          <span>{{user_types[item.roleId]}}</span>
        </template>
    </v-data-table>

    </v-card-text>

  </v-card>



            <v-select  v-if="student.length !== 0"
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


<v-simple-table height="250px" v-if="student.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            Student's Name
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Subjects That Student Has 
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Newly Added Subjects
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(std,sIndex) in student" :key='sIndex'
        >
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{std.fullname}}
                        </v-chip>
                        </td>


          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{std.fullname}}
                        </v-chip>
                        </td>


                        
                   <td>
                 <v-chip
            class="mx-2 animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)"
             v-for="(subject,index) in subjects" :key="index">
                {{subject.name}}
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


         <v-btn v-if="student.length !== 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn mt-4"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="save_students">
         <v-icon left>save</v-icon>
          <span>Save</span>

          </v-btn>



    </v-container>
</v-app>

</template>

<script>
export default {

     data: () => ({
         search:'',
         subjects:[],
         students:[],
         student:[],
         items_subjects:[],
         user_types:{10:'Student'},
         headers:[
                  {text: 'Full Name',value: 'fullname'},
                  {text: 'Birth Date',value: 'birthDate'},
                  {text: 'E-mail',value: 'email'},
                  {text: 'Mobile',value: 'mobile'},
                  {text: 'Gender',value: 'gender'},
                  {text: 'Address',value: 'address'},
                  {text: 'Role',value: 'roleId'}],
     }),
     methods:{
               remove (item) {
        this.subjects.splice(this.subjects.findIndex( w =>{
          return w.id == item.value.id;
        }), 1)
      },  
                async delete_row(sIndex){
            let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
            if(this.student[sIndex].id == -1){
            this.student.splice(sIndex,1);
            return
            }
            else{
               let data = await this.$root.deleteRequest('class','deleteStudent',{id:this.student[sIndex].id})
               if(data =='OK')
               this.student.splice(sIndex,1);
            }
       }
          },
              async getStudents(){
            let data = await this.$root.getRequest('user','',{})
            this.students = data;
              },
                      async getSubjects(){
                            let data1 = await this.$root.getRequest('subject','classSubjects',{sclassId:this.$root.$data.chosen_class.id})
                        this.items_subjects = data1.map(subject_arr=>{
                            return {text:subject_arr.name,value:subject_arr}
                        })
                            },
                save_students:async function(){
      
          try{
            let data = {
              students:this.student,
              yearId:this.$root.$data.defaultYear.id,
              sclassId:this.$root.$data.chosen_class.id
            };
            await this.$root.postRequest('student','saveStudentsSubjects',data)
            this.$root.showSnackBar('Saved Successfully')
          }
            catch(error){
              console.log(error,'error');
            }
        },
     },
             computed:{
                usersss(){
        return this.students.filter(student=>{
        return student.roleId == 10
       // return student
      })
         },
               },  
       async mounted(){
         await this.getStudents()
         await this.getSubjects()
       },
     };
</script>

<style scoped>


</style>