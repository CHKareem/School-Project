
<template>
<v-app>    

    <v-tabs v-model="tab" class="my-4" centered>
<v-tab v-for="list in lists" :key="list.title">
{{list.title}}
</v-tab>
</v-tabs>

<br><br>
<h4 v-if="this.$root.$data.chosen_class != null" class="font-weight-bold animate__animated animate__fadeInDown"
 style="display:block;margin-left:auto;margin-right:auto;">the Chosen Class is <span style="color:rgb(134,180,213);">{{this.$root.$data.chosen_class.name}}</span></h4>

<h4 v-else class="font-weight-bold animate__animated animate__fadeInDown"
 style="display:block;margin-left:auto;margin-right:auto;color:rgb(134,180,213);">Please Choose Class!!!</h4>

<component :key='tab' :is="tabName"  @class_chosen="tab = 1" @add_Subjects="tab = 2" @add_Teacher_Subject="tab = 3" @add_Students="tab = 4" @add_Class_Dist="tab = 5"></component>
   


</v-app>
</template>

<script>
import choose_class from './choose_class.vue'
import add_subjects from './add_subjects.vue'
import add_teachers from './add_teachers.vue'
import add_students from './add_students.vue'
import class_time from './class_time.vue'
import subjects_distribution from './subjects_distribution.vue'

export default {
    components:{choose_class,
    add_subjects,
    add_teachers,
    add_students,
    class_time,
    subjects_distribution
    },
    data:()=>({
            tab:null,
            lists:[
          {title: 'Class',routers:'/Schools/choose_class',name:"choose_class"},
          {title: 'Subjects',routers:'/Schools/',name:"add_subjects" },
          {title: 'Teachers',routers:'/Schools/',name:"add_teachers" },
          {title: 'Students',routers:'/Schools/',name:"add_students" },
          {title: 'Subjects Distribution',routers:'/Schools/',name:"subjects_distribution"},
          {title: 'Class Time',routers:'/Schools/',name:"class_time"}
          ]
        }),
        computed:{
            tabName(){
                if(this.tab == null || this.tab == -1) return ''
                return this.lists[this.tab].name
            }
        }
    }
</script>