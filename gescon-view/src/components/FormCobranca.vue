<template>
  <div>
    <div class="row">
      <div class="col-md-1">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-id"
            v-model="formCob.idcobranca"
            placeholder=""
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-2">
        <b-form-group id="input-group-1">
          <b-form-select id="input-cond" v-model="formCob.idunidade">
            <option
              v-for="modelSelected in unidades"
              :key="modelSelected.idunidade"
              :value="modelSelected.idunidade"
            >
              {{ modelSelected.numero }}
            </option>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-nome"
            v-model="formCob.descricao"
            placeholder="Descrição"
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-3">
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-valor"
            v-model="formCob.valor"
            placeholder="Valor"
            required
          ></b-form-input>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editar: {
      idcobranca: Number,
      idunidade: Number,
      descricao: String,
      valor: Number,
    },
    callback: Function,
  },
  data() {
    return {
      formCob: {
        idcobranca: null,
        idunidade: null,
        descricao: "",
        valor: null,
      },
      unidades: [],
    };
  },
  mounted() {
    if (this.editar) {
      this.formCob.idcobranca = this.editar.idcobranca;
      this.formCob.idunidade = this.editar.unidade.idunidade;
      this.formCob.descricao = this.editar.descricao;
      this.formCob.valor = this.editar.valor;
    }
    this.$http
      .get("/unidade")
      .then((result) => {
        this.unidades = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(this.unidades);
  },
  watch: {
    formCob: {
      handler() {
        this.$emit("handler", this.formCob);
      },
      deep: true,
    },
  },
};
</script>