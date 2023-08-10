import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './assets/animate.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

export const transmits = new Vue();
export const transmits2 = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  data:{
    serverConf:{
      baseUrl:'http://82.137.250.151:5128/api/',
       //baseUrl:'http://192.168.0.164:5128/api/',
    
      },
      defaultYear:null,
      chosen_class:null,
      default_school:null,
    },
    methods:{
      showSnackBar(message){
        this.$children[0].showSnackBar(message)
      },
      async getRequest(controllerName,urlPath,data){
        try{
          if(this.default_school != null)
          data = {...data,schoolId:this.default_school.id}
          let res = await this.$axios.get(`${this.serverConf.baseUrl}${controllerName}/${urlPath}`,
          {
            params:data,
            headers:{
              token:localStorage.schoolsToken
            }
          })
          return res.data;
        }
        catch(error){
          console.log(error);
          this.showSnackBar('Error Has Been Occurred')
          throw error;
        }
      },
      async postRequest(controllerName,urlPath,data){
        try{
          if(this.default_school != null)
          data = {...data,schoolId:this.default_school.id}
          let res = await this.$axios.post(`${this.serverConf.baseUrl}${controllerName}/${urlPath}`,data,
          {
            headers:{
              token:localStorage.schoolsToken
            }
          })
          console.log(data)
          return res.data;
        }
        catch(error){
          console.log(error);
          this.showSnackBar('Error Has Been Occurred')
          throw error;
        }
      },
      async putRequest(controllerName,urlPath,data){
        try{
          if(this.default_school != null)
          data = {...data,schoolId:this.default_school.id}
          let res = await this.$axios.put(`${this.serverConf.baseUrl}${controllerName}/${urlPath}`,data,
          {
            headers:{
              token:localStorage.schoolsToken
            }
          })
          return res.data;
        }
        catch(error){
          console.log(error);
          this.showSnackBar('Error Has Been Occurred')
          throw error;
        }
      },
      async deleteRequest(controllerName,urlPath,data){
        try{
          let res = await this.$axios.delete(`${this.serverConf.baseUrl}${controllerName}/${urlPath}`,
          {
            data,
            headers:{
              token:localStorage.schoolsToken
            }
          })
          return res.data;
        }
        catch(error){
          console.log(error);
          this.showSnackBar('Error Has Been Occurred')
          throw error;
        }
      },
    },
}).$mount('#app')
