<template>

<v-app>


        <v-container>
          <fieldset
          class="animate__animated animate__fadeInUp"
          v-if="user.roleId == 1">
            <legend><span class="mx-2">Add School</span></legend>

            <v-text-field       
            outlined     
            clearable
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;margin-top:3.5em;"
            label="School Name"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            v-model="school_name"
          ></v-text-field>

            <v-btn
            text
            dark
            outlined
            class="animate__animated animate__fadeInUp animate__delay-1s btn my-5"
            style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
            v-on:click="add_school">
         <v-icon left>add</v-icon>
          <span>Add</span>

          </v-btn>
          </fieldset>




                 <fieldset
                class="animate__animated animate__fadeInDown"
                v-if="user.roleId == 1">
         <legend><span class="mx-2">Choose School</span></legend>

                   <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;margin-top:3.5em;"
            label="Choose School"
            v-model="School"
            :items="vSelectSchool">
            </v-select>

   <v-simple-table v-if="School !== ''"
  class="my-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            School Name
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
        >
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{School.name}}
                        </v-chip>
                        </td>

                <td>

        <v-tooltip right color="red">
      <template v-slot:activator="{ on, attrs }">
          <v-btn
          dark
         fab
         x-small
         text
         outlined
         v-bind="attrs"
         v-on="on"
         class="animate__animated animate__fadeInUp animate__delay-2s btn_delete my-2"
         v-on:click="delete_school()">
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

         <v-btn
         text
         dark
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         @click="choose_school">
         <v-icon left>add_box</v-icon>
          <span>Choose</span>
          </v-btn>

 

          </fieldset>

        </v-container>

</v-app>

</template>


<script>


export default{

data:() =>({
        school_name:'',
        // schools:[
        // {text:'Aleppo',value:{id:1,name:'Aleppo'}},
        // {text:'Damas',value:{id:1,name:'Damas'}},
        // {text:'Homs',value:{id:1,name:'Homs'}},
        // {text:'Tartus',value:{id:1,name:'Tartus'}}
        // ],
        schools:[],
        School:'',
        user:JSON.parse(localStorage.getItem('schoolsUser')).user,
    }),
    methods:{
      async add_school(){
              try{
                  let data = {
                    id:-1,
                    name:this.school_name
                  };
                  data = await this.$root.postRequest('school','',data)
                  this.$root.showSnackBar('School Added')
                  await this.getSchools()
                }
                  catch(error){
                    console.log(error,'error');
                }
              //this.schools.push({text:this.school_name,value:{id:-1,name:this.school_name}})
      },
            async delete_school(){
            let confirmAction = confirm("Do You Want To Delete ??");
            if (confirmAction) {
               await this.$root.deleteRequest('school','',{id:this.School.id})
               this.$root.showSnackBar('School Deleted')
               await this.getSchools()
              this.School = ''
            }
          },
        async getSchools(){
            let data = await this.$root.getRequest('school','',{})
            this.schools = data;
        },
        choose_school(){
            this.$root.$data.default_school = this.School
            this.$root.showSnackBar(`School ${this.School.name} Selected`)
        },
    },
      computed:{
    vSelectSchool(){
      return this.schools.map( school => {
              return {text:school.name,value:school}
            }).filter( school=> school.value.id !== -1)
    }
  },
    async mounted(){
      await this.getSchools()
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