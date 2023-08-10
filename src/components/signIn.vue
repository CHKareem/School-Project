<template>
<v-container>
  
    <div class="div animate__animated animate__bounceInDown">
     <img src="http://82.137.250.151:8000/Schools/img/schoolLogo.svg" class="img animate__animated animate__fadeInDown animate__delay-1s"/>

  <v-text-field       
  clearable
            outlined     
            color="rgb(134,180,213)"
            style="margin-top:-6.5em; width:60%;margin-left:auto;margin-right:auto;"
            label='User Name'
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-2s"
            v-model="user_name">
            <!-- v-model="element.user_name" -->
          ></v-text-field>

            <v-text-field 
            clearable
            outlined
            color="rgb(134,180,213)"
            style="width:60%;margin-left:auto;margin-right:auto;"
            label='Password'
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            class="font-weight-bold animate__animated animate__fadeInUp animate__delay-2s"
          ></v-text-field>
           
            <!-- <v-select 
            color="rgb(134,180,213)"
            class="font-weight-bold animate__animated animate__fadeInDown animate__delay-3s"
            style="display:block;margin-left:auto;margin-right:auto;width:60%;"
            label="Choose City of the School"
            v-model="City"
            :items="items"
            > -->
            <!-- v-model="element.City"
            :items="items"
            item-text="city1"
            item-value="value"> -->
            <!-- </v-select> -->

           <v-checkbox
           class="rgb(134,180,213) animate__animated animate__fadeInDown animate__delay-3s"
          color="rgb(134,180,213)"
          style="display:block;margin-left:auto;margin-right:auto;width:60%;"
          v-model="Remember"
          label="Remeber Me"
        ></v-checkbox>

       <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-3s btn" dark
         style="display:block; margin: 0 auto; margin-bottom:1.5em; font-weight:600;"
         v-on:click="sign_in"
          width="8em"

         >
          <span>Sign In</span>
          <v-icon right>login
                      </v-icon></v-btn>

   </div> 
</v-container>
</template>


<script>

// import signElement from '../models/sign_element.js'
import {transmits} from '../main.js'

export default {

  data: () => ({
   Remember:false,

    show1:false,
     user_name:'',
     password:'',
     message:'',

  }),
  methods:{
    sign_in(){
      this.$router.push('Main');
    }
        // sign_in: async function(){
        //   try{
        //     let data = {
        //       username:this.user_name,
        //       password:this.password
        //     };
        //     console.log('signing in ...')
        //     data = await this.$root.postRequest('user','signIn',data)
            
        //     if(data == ''){
        //       this.$root.showSnackBar('user name or password not correct')
        //     }
        //     else{
        //       localStorage.setItem('schoolsToken', data.token);
        //       localStorage.setItem('schoolsUser', JSON.stringify({...data,remember:this.remember}));
        //       this.$router.push('Main');
        //     }
        //   }
        //     catch(error){
        //       console.log(error,'error');
        //     }
        // }
    },
    computed:{
       list(){
        return this.$root.$data.list_sign;
       }
    },
    mounted(){
      console.log('sign in mounted called')
      if(localStorage.schoolsUser == ''){
        console.log(schoolsUser,'schools user')
      let localUser = JSON.parse(localStorage.schoolsUser)
      if(localUser.remember){
        console.log('user has been remembered')
        let user = localUser.user
        this.user_name = user.username
        this.password = user.password
        this.remember = true
        this.sign_in()
      }
      }
    },
};
</script>


<style scoped>

.div{
  border:.4em solid rgb(134,180,213);
margin-top: 4.5em;
margin-left: 2em;
margin-right: 2em;
}
        .img{
          position: relative;
          top:-5em;
          height: 300px;
          width: 300px;
          display: block;
          margin-right: auto;
          margin-left: auto;
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

        .text:hover{
          color: rgb(134,180,213);
        }
</style>