<template>
<v-app>
    <v-container>

        <h3 class="text-center my-5 
        animate__animated animate__fadeInDown"
        style="color:rgb(134,180,213); ">
        Teacher Report</h3>


  <v-simple-table class="my-5">
    <template v-slot:default>
        <thead>
            <th v-for="(iIndex) in items_classes.length + 1" :key="iIndex"><v-spacer></v-spacer></th>
           <th>
                    Grand Total
           </th>
        </thead>

        <tbody>


            <tr v-for="(teacher,tIndex) in items_teachers" :key="tIndex">
                <td>
                   {{ teacher.text }}
                </td>

                <td v-for="(classes,cIndex) in items_classes" :key="cIndex">
                    {{  classes.text  }}
                </td>

            </tr>
            <tfoot>
                    <p style="font-weight:bold;" class="mt-4 mx-4">Grand Total</p>
            </tfoot>
        </tbody>
    </template>
  </v-simple-table>


    </v-container>
</v-app>

</template>

<script>
export default {
    data: () => ({
        items_classes:[],
        items_teachers:[],
        // items_teachers:[
        // {text:'teacher1', value:{id:1,name:'teacher1'}},
        // {text:'teacher2', value:{id:2,name:'teacher2'}},
        // {text:'teacher3', value:{id:3,name:'teacher3'}},
        // {text:'teacher4', value:{id:4,name:'teacher4'}},
        // {text:'teacher5', value:{id:5,name:'teacher5'}},
        // {text:'teacher6', value:{id:6,name:'teacher6'}},
        // {text:'teacher7', value:{id:7,name:'teacher7'}},
        // {text:'teacher8', value:{id:8,name:'teacher8'}},
        // {text:'teacher9', value:{id:9,name:'teacher9'}},
        // {text:'teacher10', value:{id:10,name:'teacher10'}}
        // ],
        // items_classes:[
        // {text:'class1', value:{id:1,name:'class1'}},
        // {text:'class2', value:{id:2,name:'class2'}},
        // {text:'class3', value:{id:3,name:'class3'}},
        // {text:'class4', value:{id:4,name:'class4'}},
        // {text:'class5', value:{id:5,name:'class5'}},
        // {text:'class6', value:{id:6,name:'class6'}},
        // {text:'class7', value:{id:7,name:'class7'}},
        // {text:'class8', value:{id:8,name:'class8'}},
        // {text:'class9', value:{id:9,name:'class9'}},
        // {text:'class10', value:{id:10,name:'class10'}}
        // ],
        }),

methods:{
    async getTeachers(){
        let data = await this.$root.getRequest('teacher','',{})
        this.items_teachers = data.map(teacher_array=>{
            return {text: teacher_array.name, value:{teacher_array}}
        })
    },
    async getClasses(){
        let data1 = await this.$root.getRequest('class','',{})
        this.items_classes = data1.map(class_array=>{
            return {text: class_array.name, value:{class_array}}
        })
    },
},

async mounted(){
    await this.getTeachers()
    await this.getClasses()
},
   };
</script>

<style>

</style>