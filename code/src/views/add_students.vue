<template>
    <v-app>
        <v-container>
              <!-- <v-text-field       
              clearable
            outlined     
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;margin-top:3.5em;"
            label="Student's Name"
            class="font-weight-bold animate__animated animate__fadeInDown"
            v-model="students"
          ></v-text-field>

                 <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp btn"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_row">
         <v-icon left>add</v-icon>
          <span>Add</span>

          </v-btn> -->


<!-- <table v-show="students_array !== [] ">

    <tr v-for="(student,sIndex) in students_array" :key='sIndex'>
      <td>
      
         <v-btn
         fab
         x-small
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn_delete"
         v-on:click="delete_row(sIndex)">
         <v-icon x-small >clear</v-icon>

          </v-btn>
      </td>
      <td>
             <h3 style="font-size:1.4rem; font-weight:700; color:black;" class="text-center">{{student.title}}</h3>
      </td>

    </tr>

</table> -->
 <v-card>
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
       class="animate__animated animate__fadeInDown animate__delay-1s"
      v-model="selected"
      show-select
      item-key="id"
      height="450px"
      :headers="headers"
      :items="students"
      :search="search"
    ></v-data-table>
    </v-card-text>
  </v-card>



<v-simple-table height="250px" v-if="selected.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            Student's Name
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student,sIndex) in selected" :key='sIndex'
        >
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{student.fullname}}
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


         <v-btn v-if="selected.length !== 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn mt-4"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_students">
         <v-icon left>save</v-icon>
          <span>Save</span>

          </v-btn>

        </v-container>
    </v-app>
</template>

<script>
export default {

    data:()=>({
         search:'',
         selected:[],
         students:[],
         headers:[{text: 'Student Name',value: 'fullname'}],
        }),
        methods:{
         
          async delete_row(sIndex){
           // this.selected.splice(sIndex,1);
            let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
            if(this.selected[sIndex].id == -1){
            this.selected.splice(sIndex,1);
            return
            }
            else{
               let data = await this.$root.deleteRequest('class','deleteStudent',{id:this.selected[sIndex].id})
               if(data =='OK')
               this.selected.splice(sIndex,1);
            }
       }
          },         
          add_students:async function(){
      
          try{
            let data = {
              students:this.selected,
              yearId:this.$root.$data.defaultYear.id,
              sclassId:this.$root.$data.chosen_class.id
            };
            await this.$root.postRequest('student','saveStudentsSubjects',data)
            this.$root.showSnackBar('Saved Successfully')
            this.$emit('add_Students')
          }
            catch(error){
              console.log(error,'error');
            }
        },
        async getStudents(){
                let data = await this.$root.getRequest('student','getAllStudents',{})
               this.students= data 
        },
        async getClassStudents(){
              let data1 = await this.$root.getRequest('class','classStudents',{yearId:this.$root.$data.defaultYear.id,sclassId:this.$root.$data.chosen_class.id})
               this.selected= data1 
        }
  },
  async mounted(){
    await this.getStudents()
    await this.getClassStudents()
        },
    }
</script>


<style scoped>

         table{
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