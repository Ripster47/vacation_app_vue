<template>
  <div class="lists-show">
    <h1>{{ list.name }}</h1>
    <div>

      <li v-for="item in list.items" v-bind:class="{complete: item.completed}" v-on:click="toggleItemComplete(item)">{{ item.name }}</li>
    </div>

    <router-link class="btn btn-primary" :to="'/lists/' + list.id + '/edit'">Edit</router-link>
    
    <button class="btn btn-danger" v-on:click="destroyList()">Delete List</button>

    <div class="items-new">
      <h1>New Item</h1>
      <ul>
        <li v-for="error in errors"> {{ error }} </li>
      </ul>

      <div class="container">
        <form v-on:submit.prevent="submit()">
          <div class="form-group">
            <label>Name of Item: </label>
            <input class="form-control" type="text" v-model="newItemName" placeholder="Item">
          </div>
          <div class="new-button">
            <input type="submit" value="Create" class="btn btn-info">
          </div>
        </form>
      </div>
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
  .complete {
    text-decoration: line-through;
  }

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

            },
      newItemName: "",
      errors: []

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

    },
    submit: function() {
      var params = {
                    name: this.newItemName,
                    list_id: this.list.id
                    };
      axios.post("/api/items", params)
        .then(response => {
          console.log("Item Created", response.data)
          this.list.items.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });              
    },
    toggleItemComplete: function(itemInput) {
      itemInput.completed = !itemInput.completed;
      // axios call to update completed on backend here

    }
  }
}
</script>