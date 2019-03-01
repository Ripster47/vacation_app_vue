<template>
  <div class="lists-new">
    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>
    <div class='container'>
      <h2>Create a checklist!</h2>
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Destination: </label>
          <input class="form-control" type="text" v-model="newListName" placeholder="Destination">
        </div>
        <div class="form-group">
          <label>Date of Trip: </label>
          <input class="form-control" type="text" v-model="newListDate" placeholder="MM/DD/YYYY">
        </div>
          <input type="submit" value="Create" class="btn btn-info">

      </form>
    </div>
  </div>
</template>


<style>

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
              date: "",
              // user_id: ""
            },
      errors: []  
    };      

  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
                    name: this.newListName,
                    date: this.newListDate
                    // user_id: this.user_id
                    };
                    
      axios.post("/api/lists", params)
        .then(response => {
          this.$router.push("/lists/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });              
      }
    }
  }       
</script>