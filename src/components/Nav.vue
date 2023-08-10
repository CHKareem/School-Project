<template>

<nav>
<!-- <v-toolbar flat app>
<v-toolbar-side-icon class="grey--text" @click="drawer=!drawer">
ex
</v-toolbar-side-icon>

<v-spacer></v-spacer>

<v-toolbar-title class="grey--text">
<span class="font-weight-light">school city</span>
</v-toolbar-title>

<v-toolbar-title class="grey--text">
<span class="font-weight-light">user name</span>
</v-toolbar-title>

<v-btn text color="grey">
<span>sign out</span>
<v-icon right>exit-to-app</v-icon>
</v-btn>

</v-toolbar>

<v-navigation-drawer v-model="drawer" color="rgb(134,180,213)">

<v-layout column align-center>
<v-flex class="mt-5">
<v-avatar size="150">
<img src="../assets/schoolLogo.svg">
</v-avatar>
<p class="white--text subheading">text</p>
</v-flex>
</v-layout>

<v-list>
<v-list-tile v-for="link in links" :key="link.title">

<v-list-tile-action>
<v-icon class="white--text">{{ link.icon }}</v-icon>
</v-list-tile-action>

<v-list-tile-content>
<v-list-tile-title class="white--text">{{ link.title }}</v-list-tile-title>

</v-list-tile-content>
</v-list-tile>
</v-list>

</v-navigation-drawer> -->
<!-- <div v-for="list in lists" :key="list.user_name"> -->
<v-app-bar color="rgb(134,180,213)" dark app>
  <v-app-bar-nav-icon @click="drawer=true">  </v-app-bar-nav-icon>


        <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
<v-toolbar-title class="white--text">
<span class="font-weight-light mx-2"
          v-bind="attrs"
          v-on="on"
          v-if="$root.$data.defaultYear != null"> 
         {{$root.$data.defaultYear.name}}
                </span>
</v-toolbar-title>
              </template>
      <span>{{$root.$data.default_school != null?$root.$data.default_school.name:'Choose School'}}</span>
    </v-tooltip>

        <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
<v-toolbar-title class="white--text ml-3 mr-3">
<span class="font-weight-light mx-2"
          v-bind="attrs"
          v-on="on">{{City}}</span>
</v-toolbar-title>
              </template>
      <span>School Location</span>
    </v-tooltip> -->


   <v-spacer></v-spacer>

        <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
<span class="font-weight-bold white--text text-uppercase"
          v-bind="attrs"
          v-on="on">{{user_name}}</span>
              </template>
      <span>User Name</span>
    </v-tooltip>


<v-btn text
v-on:click="sign_out">
<span class="white--text">sign out</span>
<v-icon right class="white--text">logout</v-icon>
</v-btn>
</v-app-bar>
<!-- </div> -->

<v-navigation-drawer v-model="drawer" temporary width="350" clipped app>
  <v-layout column align-center>
<v-flex class="mt-5">
<v-avatar tile size="200" class="mt-5 mb-5">
<img src="http://82.137.250.151:8000/Schools/img/schoolLogo.jpg"/>
</v-avatar>
</v-flex>
</v-layout>

  <v-list nav dense v-for="link in links" :key="link.title">
    <v-list-item-group>
      <v-list-item :to="link.routers" class="list_color">
        <v-list-item-icon>
          <v-icon>
          {{link.icon}}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{link.title}}</v-list-item-title>
      </v-list-item>

    </v-list-item-group>
  </v-list>
</v-navigation-drawer>

</nav>

</template>

<script>

import {transmits} from '../main.js'
import {transmits2} from '../main.js'
import logo1 from './schoolLogo.jpg'
export default{

  data: () => ({
   // logo: require('@/src/assets/img/schoolLogo.jpg'),
      links:[
          {title: 'Prepare School Year', icon:'history_edu',routers:'/Schools/school_year'},
          {title: 'Classes', icon:'class',routers:'/Schools/classes' },
          {title: 'work Program', icon:'schedule',routers:'/Schools/work' },
          {title: 'Annual Report', icon:'calendar_today',routers:'/Schools/annual_report' },
          {title: 'Students Reports', icon:'assessment',routers:'/Schools/student_report' },
          {title: 'Teachers Reports', icon: 'event_note', routers: '/Schools/teacher_report'},
          {title: 'Users', icon:'people_alt',routers:'/Schools/users' }
         ],
         drawer:false,
         group:null,
         user_name:'',
         year:'',
          City:'',
          user_id:'',
  }),
    methods:{
      sign_out(){
        this.$router.replace('/Schools/')
      }
        // sign_out: async function(){
        //   try{
        //     let data = {
        //       id:this.user_id
        //     };
        //     data = await this.$root.postRequest('user','signOut',data)
        //     if(data == 'OK'){
        //       localStorage.removeItem('schoolsUser')
        //       localStorage.removeItem('schoolsToken')
        //       this.$router.replace('/Schools/');
        //     }
        //   }
        //     catch(error){
        //       console.log(error,'error');
        //     }
        // }
    },
      computed:{
       lists(){
        return this.$root.$data.list_sign;
       }
    },
created(){
  
  transmits.$on('transmit_event', (data,data1) =>{
  
this.user_name = data;
this.City= data1;
    
  });

  transmits2.$on('transmit_event2', (data_year) =>{
this.year = data_year;    
  });

   },
    async mounted(){
      if(localStorage.schoolsUser){
      let localUser = JSON.parse(localStorage.schoolsUser)
        let user = localUser.user
        this.user_id = user.id
        this.user_name = user.username
      }

      let year = await this.$root.getRequest('year','defaultYear',{})
       this.$root.$data.defaultYear = year;
   }
}

</script>

<style scoped>

span{
  cursor: pointer;
}
.list_color:hover{
 color:rgb(134,180,213);
}

.list_color:active{
 color:rgb(134,180,213);
}

</style>
