<template>
    <v-app>
        <v-container>
            
             <v-text-field v-for="(day,iIndex) in final_dist_day" :key="iIndex"   
             type="number"   
              clearable
            outlined     
            color="rgb(134,180,213)"
            style="display:block;width:60%;margin-left:auto;margin-right:auto;margin-top:3.5em;"
            :label="`how Many Lessons in ${day.name}`"
            class="font-weight-bold animate__animated animate__fadeInDown"
            v-model="day.value"
          ></v-text-field>

          <h3 class="text-center my-4 animate__animated animate__fadeInDown animate__delay-1s">Total Session Count: <span style="color:rgb(134,180,213);">{{sum_days()}}</span></h3>

                 <v-btn
         text
         outlined
         class="animate__animated animate__fadeInUp animate__delay-1s btn"
         style="display:block;margin-left:auto;margin-right:auto;font-weight:600;"
         v-on:click="add_sub_dis"
         >
         <v-icon left>save</v-icon>
          <span>Save</span>

          </v-btn>


        </v-container>
    </v-app>
</template>

<script>

export default{
data:()=>({
        items_day:[
        {id:1,name:'Sunday',value:0},
        {id:2,name:'Monday',value:0},
        {id:3,name:'Tuesday',value:0},
        {id:4,name:'Wednesday',value:0},
        {id:5,name:'Thursday',value:0},
        {id:6,name:'Friday',value:0},
        {id:7,name:'Saturday',value:0}
        ], 
        year_weekends:[],
        final_dist_day:[],
   }),
   methods:{
       sum_days(){
           return this.final_dist_day.reduce((a,c)=> a+ parseInt(c.value),0)
       },
       add_sub_dis:async function(){
          try{
            let data = {
              distributions:this.final_dist_day,
              yearId:this.$root.$data.defaultYear.id,
              sclassId:this.$root.$data.chosen_class.id
            };
            data = await this.$root.postRequest('class','saveClassDaysSessionsCount',data)
            this.$root.showSnackBar('Saved Successfully')
            this.$emit('add_Class_Dist')
          }
            catch(error){
              console.log(error,'error');
            }
        },
        async getWeekends(){
                 let data = await this.$root.getRequest('year','getYearWeekends',{yearId : this.$root.$data.defaultYear.id})
                 this.year_weekends = data;
        },
        async getClassDistributions(){
          let data1 = await this.$root.getRequest('class','classDistributions',{yearId : this.$root.$data.defaultYear.id,sclassId:this.$root.$data.chosen_class.id})
          this.final_dist_day = data1
        },
        filterDays(){
          this.items_day.forEach( d=> d.value = this.final_dist_day.find(fv=> fv.id == d.id).value)
          this.final_dist_day = this.items_day.filter(
          dd => !this.year_weekends.find( yw=>(yw.dayId === dd.id)))
        }
   },
   async mounted(){
     await this.getWeekends()
     await this.getClassDistributions()
     this.filterDays()
   },
}
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