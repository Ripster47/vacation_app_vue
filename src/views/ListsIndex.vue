<template>
  <div class="lists-index">
    <div v-for ="list in lists">
      <router-link v-bind:to="'/lists/' + list.id">
        <h1>{{ list.name }}</h1>
      </router-link>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
            lists: [],
            name: "",
            user_id: "",
            date: ""
            };
  },
  created: function() {
    axios.get('/api/lists')
    .then(response => {
      this.lists = response.data;
    });
  },
  methods: {}
};
</script>
