<template>
  <div class="login">    
    <form v-on:submit.prevent="submit()">
      <h2>Login</h2>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="button_login">
        <input type="submit" class="btn btn-info" value="Submit">
      </div>
    </form>  
  </div>
</template>

<style>
.button_login{
  text-align: center
}
.login{
  padding: 15px;
  margin-top: 30px;
} 
</style>

<script>
import axios from "axios";

export default {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      user_id: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
        user_id: this.user_id
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          if(response.data.user_id) {
            this.$router.push("/lists/");
          } else {
            this.$router.push("/lists/new");
          };
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
