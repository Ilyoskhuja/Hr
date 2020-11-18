<template>
     <div class="container mt-5">
  <div class="row">
    <label  class="col-sm-2  text-right">имя:</label>
    <div class="col-sm-3 text-left">
     <h6>{{worker.name}}</h6>
    </div>
  </div>
  <div class=" row">
    <label  class="col-sm-2  text-right">Фамилия:</label>
    <div class="col-sm-3  text-left">
      
     <h5>{{worker.lastName}}</h5>
    </div>
  </div>
 <div class="row">
    <label  class="col-sm-2  text-right">Отчество:</label>
    <div class="col-sm-3  text-left">
     
     <h5>{{worker.middleName}}</h5>
    </div>
  </div>
<div class="row">
    <label  class="col-sm-2  text-right">Отдел:</label>
     <div class="col-sm-3  text-left">
 
     <h5>{{worker.department}}</h5>
     </div>
</div>
 <div class="row">
    <label  class="col-sm-2  text-right">Должность:</label>
    <div class="col-sm-3  text-left">
      
     <h5>{{worker.position}}</h5>
    </div>
  </div>
  <div class="row">
 <label class="col-sm-2  text-right" >Дата рождения:</label>
 <div class="col-sm-3  text-left">
 
     <h5>{{worker.dateofbirth}}</h5>
 </div>
</div>


    <div class="row">
      <legend class=" text-right col-sm-2 pt-0">Пол:</legend>
      <div class="col-sm-3  text-left">
       
     <h5>{{worker.gender}}</h5>
      </div>
    </div>
       
 
         </div>
</template>
<script>
import moduleHrManagement from "@/store/hr-management/moduleHrManagement.js";

export default {
  data() {
    return {
      optionsd:[
        'бухгалтерия',
        'IT',
       'маркетинг',
      ],
      worker: {
        name:'',
        lastName:'',
        middleName:'',
        department:'',
        gender:'',
        position:'',
        dateofbirth:''
      }
    }
  }, 
   mounted(){
     this.getInfo(this.$route.params.id);
   },
   created(){
       if (!moduleHrManagement.isRegistered) {
      this.$store.registerModule("hrManagement", moduleHrManagement);
      moduleHrManagement.isRegistered = true;
    }
   
   },
    methods:{
     getInfo(id){
       this.$store
      .dispatch("hrManagement/fetchWorker",id).then(res=>{
       console.log("res",res);
       this.worker.id=res.data[0].id;
       this.worker.name=res.data[0].name;
       this.worker.lastName=res.data[0].lastName;
       this.worker.middleName=res.data[0].middleName;
       this.worker.department=res.data[0].department;
       this.worker.gender=res.data[0].gender;
       this.worker.position=res.data[0].position;
       this.worker.dateofbirth=res.data[0].dateofbirth;
       console.log("worker:",this.worker);
     }).catch((e)=> {
      console.error(e)
    })
     },
  
    }
    
}
</script>