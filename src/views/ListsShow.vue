<template>
  <div class="lists-show">
    <h2>Travel Packing Checklist ☑️</h2>
    <h3>{{ list.name }}</h3>

    <div>
      <li v-for="item in list.items" v-bind:class="{complete: item.completed}" v-on:click="toggleItemComplete(item)">{{ item.name }}</li>
    </div>
    <div id="action-buttons"> 
      <router-link style="margin: 8px" class="btn btn-info" :to="'/lists/' + list.id + '/edit'">Edit List</router-link>
      <button class="btn btn-info" v-on:click="destroyList()">Delete List</button>
    </div>

    <div class="items-new">
      <h4>New Item</h4>
      <ul>
        <li v-for="error in errors"> {{ error }} </li>
      </ul>

        <form v-on:submit.prevent="submit()">
          <div class="form-group">
            <input class="form-control" type="text" v-model="newItemName" placeholder="Item">
          </div>
          <div class="new-button">
            <input type="submit" value="Create" class="btn btn-info">
          </div>
        </form>
      
    </div>
  </div>

</template>

<style>

.new-button{
  text-align: center
}
.lists-show{
  padding: 20px;
  text-align: left;
  margin-top: 30px;
}
.complete {
  text-decoration: line-through;
}
.lists-show #action-buttons{
  padding: 25px;
  text-align: center;
}
.lists-show h2{
  text-align: center;
}
.lists-show h3, h4{
  text-align: left;
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
          this.$router.push("/lists");
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