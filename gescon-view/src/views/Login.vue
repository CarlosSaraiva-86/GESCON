<template>
  <div class="login">
    <img src="../assets/logo.png" alt />
    <b-form @submit="doLogin">
      <b-form-group id="input-group-1">
        <b-form-input
          id="input-nome"
          v-model="login.usuario"
          placeholder="Usuário"
          required
        ></b-form-input>
        <b-form-input
          id="input-senha"
          v-model="login.senha"
          placeholder="Senha"
          type="password"
          required
        ></b-form-input>
        <b-button type="submit" variant="primary">Entrar</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        usuario: "",
        senha: "",
      },
    };
  },
  methods: {
    doLogin(event) {
      event.preventDefault();
      let dataLogin = {
        usuario: this.login.usuario,
        senha: this.login.senha,
      };
      this.$auth.post("/api/login", dataLogin)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/home");
        })
        .catch((error) => {
          alert("Não foi possível realizar o Login");
          console.error(error);
        });
    },
  },
};
</script>

<style>
img {
  margin-bottom: 50px;
  height: 200px;
}
.login input{
    margin-bottom: 5px;
}
.login {
  margin: 20px 350px 0px 350px;
  padding: 50px 50px 20px 50px;
  border-radius: 20px;
  background-color: #dbcab3;
}

.login button {
  margin-top: 15px;
  background-color: #ff1100;
  border-color: gray;
}
</style>