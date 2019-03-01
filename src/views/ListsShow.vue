<template>
  <div class="lists-show">
    <h1>{{ list.name }}</h1>
    <div>
      <li v-for="item in list.items">{{ item.name }}</li>
    </div>

    <router-link class="btn btn-info" :to="'/lists/' + list.id + '/edit'">Edit</router-link>
    <button class="btn btn-info" v-on:click="destroyList()">Delete List</button>
  </div>
</template>

<style>
  
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      list: { 
              id: "",
              name: "",
              user_id: "",
              items: [{
                        id: "",
                        list_id: "",
                        name: ""
                      }] 
            }
    };
  },
  created: function() {
    axios.get('/api/lists/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.list = response.data;
      });
  },
  methods: {
    destroyList: function() {
      axios.delete("/api/lists/" + this.list.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/");
        });
    }
  }
}
</script>