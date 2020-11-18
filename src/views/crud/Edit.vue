<template>
     <div class="container">
        <form class="mt-5">
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">имя</label>
    <div class="col-sm-10">
      <input  class="form-control" v-model="worker.name" >
    </div>
  </div>
  <div class="form-group row">
    <label for="lastName" class="col-sm-2 col-form-label">Фамилия</label>
    <div class="col-sm-10">
      <input  class="form-control" v-model="worker.lastName" >
    </div>
  </div>
 <div class="form-group row">
    <label for="middlename" class="col-sm-2 col-form-label">Отчество</label>
    <div class="col-sm-10">
      <input  class="form-control"  v-model="worker.middleName">
    </div>
  </div>
<div class="form-group row">
    <label for="middlename" class="col-sm-2 col-form-label">Отдел</label>
     <div class="col-sm-10">
 <v-select :options="optionsd" v-model="worker.department" ></v-select>
     </div>
</div>
 <div class="form-group row">
    <label for="middlename" class="col-sm-2 col-form-label">Должность</label>
    <div class="col-sm-10">
      <input  class="form-control" v-model="worker.position">
    </div>
  </div>
  <div class="form-group row">
 <label class="col-sm-2 col-form-label" >Дата рождения</label>
 <div class="col-sm-10">
 <input type="date" v-model="worker.dateofbirth" max="3000-12-31" 
        min="1000-01-01" class="form-control">
 </div>
</div>


  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Пол</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="worker.gender" value="Мужчина">
          <label class="form-check-label" >
           Мужчина 
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio"  v-model="worker.gender" value="женщина">
          <label class="form-check-label" >
          женщина
          </label>
        </div>
   
      </div>
    </div>
  </fieldset> 
       
  <div class="form-group row">
    <div class="col-sm-10">
      <button class="btn btn-primary" @click="updateWorker">редактировать</button>
    </div>
  </div>
</form>
    </div>
</template>
<script>

import axios from 'axios';
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
    methods:{
     getInfo(id){
     axios.get(`http://localhost:3000/workers?id=${id}`).then(res=>{
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
     updateWorker(){
        
     axios.put(`http://localhost:3000/workers/${this.$route.params.id}`,this.worker).then(res=>{
       console.log(res);
      this.$router.push('/list');
     })

    .catch((e) => {
      console.error(e)
    })
     }
    }
    
}
</script>