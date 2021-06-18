<template>
  <div class="home">
    <h1>GESCON - Gestão de Condomínios</h1>
    <img src="../assets/logo.png" alt />
  </div>
</template>

<script>
import axios from "axios";

const auth = axios.create({
    baseURL: 'http://localhost:3030',
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    withCredentials: true
});
export default {
  name: "Home",
  data() {
    return {
      userData: {
        id: "",
        usuario: "",
      },
    };
  },
  methods: {
    getUserData() {
      console.log(document.cookie);
      auth.get("/api/user")
        .then((response) => {
          console.log(response.data);
          this.$set(this, "user", response.data.user);
        })
        .catch((errors) => {
          console.log(errors);
          this.$router.push("/");
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
