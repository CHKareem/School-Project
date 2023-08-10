<template>

    <v-app>

        <v-container>

             <h3 class="text-center 
            animate__animated animate__fadeInDown animate__delay-1s"
            style="color:rgb(134,180,213); margin-top:2em; font-weight:bold;">
            Sign Up</h3> 

 <v-row>
                <v-col
                    cols="12"
                >
                                   <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-1s"
            label="Choose Type"
            v-model="type"
            :items="items_type">
            </v-select>
                </v-col></v-row>


                <v-row>
                <v-col
                    cols="6"
                >
            <v-text-field       
            clearable
            outlined     
            color="rgb(134,180,213)"
            label='User Name'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s pa-2"
            v-model="user_name">
          ></v-text-field>
            </v-col>


            <v-col
            cols="6"
            >
            <v-text-field       
            clearable
            outlined     
            color="rgb(134,180,213)"
            label='Password'
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s pa-2"
            v-model="password">
          ></v-text-field>
      </v-col>
    </v-row>

     <v-row>
                <v-col
                    cols="6"
                >
            <v-text-field       
            clearable
            outlined     
            color="rgb(134,180,213)"
            label='Full Name'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-3s pa-2"
            v-model="full_name">
          ></v-text-field>
            </v-col>


            <v-col
            cols="6"
            >
            <v-textarea  
            clearable     
            outlined  
            auto-grow
            no-resize   
            color="rgb(134,180,213)"
            v-model="address"
            label='Address'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-3s pa-2"
          ></v-textarea>
      </v-col>
    </v-row>

     <v-row>
                <v-col
                    cols="6"
                >
            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-4s pa-2"
            label="gender"
            v-model="gender"
            :items="items_gender">
            </v-select>
            </v-col>
                
            <v-col
            cols="6"
            >
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
            v-model="birth_date"    
            color="rgb(134,180,213)"
            readonly
            v-bind="attrs"
            v-on="on"
            label='Birth Date'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-4s pa-2"
          ></v-text-field>
          </template>

          <v-date-picker
          v-model="birth_date"
          @input="menu2 = false">
          </v-date-picker>
          </v-menu>
      </v-col>
      </v-row>

                      <v-row>
                <v-col
                    cols="6"
                >
            <v-text-field       
            clearable
            outlined     
            color="rgb(134,180,213)"
            label='Mobile'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-5s pa-2"
            v-model="mobile">
          ></v-text-field>
            </v-col>


            <v-col
            cols="6"
            >
            <v-text-field       
            clearable
            outlined  
            type="email"   
            color="rgb(134,180,213)"
            label='E-mail'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-5s pa-2"
            v-model="email">
          ></v-text-field>
      </v-col>
    </v-row>
                      
                          <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-5s btn my-5"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         @click="sign_up">
         <v-icon left>person_add</v-icon>
          <span>Sign Up</span>
          </v-btn>


<!-- <v-simple-table height="250px" v-if="signUp_array.length !== 0"
  class="my-4">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center animate__animated animate__fadeInDown">
            Full Name
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Birth Date
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            E-mail
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Mobile
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Gender
          </th>
          <th class="text-center animate__animated animate__fadeInDown">
            Address
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,uIndex) in signUp_array" :key='uIndex'
        >
          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{user.fullname}}
                        </v-chip>
                        </td>

                                  <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{user.birthDate}}
                        </v-chip>
                        </td>

                                        <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{user.email}}
                        </v-chip>
                        </td>

                                  <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{user.mobile}}
                        </v-chip>
                        </td>

                                                          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{user.gender}}
                        </v-chip>
                        </td>

                                                          <td class="text-center">
          <v-chip class="animate__animated animate__fadeInDown animate__delay-1s"
            dark
            color="rgb(134,180,213)">
             {{user.address}}
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


         <v-btn v-if="signUp_array.length !== 0"
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn mt-4"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_subjects">
         <v-icon left>person_save</v-icon>
          <span>Sign Up</span>

          </v-btn> -->


        </v-container>
    </v-app>

</template>

<script>
import signUp from '@/models/signUp.js'
export default {

 data: () => ({
     user_name:'',
     show1:false,
     password:'',
     full_name:'',
     birth_date:'',
     email:'',
     mobile:'',
     gender:'',
     address:'',
     type:'',
     items_gender:[{text:"Male",value:{id:0, name:'Male'}},{text:"Female",value:{id:1, name:'Female'}}],
     picker:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
     menu2:false,
     signUp_array:[],
     items_type:[],
  }),
  methods:{
      sign_up:async function(){

                 try{
                 let data = new signUp(-1, this.user_name, this.password,
                                            this.full_name, this.birth_date, this.email,
                                            this.mobile, this.gender.id, this.address,
                                            this.type.id)
                 data = await this.$root.postRequest('user','',data)
                 this.$root.showSnackBar('User Saved')
                 this.$emit('getUsers')
                }
                  catch(error){
                    console.log(error,'error');
                }
      },
      async getType(){
      let data1 = await this.$root.getRequest('user','getRoles',{})
      this.items_type = data1.map( type_arr=>{
        return {text:type_arr.name,value:type_arr}
        })
      }
  },
  async mounted(){
      await this.getType()
  },
};
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

</style>
