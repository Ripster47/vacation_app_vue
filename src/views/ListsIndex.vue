<template>
  <div class="lists-index">
    <h2>My Trips ✈️</h2>
    <div v-for ="list in lists">
      <ul>
      <router-link style="color:black" v-bind:to="'/lists/' + list.id">
        <h3>{{ list.name }}</h3>
      </router-link>

      <div> Countdown: {{moment((list.date), "MMDDYYYY").fromNow()}} </div>

      </ul>
    </div>
  </div>
</template>

<style>
.lists-index{
  padding: 20px;
  margin-top: 30px;
}
.lists-index h2{
  text-decoration: underline;
}
.lists-index h3{
  text-align: left;
}
</style>

<script>
var axios = require('axios');
var moment = require('moment');

export default {
  data: function() {
    return {
            lists: [],
            displayDate: "Click Me"
            };
  },
  created: function() {
    axios.get('/api/lists')
    .then(response => {
      this.lists = response.data;
    });
    // ask Josh if we can put the logic for showing only a users lists via user_id here
  },
  methods: {
      moment: function (date) {
        return moment(date);
   }
  }
};
</script>