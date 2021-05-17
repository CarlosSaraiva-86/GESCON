<template>
  <div>
    <div class="row">
      <div class="col-md-1">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-id"
            v-model="formCondominio.idcondominio"
            placeholder=""
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-7">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-nome"
            v-model="formCondominio.nome"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-4">
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-cnpj"
            v-model="formCondominio.telefone"
            placeholder="Telefone"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-4">
        <b-form-group id="input-group-1">
          <b-form-select id="input-cond" v-model="formCondominio.idadministradora">
            <option
              v-for="modelSelected in administradoras"
              :key="modelSelected.idadministradora"
              :value="modelSelected.idadministradora"
            >
              {{ modelSelected.nome }}
            </option>
          </b-form-select>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editar: {
      idcondominio: null,
      idadministradora: null,
      nome: "",
      telefone: "",
    },
    callback: Function,
  },
  mounted(){
    if(this.editar){
      console.log(this.editar)
      this.formCondominio.idcondominio = this.editar.idcondominio;
      this.formCondominio.idadministradora = this.editar.idadministradora;
      this.formCondominio.nome = this.editar.nome;
      this.formCondominio.telefone = this.editar.telefone;
    }
    this.$http
      .get("/administradora")
      .then((result) => {
        this.administradoras = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      formCondominio: {
        idcondominio: null,
        idadministradora: null,
        nome: "",
        telefone: "",
      },
      administradoras: []
    };
  },
  watch: {
    formCondominio: {
      handler() {
        this.$emit("handler", this.formCondominio);
      },
      deep: true,
    },
  },
};
</script>