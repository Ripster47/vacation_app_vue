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
            lists: []
            };
  },
  created: function() {
    axios.get('/api/lists')
    .then(response => {
      this.lists = response.data;
    });
    // ask Josh if we can put the logic for showing only a users lists via user_id here
  },
  methods: {}
};
</script>
