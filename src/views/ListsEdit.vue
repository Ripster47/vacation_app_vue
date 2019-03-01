<template>
  <div class="lists-edit">
    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>
    <div class='container'>
      <h2>Edit a checklist!</h2>
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Destination: </label>
          <input class="form-control" type="text" v-model="list.name" placeholder="Destination">
        </div>
        <div class="form-group">
          <label>Date of Trip: </label>
          <input class="form-control" type="text" v-model="list.date" placeholder="Date of Trip">
        </div>
        <div class="new-button">
          <input type="submit" value="Update" class="btn btn-info">
        </div>
      </form>
    </div>
  </div>
</template>


<style>
.new-button{
  text-align: center
}
.container{
  margin-bottom: 30px;
}
</style>


<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      list: {
              name: "",
              date: ""
            },
      errors: []  
    };      
  },
  created: function() {
    axios.get("/api/lists/" + this.$route.params.id)
      .then(response => {
        this.list = response.data;
      })
  },
  methods: {
    submit: function() {
      var params = {
                    name: this.list.name,
                    date: this.list.date
                    };
      axios.patch("/api/lists/" + this.list.id, params)
        .then(response => {
          this.$router.push("/lists/" + this.list.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });              
    } 
  }    
}
</script>