<template>
  <div class="sign-up">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h3>Vacation</h3>
        <p>All I've Ever Wanted!</p>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Gender:</label>
          <input type="gender" class="form-control" v-model="gender">
        </div>
         <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <div class="button_join"> 
          <input type="submit" class="btn btn-primary" value="Join">
         <div class="already">
            <label >Already a member?</label>
          <div>
            <router-link v-bind:to="'/login'">Login here!</router-link>
          </div>
         </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>

</style>

<script>
var axios = require('axios')

export default {
  data: function() {
    return {
      name: "",
      email: "",
      gender: "",
      password: "",
      passwordConfirmation: "",
            errors: []
          };
        },
        methods: {
          submit: function() {
            var params = {
              name: this.name,
              email: this.email,
              gender: this.gender,
              password: this.password,
              password_confirmation: this.passwordConfirmation
            };
            axios
              .post("/api/users", params)
              .then(response => {
                this.$router.push("/login");
              })
              .catch(error => {
                this.errors = error.response.data.errors;
              });
          }
        }
      };
      </script>
