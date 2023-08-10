<template>
<v-app>
    <v-container>
                     <h3 class="text-center 
            animate__animated animate__fadeInDown"
            style="color:rgb(134,180,213); margin-top:2em; margin-bottom:2em; font-weight:bold;">
            Users</h3>

            <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInUp mb-4"
            label="Choose Type"
            v-model="role_type"
            :items="items_type">
            </v-select>

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
       class="animate__animated animate__fadeInDown mb-5"
      :headers="headers"
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

<br><br>
          <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp btn my-5" dark
         style="display:block; margin: 0 auto; margin-bottom:1.5em; font-weight:600;"
         v-on:click="open_students"
         >
          <span>View All Students</span>
          <v-icon right>open_in_new</v-icon></v-btn>



<signup @getUsers="getUsers()"/>

    </v-container>
</v-app>

</template>

<script>
import signup from '@/components/signup.vue'

export default {
     components:{
         signup
    },

 data: () => ({
         search:'',
         users:[],
         user_types:{1:'Super Admin', 10:'Student', 20:'Teacher'},
        //  users:[
        //  {fullname:'name',birthDate:'989',email:'tt',mobile:'56',gender:'0',address:'tyhty2',roleId:'2'},
        //  {fullname:'name',birthDate:'gtgt',email:'tt',mobile:'56',gender:'1',address:'tyhty3',roleId:'3'},
        //  {fullname:'name',birthDate:'gtgt',email:'tt',mobile:'56',gender:'male',address:'tyhty4',roleId:'4'},
        //  {fullname:'name',birthDate:'gtgt',email:'tt',mobile:'56',gender:'female',address:'tyhty5',roleId:'5'},
        //  {fullname:'name',birthDate:'gtgt',email:'tt',mobile:'56',gender:'male',address:'tyhty6',roleId:'6'},
        //  {fullname:'name',birthDate:'gtgt',email:'tt',mobile:'56',gender:'1',address:'tyhty7',roleId:'7'},
        //  {fullname:'name',birthDate:'gtgt',email:'tt',mobile:'56',gender:'0',address:'tyhty8',roleId:'8'}],
         headers:[
                  {text: 'Full Name',value: 'fullname'},
                  {text: 'Birth Date',value: 'birthDate'},
                  {text: 'E-mail',value: 'email'},
                  {text: 'Mobile',value: 'mobile'},
                  {text: 'Gender',value: 'gender'},
                  {text: 'Address',value: 'address'},
                  {text: 'Role',value: 'roleId'}],
                  // items_type:[{text:"Male",value:{id:3, name:'Male'}},
                  // {text:"Female",value:{id:4, name:'Female'}},
                  // {text:"what",value:{id:5, name:'what'}},
                  // {text:"who",value:{id:6, name:'who'}},
                  // {text:"All",value:{id:'', name:'All'}}],
                  items_type:[],
                  role_type:'',
  }),
  methods:{
    open_students(){
      //this.$router.push('students');
      window.open('/Schools/students','_blank')
    },
     async getUsers(){
            let data = await this.$root.getRequest('user','',{})
            this.users = data;
      },
      async getType(){
      let data1 = await this.$root.getRequest('user','getRoles',{})
      this.items_type = data1.map( type_arr=>{
        return {text:type_arr.name,value:type_arr}
      })
       this.items_type.unshift({text:"All",value:{id:'', name:'All'}})
      },


  },
  computed:{
    //       users(){
    //      return this.users.filter( user1 =>{

    //        return user1.roleId === this.role_type.id
           
    //     })
      
    // },
    //for tranform 0 and 1 to male and female
        usersss(){
        return this.users.filter(user=>{
        // if(user.gender == 0)
        // return user.gender = 'Male'
        // else if(user.gender == 1)
        // return user.gender = 'Female'
        if (this.role_type.id)
        return user.roleId == this.role_type.id
        return user
      })
      
    },


    // hide_column(){
    //   return this.headers.filter( header=>{
    //     return header.text !== 'Role ID'
    //   })
    // },

  },
  async mounted(){
      await this.getUsers();
      await this.getType();
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