<template>
<!-- <v-app>
<v-container>
   
  <keep-alive>
    <component v-bind:is="component" @signedIn='goToView("Main")'></component>
  </keep-alive>
</v-container>
            </v-app> -->
            <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackBarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    
<nav-bar v-if="$route.path != '/Schools/'"></nav-bar>

<v-main height="700">
<router-view></router-view>
</v-main>

</v-app>

</template>

<script>
import Main from './components/Main.vue';
import Sign from './components/signIn.vue';
import navBar from './components/Nav.vue'

export default {

    components: {
        'Main': Main,
        'Sign': Sign,
        'nav-bar':navBar
    },

  data: () => ({
    component:'Sign',
    timeout:3000,
    snackBarText:'',
    snackbar: false,
  }),
  methods:{
    goToView(viewName){
      this.component = viewName
    },
    showSnackBar(message){
      this.snackBarText = message
      this.snackbar = true
    }
  }
};
</script>

