<template>
<div class="container">
    <div class="row mb-2 mt-5">
        

    </div>
 <div class="form-group row">
    <label class="col-sm-2 col-form-label">фильтр по отделу</label>
     <div class="col-sm-2"><v-select :options="optionsd"  @input="filterDepart" />
</div>
    <label  class="col-sm-2 col-form-label">фильтр по полу</label>
     <div class="col-sm-2"><v-select :options="optionsg"  @input="filterGender" />
</div>
       <div class="col"><button type="button" class="btn btn-primary" @click="$router.push('add')">Добавить</button></div>
 
</div>
    <table class="table table-striped mt-4 mb-4">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Имя</th>
      <th scope="col">Фамилия</th>
      <th scope="col">отдел</th>
      <th scope="col">Пол</th>
      <th scope="col">позиция</th>
      <th scope="col"></th>
       <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="person in workers" :key="person.id">
      <td>{{person.id}}</td>
      <td @click="info(person.id)">{{person.name}}</td>
      <td @click="info(person.id)">{{person.lastName}}</td>
      <td @click="info(person.id)">{{person.department}}</td>
      <td @click="info(person.id)">{{person.gender}}</td>
      <td @click="info(person.id)">{{person.position}}</td>
      <td @click="edit(person.id)">Edit</td>
      <td @click="remove(person.id)">Delete</td> 
    </tr>
   
  </tbody>
</table>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end">
   <li class="page-item">
					<button type="button" class="page-link" v-if="currentPage != 1" @click="currentPage--"> Previous </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link" v-for="pageNumber in pageLength" :key="pageNumber" @click="getList(pageNumber,department,gender)"> {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" @click="currentPage++" v-if="currentPage < pageLength" class="page-link"> Next </button>
		</li>
  </ul>
</nav>
</div>
</template>
<script>
// Store Module
import moduleHrManagement from "@/store/hr-management/moduleHrManagement.js";

export default {
  data() {
    return {
      workers: [],
      currentPage:1,
      department:null,
      gender:null,
      pageLength:0,
       optionsd:[
        'бухгалтерия',
        'IT',
       'маркетинг',
      ],
      optionsg:[
        'Мужчина',
        'женщина'
      ],
      
    }
  },
  methods:{
    filterGender(value) {
      this.gender=value;
   this.getList(this.currentPage,null,value);  
  },
    filterDepart(value) {
      this.department=value;
   this.getList(this.currentPage,value,null);  
  },
    getList(pageNumber,department,gender){
      let data={
        currentPage:pageNumber,
        gender,
        department
        
      }
      this.$store
      .dispatch("hrManagement/fetchWorkers",data).then(res=>{
     
  this.pageLength = Math.ceil(res.headers["x-total-count"] / 10);
   this.workers = res.data;
    
   }). catch((e)=> {
      console.error(e)
    })
    },
    edit(id){
      this.$router.push(`/edit/${id}`);
    },
      info(id){
      this.$router.push(`/info/${id}`);
    },
    remove(id){
      this.$store
      .dispatch("hrManagement/deleteWorker",id)
    .then(() => {
      this.getList(this.currentPage,null,null);    
    }).catch(error => {
        console.log(error);
    });   
    }
  },
    
    mounted(){
     console.log("list");
    },
    created() {
    if (!moduleHrManagement.isRegistered) {
      this.$store.registerModule("hrManagement", moduleHrManagement);
      moduleHrManagement.isRegistered = true;
    }
    this.getList(this.currentPage,null,null);
  },
}
</script>
<style >

</style>