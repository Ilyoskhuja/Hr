<template>
  <div class="main">
    <div class="container">
      <div class="row mb-4 mt-2 justify-content-around">
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">Количество всех сотрдников</h5>
              <p class="card-text">{{ total }}</p>
            </div>
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">Количество мужчин</h5>
              <p class="card-text">{{ mens }}</p>
            </div>
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">Количество женщин</h5>
              <p class="card-text">{{ womens }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4 mt-2">
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">IT</h5>
              <p class="card-text">{{ it }}</p>
            </div>
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">бухгалтерия</h5>
              <p class="card-text">{{ book }}</p>
            </div>
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">маркетинг</h5>
              <p class="card-text">{{ mark }}</p>
            </div>
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="card" style="width: 18rem; height: 8rem">
            <div class="card-body">
              <h5 class="card-title">Средний возраст сотрудника в компании</h5>
              <p class="card-text">{{ age }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",

  props: {
    msg: String,
  },
  data() {
    return { total: 0, mens: 0, womens: 0, It: 0, book: 0, mark: 0, age: 0 };
  },
  mounted() {
    this.getMens();
    this.getWomen();
    this.getbook();
    this.getMark();
    this.getIt();
    this.getTotal();
  },

  methods: {
    getMens() {
      axios
        .get(`http://localhost:3000/workers?gender=Мужчина`)
        .then((res) => {
          this.mens = res.data.length;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getIt() {
      axios
        .get(`http://localhost:3000/workers?department=IT`)
        .then((res) => {
          console.log("It:",res.data.length);
          this.it = res.data.length;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getbook() {
      axios
        .get(`http://localhost:3000/workers?department=бухгалтерия`)
        .then((res) => {
          
          this.book = res.data.length;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getMark() {
      axios
        .get(`http://localhost:3000/workers?department=маркетинг`)
        .then((res) => {
          this.mark = res.data.length;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getWomen() {
      axios
        .get(`http://localhost:3000/workers?gender=женщина`)
        .then((res) => {
          this.womens = res.data.length;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getTotal() {
      axios
        .get(`http://localhost:3000/workers`)
        .then((res) => {
          this.total = res.data.length;
          this.age = this.getAverageAge(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getAverageAge(users) {
      return (
        users.reduce((prev, user) => prev + this.getAge(user.dateofbirth), 0) /
        users.length
      );
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log("age", age);
      return age;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
main {
  margin-top: 250px;
}
</style>
