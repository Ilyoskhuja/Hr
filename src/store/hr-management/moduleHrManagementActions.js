import axios from 'axios';
export default {
	fetchWorkers({ commit }, data) {
		console.log(commit,"data:",data);
		console.log("dartment:",data.department,"gender:",data.gender);

		return new Promise((resolve, reject) => {

           
      if(data.department !==null&&data.gender!==null)
			axios
				.get(
					'http://localhost:3000/workers?_page='+data.currentPage+
					'&_limit=3&gender='+data.gender+
					'&department='+data.department
				)
				.then((response) => {

					resolve(response);
				})
				.catch((error) => {
					
					reject(error);
				});
			if(data.department !==null&&data.gender==null)
			axios
				.get(
					'http://localhost:3000/workers?_page='+data.currentPage+
					'&_limit=3&department='+data.department
				)
				.then((response) => {

					resolve(response);
				})
				.catch((error) => {
					
					reject(error);
				});
			
      if(data.department ==null&&data.gender!==null)
			axios
				.get(
					'http://localhost:3000/workers?_page='+data.currentPage+
					'&_limit=3&gender='+data.gender
					
				)
				.then((response) => {

					resolve(response);
				})
				.catch((error) => {
					
					reject(error);
				});
			if(data.department==null&&data.gender==null)
			axios
				.get(
					'http://localhost:3000/workers?_page='+data.currentPage+
					'&_limit=3'
				)
				.then((response) => {
                    console.log("res:",response);
					resolve(response);
				})
				.catch((error) => {
					
					reject(error);
				});
		});
	},
	fetchWorker(context, id) {
		return new Promise((resolve, reject) => {
		
			axios
				.get(
					'http://localhost:3000/workers?id='+id
					// ,
					// config
				)
				.then((response) => {

					resolve(response);
				})
				.catch((error) => {
                  
					reject(error);
				});
		});
	},


	createWorker(context, data) {
		return new Promise((resolve, reject) => {
		axios.post(`http://localhost:3000/workers`,data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	updateWorker(context,id,data) {
		
		
		return new Promise((resolve, reject) => {
			axios
				.put(`http://localhost:3000/workers/${id}`,{name:data.name,lastName:data.lastName,middleName:data.middleName,department:data.department,gender:data.gender,position:data.position,dateofbirth:data.dateofbirth})
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {

					reject(error);
				});
		});
	},
	deleteWorker({ commit }, id) {
		console.log(commit);
		return new Promise((resolve, reject) => {
			axios
				.delete(`http://localhost:3000/workers/${id}`)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};
